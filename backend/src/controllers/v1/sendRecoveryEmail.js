import { getUserByEmail, } from '../../models/v1/getUserByEmail.js'
import { CustomError } from '../../utils/CustomError.js'
import { sendEmail } from '../../utils/email.js'


export const sendRecoveryEmail = async (req, res) => {
  const { recipient_email, OTP } = req.body
  const title = 'HEALTHTONE PASSWORD RECOVERY'
  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
</head>

<body>
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Healthtone OTP code</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Healthtone. Use the following OTP to complete your Password Recovery Procedure.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Healthtone services</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Healthtone Inc</p>
      <p>healthtoneservices@gmail.com</p>
      <p>Bolivia</p>
    </div>
  </div>
</div>
</body>
</html>
`

  try {
    const user = await getUserByEmail(recipient_email)
    if (!user) {
      throw new CustomError('El correo no fue encontrado.', 404)
    }

    const result = await sendEmail(title, content, recipient_email, OTP)
    res.status(200).json(result.message)
  } catch (err) {
    console.error('CONTROLLER recoveryPassword:', err)
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    })
  }
}
