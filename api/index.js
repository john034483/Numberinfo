const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Ye tumhari security key hai. Isko tum badal bhi sakte ho.
const MY_SECRET_KEY = "PRINCE_VIP_2026";

// === TUMHARA DIRECTORY DATA ===
// Jis number ka detail nikalna hai, use yahan niche jodte jao.
const NUMBER_DATABASE = {
    "9999999999": {
        name: "Prince Bhai VIP",
        mobile: "9999999999",
        id: "Aadhar-4420-XXXX",
        address: "Lucknow, Uttar Pradesh, India"
    },
    "8888888888": {
        name: "Veeru Singh",
        mobile: "8888888888",
        id: "ID-88190-IND",
        address: "Noida, Sector 62, UP"
    },
    "1234567890": {
        name: "Amit Kumar",
        mobile: "1234567890",
        id: "PAN-BKPM882",
        address: "Mumbai, Maharashtra"
    }
};

// Main API Logic Route जो data fetch karegi
app.get('/api/key-tabbo/number', (req, res) => {
    const { key, num } = req.query;

    // 1. Key Check
    if (!key || key !== MY_SECRET_KEY) {
        return res.status(401).json({ 
            success: false, 
            message: "Galat API Key hai bhai! Access Denied." 
        });
    }

    // 2. Number Check
    if (!num) {
        return res.status(400).json({ 
            success: false, 
            message: "Mobile number daalna zaroori hai." 
        });
    }

    // 3. Database me search
    const recordFound = NUMBER_DATABASE[num];

    if (recordFound) {
        return res.json({
            success: true,
            results: [recordFound]
        });
    } else {
        return res.json({
            success: false,
            results: [],
            message: "Database me ye number nahi mila."
        });
    }
});

module.exports = app;

