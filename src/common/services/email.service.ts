import nodemailer, { Transporter } from 'nodemailer';

export interface sendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  fileName: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;
  constructor(
    mailerService: string,
    mailerEmail: string,
    senderEmailPassword: string,
    private readonly postToProvider: boolean
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      },
    });
  }
  async sendEmail(options: sendEmailOptions) {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        // attachments: attachments
      });
    } catch (error) {
      console.log(error);
    }
  }
}
