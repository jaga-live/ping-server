export class MailDto{
    constructor(
        public readonly to: string,
        public readonly subject: string,
        public readonly html: string,
    ){}

}