require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"Healthcare.vn" <${process.env.EMAIL_APP}>`, // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
};
let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "en") {
        result = `<h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because you booked an online medical appointment on Healthcare.vn</p>
      <p>Information to schedule an appointment:</p>
      <div><b>Time: ${dataSend.time}</b></div>
      <div><b>Doctor: ${dataSend.doctorName}</b></div>
  
      <p>If the above information is true, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
      <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
  
      <div>Sincerely thank!</div>
    `;
    }
    if (dataSend.language === "vi") {
        result = `<h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Healthcare.vn</p>
      <p>Thông tin đặt lịch khám bệnh:</p>
      <div><b>Thời gian: ${dataSend.time}</b></div>
      <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
  
      <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
      <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
  
      <div>Xin chân thành cảm ơn!</div>
    `;
    }
    return result;
};
let getBodyHTMLEmailConfirmedExamination = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `<h3> Xin chào ${dataSend.patientName} ! </h3>
      <h5> Bạn đã đặt lịch online trên Healthcare.vn thành công  </h5>
      <div> <h5> Thông tin hoá đơn sẽ được gữi trong file đính kèm : </h5></div>
      <div> Xin chân thành cảm ơn !</div>
      <div> Hẹn gặp lại quý khách !</div>
      `;
    }
    if (dataSend.language === "en") {
        result = `<h3> Dear ${dataSend.patientName} ! </h3>
      <h5> You have made an online appointment on the online in Healthcare.vn</h5>
      <p> ................................ </p>
      <div> Sincerely thank ! </div>
      <div> We look forward to seeing you again soon. ! </div>
      `;
    }
    return result;
};

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Healthcare.vn" <${process.env.EMAIL_APP}>`, // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailConfirmedExamination(dataSend),
        attachments: [
            {
                filename: `confirmed-#${dataSend.patientId}-${
                    new Date().getTime
                }.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: "base64",
            },
        ],
    });
};

module.exports = {
    sendSimpleEmail,
    sendAttachment,
};
