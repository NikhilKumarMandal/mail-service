import { Message, NotificationTransport } from "./types/notificationTypes";
import nodemailer, { Transporter } from "nodemailer"
import config from "config"
export class MailTransport implements NotificationTransport{
    private  transporter:Transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
        host: config.get("mail.host"),
        port: config.get("mail.port"),
        secure: false,
        auth: {
        user: config.get("mail.auth.user"),
        pass: config.get("mail.auth.pass"),
        },
});
    }
    async send(message: Message) {
        // email send
        const info = await this.transporter.sendMail({
            from: config.get("Mail.form"), 
            //Todo: validate for valid email
            to: message.to, 
        subject: message.subject, 
        text: message.text,
        html: message.html, 
        });
        // use logger
        console.log("Message sent: %s", info.messageId);
    }
}

