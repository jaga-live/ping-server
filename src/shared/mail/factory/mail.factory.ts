//////Shared mail Info
var appUrl = 'https://ping.jagalive.in/'
var _2faUrl = 'https://ping.jagalive.in/verification/2fa/'

class MessageConfig{
    public readonly senderName?: string;
    public readonly receiverName?: string;
    public readonly token?: string;
}

export class MailFactory{
    constructor(
        private readonly to: string,
        private readonly subject: string,
        private readonly html: string,
        private readonly messageConfig: MessageConfig,
    ) { }
    
    ///////Welcome Mail
    public static welcomeMail(config: MailFactory) {
        const { receiverName } = config.messageConfig
        const subject = `Ping - Account Creation`

        //TODO - Create HTML templates in handlebars - hbs
        const html = `<p>Hello ${receiverName}! Thank you for using Ping</p>
      <p>Kindly create your password using the below link</p>
      <a href="${_2faUrl + config.to}" target="_blank">SET PASSWORD!</a> 
      <p>Kindly login to your account on UnoTracker once your new password is all set.</p>
      <a href="${appUrl}" target="_blank">Open UnoTracker!</a>  `

        const data = {
            to: config.to,
            subject,
            html
        }

        return data
    }
}