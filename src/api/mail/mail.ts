import { injectable } from "inversify";

@injectable()
export class MailService{
    async handle() {
        console.log('TEST')
    }
}