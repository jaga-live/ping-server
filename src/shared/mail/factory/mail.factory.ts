//////Shared mail Info
var _defaultMailContext = {
     appUrl :'https://ping.jagalive.in/',
     _2faUrl : 'https://ping.jagalive.in/verification/2fa/'
}

enum MailTypes {
    welcomeMail = 'welcomeMail',
    send_otp = 'send_otp'
}

class MessageConfig{
    public readonly senderName?: string;
    public readonly receiverName?: string;
    public readonly token?: string;
    public readonly otp?: string;
}

export class MailFactory{
    constructor(
        private readonly type: string,
        private readonly to: string,
        private readonly subject: string,
        private readonly html: string,
        private readonly context: MessageConfig,
    ) { }

    public static getConfig(config: MailFactory) {
        switch (config.type) {
            case MailTypes.welcomeMail: return this.welcomeMail(config);
            case MailTypes.send_otp: return this.sendOtp(config);
            default:
                throw new Error('Invalid Mail type');
        }

    }
    
    ///////Welcome Mail
    public static welcomeMail(config: MailFactory) {
        const { receiverName } = config.context

        const subject = `Ping - Account Creation`
        const data = {
            to: config.to,
            subject,
            template: 'signup',
            context: {
                ..._defaultMailContext,
                receiverName,
                to: config.to
            }
        }

        return data
    }


    ///////Welcome Mail
    public static sendOtp(config: MailFactory) {
        const { otp } = config.context
        
        const subject = `One Time Password - PING`
        const data = {
            to: config.to,
            subject,
            template: 'send_otp',
            context: {
                ..._defaultMailContext,
                to: config.to,
                otp
            }
        }

        return data
    }
}