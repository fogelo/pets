import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.ru', // адрес SMTP-сервера Yandex
        port: 465, // порт с SSL/TLS
        auth: {
          // user: process.env.YANDEX_USER || "fogeloinc@yandex.ru", // ваш логин (полный email)
          // pass: process.env.YANDEX_PASS || "sikmahnbsudmrjcr", // пароль или app-password от Yandex
          user: process.env.YANDEX_USER || 'fogeloinc@mail.ru', // ваш логин (полный email)
          pass: process.env.YANDEX_PASS || 'X1Yymwx44anKY4QLkt3R', // пароль или app-password от Yandex
        },
      },
      defaults: {
        from: `"MyApp" <${process.env.YANDEX_USER || 'fogeloinc@mail.ru'}>`,
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class NotificationsModule {}
