const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectdb = require('./config/db');

const app = express();

dotenv.config();

connectdb();

app.use(morgan('dev'));
app.use(express.json());

const cors = require('cors');
app.use(cors());


app.use('/uploads', express.static('uploads'));

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
app.use('/api/v1/appointment', require('./routes/appointmentRoutes'));



const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.blue);
});




