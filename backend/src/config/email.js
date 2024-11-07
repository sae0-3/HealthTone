import nodemailer from "nodemailer"


export const sendEmail = ({ recipient_email, OTP }) => {
  console.log(recipient_email,"**************************")
  console.log(OTP)
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      }
    })

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email.recipient_email,
      subject: 'HEALTHTONE PASSWORD RECOVERY',
      html:
        `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Healthtone OTP code</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Healthtone. Use the following OTP to complete your Password Recovery Procedure.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${recipient_email.OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Healthtone services</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Healthtone Inc</p>
      <p>healthtoneservices@gmail.com</p>
      <p>Bolivia</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,

    }
    transporter.sendMail(mail_configs, function (error,info){
      if(error){
        console.log(error)
        return reject({message: `Ah ocurrido un error`})
      }
      return resolve({message:`Email enviado correctamente`})
    })
  })
}