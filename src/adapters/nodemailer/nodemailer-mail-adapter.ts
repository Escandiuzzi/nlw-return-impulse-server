import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "748c83491809e8",
      pass: "c668774c0d756a"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail(data: SendMailData) {
        const { subject, body } = data;
        transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Luiz Felipe Escandiuzzi <escandiuzzilf@gmail.com>',
            subject: subject,
            html: body,

        });
    }
}