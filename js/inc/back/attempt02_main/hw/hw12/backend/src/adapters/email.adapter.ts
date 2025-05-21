import nodemailer from "nodemailer";
import { User } from "../features/users/types/user";

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
  async sendEmailConfirmationMessage(email: string, code: string) {
    // Создаём транспорт для Yandex SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru", // адрес SMTP-сервера Yandex
      port: 465, // порт с SSL/TLS
      secure: true, // true для порта 465
      auth: {
        // user: process.env.YANDEX_USER || "fogeloinc@yandex.ru", // ваш логин (полный email)
        // pass: process.env.YANDEX_PASS || "sikmahnbsudmrjcr", // пароль или app-password от Yandex
        user: process.env.YANDEX_USER || "fogeloinc@mail.ru", // ваш логин (полный email)
        pass: process.env.YANDEX_PASS || "X1Yymwx44anKY4QLkt3R", // пароль или app-password от Yandex
      },
    });
    const html = `
        <h1>Спасибо за регистрацию</h1>
        <p>Чтобы завершить регистрацию,пожалуйста,перейдите по ссылке:
            <a href=http://antors.ru/registration-confirmation?code=${code}>Завершить регистрацию</a>
        </p>`;

    const info = await transporter.sendMail({
      //   from: `"MyApp" <${process.env.YANDEX_USER || "fogeloinc@yandex.ru"}>`,
      from: `"MyApp" <${process.env.YANDEX_USER || "fogeloinc@mail.ru"}>`,
      to: email,
      subject: "Подтвердите регистрацию",
      text: `${"Подтвердите регистрацию"}`,
      html,
    });
    return info;
  },
  async sendPasswordRecoveryMessage(email: string, recoveryCode: string) {
    // Создаём транспорт для Yandex SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru", // адрес SMTP-сервера Yandex
      port: 465, // порт с SSL/TLS
      secure: true, // true для порта 465
      auth: {
        // user: process.env.YANDEX_USER || "fogeloinc@yandex.ru", // ваш логин (полный email)
        // pass: process.env.YANDEX_PASS || "sikmahnbsudmrjcr", // пароль или app-password от Yandex
        user: process.env.YANDEX_USER || "fogeloinc@mail.ru", // ваш логин (полный email)
        pass: process.env.YANDEX_PASS || "X1Yymwx44anKY4QLkt3R", // пароль или app-password от Yandex
      },
    });
    const html = `
        <h1>Восстановление пароля1</h1>
        <p>Чтобы восстановить пароль,пожалуйста,перейдите по ссылке:
            <a href=http://antors.ru/password-recovery?recoveryCode=${recoveryCode}>Восстановить пароль</a>
        </p>`;

    const info = await transporter.sendMail({
      //   from: `"MyApp" <${process.env.YANDEX_USER || "fogeloinc@yandex.ru"}>`,
      from: `"MyApp" <${process.env.YANDEX_USER || "fogeloinc@mail.ru"}>`,
      to: email,
      subject: "Восстановление пароля2<",
      text: `${"Восстановление пароля3<"}`,
      html,
    });
    return info;
  },
};
