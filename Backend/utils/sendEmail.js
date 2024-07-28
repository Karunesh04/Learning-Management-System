import nodemailer from 'nodemailer'

const sendEmail = async function(email, subject, message){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        hosts: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, //Sender gmail address
            pass: process.env.SMTP_APPPASSWORD //App password from gmail account
        }
    })

    //send mail with defined transport object
    await transporter.sendMail({
        from: {
            name: 'Mr.Nobody',
            address: process.env.SMTP_USER, // sender address
        },
        to: email, // user email
        subject: subject, //subject line
        html: message, // html body
    })
}

export default sendEmail