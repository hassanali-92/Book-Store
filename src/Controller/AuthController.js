import User from '../Model/User.js';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists' 
            });
        }
        
        // ✅ Role ko handle karo - Sirf 'admin' ya 'user' allow hai
        let userRole = 'user';
        if (role === 'admin') {
            // Security: Sirf specific condition mein admin banayein
            // Option 1: Admin secret key se
            // Option 2: Pehla user admin banayein
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount === 0) {
                userRole = 'admin'; // Pehla user admin ban jayega
            }
        }
        
        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: userRole
        });
        
        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'your_secret_key', 
            { expiresIn: '30d' }
        );
        
        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }
        
        // Check password
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }
        
        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'your_secret_key', 
            { expiresIn: '30d' }
        );
        
        res.json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};