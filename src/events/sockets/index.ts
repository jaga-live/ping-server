import { container } from '../../core/inversify/inversify.config';
import { ChatEventsHandler } from './chats.events';

///Get Event handlers
const chatEvent = container.get(ChatEventsHandler);

export const listen = async () => {
	chatEvent.handleConnection();
};
