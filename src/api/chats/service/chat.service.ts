import { inject, injectable } from 'inversify';
import { ChatRepository } from '../repository/chat.repository';


@injectable()
export class ChatService{
	constructor(
        @inject(ChatRepository) private readonly chatRepo: ChatRepository
	) { }
    
}