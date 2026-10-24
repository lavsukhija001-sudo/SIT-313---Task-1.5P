const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Helper function for validating email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

app.post("/subscribe", async (req, res) => {
    const email = req.body.email;

    // Check if email is missing or empty
    if (!email || !email.trim()) {
        console.log("Validation failed: Email is required (Status 400)");
        return res.status(400).json({
            message: "Email is required"
        });
    }

    // Check if email is valid format
    if (!isValidEmail(email.trim())) {
        console.log(`Validation failed: Invalid email format '${email}' (Status 400)`);
        return res.status(400).json({
            message: "Please enter a valid email address."
        });
    }

    const message = {
        to: email.trim(),
        from: "lavsukhija001@gmail.com",
        subject: "Welcome to DEV@Deakin Newsletter!",
        text: "Thank you for subscribing to the DEV@Deakin newsletter!"
    };

    try {
        const [response] = await sgMail.send(message);

        console.log("Welcome email sent successfully");
        console.log("Email API Status: 200 (Success, Provider Status: " + response.statusCode + ")");

        res.status(200).json({
            message: "Successfully subscribed! Welcome email sent."
        });

    } catch (error) {
        console.error("Email error:", error.response?.body || error.message || error);

        res.status(500).json({
            message: "Failed to send welcome email."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
