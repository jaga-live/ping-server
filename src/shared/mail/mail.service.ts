import { injectable } from "inversify";

export interface IMailService{
    getMail(): any
}

@injectable()
export class MailService implements IMailService{
    constructor() { }
    
    async getMail() {
        return 'Mail Test'
    }
}