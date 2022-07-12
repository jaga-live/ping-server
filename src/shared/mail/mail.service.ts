import { injectable } from "inversify";
import * as fs from 'fs'
import * as path from 'path'
import nodemailer from 'nodemailer'
import 'dotenv/config'
import { MailDto } from "./mail.dto";
import { MailFactory } from "./factory/mail.factory";
export interface IMailService{
    sendMail(config: any): any
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
    
    async sendMail(config: any) {
        
        /////Get Config from factory
        var mailConfig = MailFactory.getConfig(config)
        
        new Mail().send(mailConfig)
    }
}



