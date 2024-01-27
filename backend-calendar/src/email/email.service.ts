import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import { ContactEmailDto } from './dto/contact-email.dto';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Você pode configurar para o provedor de e-mail que desejar
      secure: false,
      port: 8000,
      auth: {
        user: 'josevictot.ar@gmail.com',
        pass: 'tmxpeqzeaqbsuswx',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail({ to, subject, text }: SendEmailDto): Promise<boolean> {
    const mailOptions = {
      from: 'josevictot.ar@gmail.com',
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);

      console.log('Email enviado:', info.response);

      return true;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);

      return false;
    }
  }

  async contact({ email, description, title }: ContactEmailDto) {
    const mailOptions = {
      from: 'josevictot.ar@gmail.com',
      to: 'victor.developerr@gmail.com',
      subject: title,
      text: `
        <h1>${email}</h1>
        <p>
          ${description}
        </p>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);

      console.log('Email enviado:', info.response);

      return true;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);

      return false;
    }
  }
}
