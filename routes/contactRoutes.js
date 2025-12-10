import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Save to DB
    await Contact.create({ name, email, phone, service, message });

    // Send Email to user
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.MAIL_USER,
    //     pass: process.env.MAIL_PASS,
    //   },
    // });
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail App Password only!
  },
  tls: {
    rejectUnauthorized: false,
  }
});


    await transporter.sendMail({
      from: `"Websitoz" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Websitoz",
     html: `
  <div style="
    font-family: 'Segoe UI', sans-serif; 
    background:#f4f6fb; 
    padding:40px 0;
    width:100%;
  ">
    <div style="
      max-width:600px;
      margin:0 auto;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 6px 20px rgba(0,0,0,0.08);
    ">

      <!-- HEADER -->
      <div style="
        background:linear-gradient(135deg,#6a11cb,#2575fc);
        padding:30px;
        text-align:center;
        color:#fff;
      ">
        <img src="https://websitoz.in/images/websitoz2.png" 
          alt="Websitoz Logo" 
          style="width:90px; margin-bottom:10px;" />
        <h1 style="margin:0; font-size:26px; font-weight:700;">
          Thank You for Reaching Out!
        </h1>
      </div>

      <!-- BODY -->
      <div style="padding:30px 30px;">
        <h2 style="color:#333; font-size:22px; margin-bottom:10px;">
          Hi ${name}, 👋
        </h2>

        <p style="color:#555; line-height:1.6; font-size:16px;">
          We have received your request regarding:  
          <b style="color:#2575fc;">${service}</b>.
        </p>

        <p style="color:#555; line-height:1.6; font-size:16px;">
          Our team at <b>Websitoz</b> is already reviewing your details and will
          connect with you shortly.
        </p>

        <div style="
          background:#f1f5ff;
          padding:15px 20px;
          border-left:4px solid #2575fc;
          margin:20px 0;
          border-radius:6px;
        ">
          <p style="margin:0; font-size:15px; color:#333;">
            <b>Your Message:</b><br />
            ${message}
          </p>
        </div>

        <!-- CTA BUTTON -->
        <a href="https://websitoz.in"
          style="
            display:inline-block;
            margin-top:20px;
            padding:12px 22px;
            background:#2575fc;
            color:#fff;
            text-decoration:none;
            font-weight:600;
            border-radius:8px;
            transition:0.3s;
          ">
          Visit Our Website
        </a>

        <p style="margin-top:25px; color:#777; font-size:14px;">
          If you have any questions, simply reply to this email — our team is here to help.
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#fafafa; padding:15px; text-align:center; font-size:13px; color:#777;">
        © ${new Date().getFullYear()} Websitoz. All Rights Reserved.<br />
        New Delhi, India
      </div>

    </div>
  </div>
`

    });

    res.json({ success: true, message: "Message sent & saved" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

export default router;
