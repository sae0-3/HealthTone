import nodemailer from 'nodemailer'


export const sendEmail = (title, content, recipient_email) => {
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
      to: recipient_email,
      subject: title,
      html: content,
    }

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error)
        return reject({ message: 'Ah ocurrido un error' })
      }
      return resolve({ message: 'Email enviado correctamente' })
    })
  })
}
