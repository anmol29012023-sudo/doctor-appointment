import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/payment.css';

const Payment = () => {
  const { state } = useLocation();
  const { doctor, appointmentData } = state;
  const [paymentMode, setPaymentMode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const [fieldValid, setFieldValid] = useState({});

  const navigate = useNavigate();
  const doctorFee = doctor?.fees;
  const discount = discountApplied ? 100 : 0;
  const serviceCharge = 0.1 * doctorFee;
  const totalAmount = doctorFee - discount + serviceCharge;

  const validateFields = () => {
    let valid = true;
    const newValid = {};

    if (paymentMode === 'UPI') {
      newValid.upiId = upiId.length > 5 && upiId.includes('@');
      valid &= newValid.upiId;
    }
    if (paymentMode === 'NetBanking') {
      newValid.bankName = !!bankName;
      newValid.accountNumber = accountNumber.length >= 8;
      valid &= newValid.bankName && newValid.accountNumber;
    }
    if (paymentMode === 'Card') {
      newValid.cardName = cardName.length > 0;
      newValid.cardNumber = /^\d{16}$/.test(cardNumber);
      newValid.expiryDate = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
      newValid.cvv = /^\d{3}$/.test(cvv);
      valid &= newValid.cardName && newValid.cardNumber && newValid.expiryDate && newValid.cvv;
    }
    setFieldValid(newValid);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMode) return alert('Please select a payment mode');
    if (!validateFields()) return alert('Please fill in valid details');
    setLoading(true);

    const payload = {
      ...appointmentData,
      doctorId: doctor._id,
      paymentMode,
      discount,
      serviceCharge,
      totalAmount
    };

    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/v1/appointment/book', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowPopup(true);
    } catch (error) {
      alert(`Booking failed: ${error?.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const applyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'health100') {
      setDiscountApplied(true);
      alert('Promo code applied! ₹100 discount granted.');
    } else {
      alert('Invalid promo code');
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">CONFIRM AND PAY</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>PATIENT INFO</h3>
          <p><strong>Name:</strong> {appointmentData?.firstname} {appointmentData?.lastname}</p>
          <p><strong>Email:</strong> {appointmentData?.email}</p>
          <p><strong>Phone:</strong> {appointmentData?.phone}</p>
        </div>

        <div className="section">
          <h3>DOCTOR INFO</h3>
          <p><strong>Doctor:</strong> {doctor?.firstname} {doctor?.lastname}</p>
          <p><strong>Specialization:</strong> {doctor?.specialization}</p>
          <p><strong>Date:</strong> {appointmentData?.date}</p>
          <p><strong>Time:</strong> {appointmentData?.time}</p>
        </div>

        <div className="section">
          <h3>Apply Promo Code</h3>
          <div className="promo-row">
            <input type="text" placeholder="Enter Promo Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} disabled={discountApplied} />
            <button type="button" onClick={applyPromo} disabled={discountApplied}>Apply</button>
          </div>
          {discountApplied && <p className="discount-msg">₹100 Discount Applied</p>}
        </div>

        <div className="section payment-slip">
          <h3>Payment Summary</h3>
          <table className="summary-table">
            <tbody>
              <tr><td>Doctor Fee</td><td>₹{doctorFee}</td></tr>
              <tr><td>Discount</td><td>- ₹{discount}</td></tr>
              <tr><td>Service Charge (10%)</td><td>₹{serviceCharge.toFixed(2)}</td></tr>
              <tr className="total-row">
                <td><strong>Total Payable</strong></td>
                <td><strong>₹{totalAmount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <h3>Select Payment Mode</h3>
          <label><input type="radio" value="Card" checked={paymentMode === 'Card'} onChange={(e) => setPaymentMode(e.target.value)} /> Card</label>
          <label><input type="radio" value="UPI" checked={paymentMode === 'UPI'} onChange={(e) => setPaymentMode(e.target.value)} /> UPI</label>
          <label><input type="radio" value="NetBanking" checked={paymentMode === 'NetBanking'} onChange={(e) => setPaymentMode(e.target.value)} /> NetBanking</label>
        </div>

        {paymentMode === 'UPI' && (
          <div className="payment-input">
            <label>UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. user@upi"
              style={{ borderColor: fieldValid.upiId ? 'green' : 'red' }}
            />
          </div>
        )}

        {paymentMode === 'NetBanking' && (
          <div className="payment-input">
            <label>Bank:</label>
            <div className="bank-icons">
              <img src="https://static.vecteezy.com/system/resources/previews/020/336/288/non_2x/sbi-logo-sbi-icon-free-free-vector.jpg" alt="SBI" />
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-hdfc-bank-icon-download-in-svg-png-gif-file-formats--logo-company-pack-logos-icons-10673425.png" alt="HDFC" />
              <img src="https://i.pinimg.com/736x/ff/d5/31/ffd531a6a78464512a97848e14506738.jpg" alt="ICICI" />
              <img src="https://images.seeklogo.com/logo-png/1/2/axis-bank-logo-png_seeklogo-14775.png" alt="Axis" />
            </div>
            <select value={bankName} onChange={(e) => setBankName(e.target.value)} style={{ borderColor: fieldValid.bankName ? 'green' : 'red' }}>
              <option value="">Select Bank</option>
              <option value="SBI">State Bank of India</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="Axis">Axis Bank</option>
            </select>
            <label>Account Number:</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g. 1234567890"
              style={{ borderColor: fieldValid.accountNumber ? 'green' : 'red' }}
            />
          </div>
        )}

        {paymentMode === 'Card' && (
          <div className="payment-input">
            <label>Name on Card:</label>
            <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Full Name" style={{ borderColor: fieldValid.cardName ? 'green' : 'red' }} />
            <label>Card Number:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="xxxx xxxx xxxx xxxx" style={{ borderColor: fieldValid.cardNumber ? 'green' : 'red' }} />
            <label>Expiry Date:</label>
            <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="MM/YY" style={{ borderColor: fieldValid.expiryDate ? 'green' : 'red' }} />
            <label>CVV:</label>
            <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" style={{ borderColor: fieldValid.cvv ? 'green' : 'red' }} />
          </div>
        )}

        <button type="submit" className="pay-button">{loading ? 'Processing...' : 'Confirm & Pay'}</button>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Payment Successful!</h2>
            <p style={{textAlign:'center'}}>Your appointment with {doctor?.firstname} {doctor?.lastname} is confirmed.</p>
            <p>Total Amount Paid: ₹{totalAmount.toFixed(2)}</p>
            <button onClick={() => navigate('/')}>Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;




