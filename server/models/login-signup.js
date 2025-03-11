import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.ATLAS_CONNECTION_STRING_creation)
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

// User schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Token generation
const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: '3d',
    });
};

// User registration
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send('Email and password are required');
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        const user = await newUser.save();

        const token = createSecretToken(user._id);
        res.cookie('token', token, {
            path: '/',
            expires: new Date(Date.now() + 86400000),
            secure: true,
            httpOnly: true,
            sameSite: 'None',
        });

        res.json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send('All input is required');
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).send('Invalid credentials');
        }

        const token = createSecretToken(user._id);
        res.cookie('token', token, {
            path: '/',
            expires: new Date(Date.now() + 86400000),
            secure: true,
            httpOnly: true,
            sameSite: 'None',
        });

        res.json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// User logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

export default app;