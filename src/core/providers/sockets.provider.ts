import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import Sockets, {Server as SocketIO} from 'socket.io';
import { httpServer } from '../app';

///Protected Events
const protectedSocketEvents = ['chat', 'reply'];
const publicSocketEvents = ['welcome'];

@provide(SocketProvider)
export class SocketProvider {
	private io: Sockets.Server;

	public constructor() {
		this.io = new SocketIO(httpServer, {
	        cors: {
		        origin: '*'
	        }
		});
		// this.io.use((this.authMiddleware));
	}

	public getIO(): Sockets.Server {
		return this.io;
	}

	///Common Auth Middleware for Socket Events
	public async authMiddleware(socket: Sockets.Socket) {
		// check the socket's request object for an auth token
		const token = socket.handshake.query.tokens;
		if (!token) {
			this.errorEvent(socket);
			return;
		}
    
		console.log('middleware sockets', token);
		return {
			isAuthenticated: true
		};
	}

	public errorEvent(socket: Sockets.Socket) {
		socket.emit('error', {
			error: 'AuthError',
			statusCode: 401
		});
	}
}