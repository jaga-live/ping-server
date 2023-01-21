import { inject, injectable } from 'inversify';
import { SocketProvider } from '../../core/providers/sockets.provider';


@injectable()
export class ChatEventsHandler {
    @inject(SocketProvider) private socketProvider: SocketProvider;

    public handleConnection() {
    	this.socketProvider.getIO().on('connection', (socket) => {
  
    		// your code for handling events
    		socket.on('initial', async (data) => {
    			const authStatus = await this.socketProvider.authMiddleware(socket);
    			if (!authStatus?.isAuthenticated) return;
    		});
		
    	});
    }
}