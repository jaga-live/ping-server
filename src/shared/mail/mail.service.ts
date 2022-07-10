import { injectable } from "inversify";
import * as fs from 'fs'
import * as path from 'path'
import nodemailer from 'nodemailer'
import 'dotenv/config'
import { MailDto } from "./mail.dto";
export interface IMailService{
    sendMail(): any
}

/////Mail Module
class Mail{
    async send(payload: MailDto): Promise<void> {

        var mailConfig = new MailDto(
            payload.to,
            payload.subject,
            payload.html
        )
        
        var transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            tls: { 
                rejectUnauthorized: false 
            },
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        })

          var mailOption = {
            from: process.env.EMAIL,
            ...mailConfig
        };

        console.log(mailOption)
        transporter.sendMail(mailOption, (error, res) => {
            if (error) { console.log(error) }
            else { console.log(res) }
        });
    }
}


//Mail Service
@injectable()
export class MailService implements IMailService{
    constructor(
        
    ) { }
    
    async sendMail() {
        var tes = fs.readFileSync(path.join(__dirname, './templates/signup.hbs'), 'utf8');
        
        // new Mail().send({
        //     to: 'jagadheesh6@gmail.com',
        //     subject: 'TEST Email',
        //     html: tes
        // })
    }
}



