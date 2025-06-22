import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailConfirmationMessage(
    email: string,
    code: string,
  ): Promise<void> {
    const confirmationUrl = `${process.env.FRONTEND_URL || 'http://antors.ru'}/confirm-registration?code=${code}`;

    const html = `
      <h1>Спасибо за регистрацию</h1>
      <p>Чтобы завершить регистрацию, пожалуйста, перейдите по ссылке:
        <a href="${confirmationUrl}">Завершить регистрацию</a>
      </p>
    `;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Подтвердите регистрацию',
      text: 'Подтвердите регистрацию',
      html,
    });
  }
}
