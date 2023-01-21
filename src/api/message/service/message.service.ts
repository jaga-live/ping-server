import { inject, injectable } from 'inversify';
import { MessageRepository } from '../repository/message.repository';


@injectable()
export class MessageService{
	constructor(
        @inject(MessageRepository) private readonly messageRepo: MessageRepository
	){}

	async save_message() {
        
	}
}