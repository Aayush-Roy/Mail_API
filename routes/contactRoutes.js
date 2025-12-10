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
      html:`
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Websitoz Email</title>

<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

<style>
  body { margin:0; padding:0; background:#e0e3e3; font-family:'Plus Jakarta Sans',Arial; }
  table { border-collapse:collapse; }
  .container { width:100%; max-width:600px; margin:auto; background:#fff; }
  .header { background:#1b1b1b; text-align:center; padding:30px 0; }
  .logo { width:55px; }
  .brand { color:#fff; font-size:32px; font-weight:700; margin-top:10px; }
  .section { padding:30px 40px; }
  .title { font-size:28px; font-weight:700; color:#121212; text-align:center; margin:0; }
  .text { font-size:14px; color:#121212cc; line-height:1.6; text-align:center; margin-top:20px; font-weight:500; }
  .user-box { background:#f4f5f7; padding:15px 20px; border-radius:10px; margin-top:25px; }
  .user-line { font-size:13px; color:#121212; margin:5px 0; }
  .cta { display:inline-block; padding:14px 32px; margin-top:25px; border-radius:100px; background:#121212; color:#fff; font-size:16px; font-weight:700; text-decoration:none; }
  .services-title { font-size:32px; font-weight:700; color:#121212; text-align:center; margin-bottom:30px; }
  .card { border-radius:12px; padding:32px 20px; margin-bottom:25px; }
  .card img { width:200px; border-radius:10px; margin:auto; display:block; }
  .card-title { font-size:24px; font-weight:700; color:#121212; text-align:center; margin-top:15px; }
  .card-text { font-size:14px; color:#121212cc; text-align:center; margin-top:10px; font-weight:500; }
  .footer { padding:40px 20px; }
  .footer-logo { width:100px; margin-bottom:10px; }
  .footer-text { font-size:14px; color:#121212b3; text-align:center; margin:6px 0; font-weight:500; }
  .small-note { font-size:14px; color:#121212b3; text-align:center; margin-top:20px; line-height:1.6; }
  .copyright { font-size:14px; color:#121212b3; border-top:1px solid #ddd; padding-top:20px; margin-top:20px; font-weight:500; }
</style>
</head>

<body>

<!-- HEADER -->
<table class="container">
  <tr>
    <td class="header">
      <img src="https://cloudfilesdm.com/postcards/websitozlogo-b9bf49c3.png" class="logo" />
      <div class="brand">websitoz</div>
    </td>
  </tr>
</table>

<!-- MAIN CONTENT -->
<table class="container">
  <tr>
    <td class="section">

      <h1 class="title">Hi ${name},</h1>

      <p class="text">
        We’ve received your request regarding <b>${service}</b>.  
        Our team is already reviewing your details and will get back to you shortly.
      </p>

      <!-- USER DETAILS BOX -->
      <div class="user-box">
        <p class="user-line"><b>Service Requested:</b> ${service}</p>
        <p class="user-line"><b>Your Message:</b> ${message}</p>
      </div>

      <center>
        <a href="https://websitoz.in" class="cta">Visit Our Site</a>
      </center>

    </td>
  </tr>
</table>

<!-- SERVICES -->
<table class="container">
  <tr>
    <td class="section">

      <h2 class="services-title">Services we Offer</h2>

      <div class="card" style="background:#fde9e3;">
        <img src="https://cloudfilesdm.com/postcards/original-54c804cca9d4aa1d2ad926b1dce2d356__2-423a7189.jpg" />
        <div class="card-title">websites</div>
        <div class="card-text">Take Your Business Online with us.</div>
      </div>

      <div class="card" style="background:#e7fbee;">
        <img src="https://cdn.dribbble.com/userupload/45275783/file/23d7cb47a28a6be8d73df1bba645cc9f.jpg?resize=1504x1128&vertical=center" />
        <div class="card-title">Applications</div>
        <div class="card-text">User Friendly App UI</div>
      </div>

      <div class="card" style="background:#e6f5ff;">
        <img src="https://cloudfilesdm.com/postcards/original-a412c0f2b850a7484f6a9ddf933a78e7-9f9d3d31.jpg" />
        <div class="card-title">Graphic Design</div>
        <div class="card-text">Showcase your products</div>
      </div>

    </td>
  </tr>
</table>

<!-- FOOTER -->
<table class="container">
  <tr>
    <td class="footer">

      <center>
        <img src="https://cloudfilesdm.com/postcards/websitozlogo-b9bf49c3.png" class="footer-logo" />
        <p class="footer-text">9560615790</p>
        <p class="footer-text">websitoz.digital@gmail.com</p>
        <p class="footer-text">New Delhi, India</p>

        <p class="small-note">
          You are receiving this email because you contacted us earlier or visited our website.
        </p>
      </center>

      <p class="copyright">© websitoz, Inc. All rights reserved.</p>

    </td>
  </tr>
</table>

</body>
</html>
`

      

    });

    res.json({ success: true, message: "Message sent & saved" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

export default router;
