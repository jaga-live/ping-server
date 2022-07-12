//////Shared mail Info
var appUrl = 'https://ping.jagalive.in/'
var _2faUrl = 'https://ping.jagalive.in/verification/2fa/'

enum MailTypes {
    welcomeMail = 'welcomeMail'
}

class MessageConfig{
    public readonly senderName?: string;
    public readonly receiverName?: string;
    public readonly token?: string;
}

export class MailFactory{
    constructor(
        private readonly type: string,
        private readonly to: string,
        private readonly subject: string,
        private readonly html: string,
        private readonly messageConfig: MessageConfig,
    ) { }

    public static getConfig(config: MailFactory) {
        switch (config.type) {
            case MailTypes.welcomeMail: return this.welcomeMail(config);
            default:
                throw new Error('Invalid Mail type');
        }

    }
    
    ///////Welcome Mail
    public static welcomeMail(config: MailFactory) {
        const { receiverName } = config.messageConfig
        const subject = `Ping - Account Creation`

        //TODO - Create HTML templates in handlebars - hbs
        const html = `<p>Hello ${receiverName}! Thank you for using Ping</p>
      <p>Kindly create your password using the below link</p>
      <a href="${_2faUrl + config.to}" target="_blank">SET PASSWORD!</a> 
      <p>Kindly login to your account on Ping once your new password is all set.</p>
      <a href="${appUrl}" target="_blank">Open Ping!</a>  `

        const data = {
            to: config.to,
            subject,
            html
        }

        return data
    }
}