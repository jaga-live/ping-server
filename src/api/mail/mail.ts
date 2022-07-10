import 'reflect-metadata'
import { injectable } from "inversify";
import { IMail } from "./interface/mail.interface";

@injectable()
export class MailService implements IMail{
    async handle() {
        console.log('TEST')
    }
}