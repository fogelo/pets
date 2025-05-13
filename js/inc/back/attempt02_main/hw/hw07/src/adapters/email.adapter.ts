import nodemailer from "nodemailer";

export const emailAdapter = {
  async sendEmail(email: string, subject: string, text: string) {
    // Создаём транспорт для Yandex SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.com", // адрес SMTP-сервера Yandex
      port: 465, // порт с SSL/TLS
      secure: true, // true для порта 465
      auth: {
        user: process.env.YANDEX_USER || "fogeloinc@yandex.ru", // ваш логин (полный email)
        pass: process.env.YANDEX_PASS || "sikmahnbsudmrjcr", // пароль или app-password от Yandex
      },
    });
    const info = await transporter.sendMail({
      from: `"MyApp" <${process.env.YANDEX_USER || "fogeloinc@yandex.ru"}>`,
      to: email,
      subject,
      text: `${text}`,
      html: `<b>${text}</b>`, // HTML body
    });
    return info;
  },
};
