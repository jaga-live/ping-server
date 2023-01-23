import { container } from '../../core/inversify/inversify.config';
import { ChatEvents } from './chats.events';

///Get Event handlers
const chatEvent = container.get(ChatEvents);

export const listen = async () => {
	chatEvent.handleConnection();
};
