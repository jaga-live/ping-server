import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import Sockets, {Server as SocketIO} from 'socket.io';
import { httpServer } from '../app';
import { verify } from 'jsonwebtoken';
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
	}

	public getIO(): Sockets.Server {
		return this.io;
	}

	///Common Auth Middleware for Socket Events
	public async authMiddleware(socket: Sockets.Socket) {
		const token: any = socket.handshake.query.token;
		if (!token) {
			this.errorEvent(socket);
			console.log('JWT Token Missing');
			return;
		}

		try {
			var decrypt: any = verify(token, process.env.JWT_SECRET);
		} catch (error) {
			this.errorEvent(socket);
			console.log('Invalid JWT');
			return;
		}
    
		const userId = decrypt.apps.ping.userId;
		return {
			isAuthenticated: true,
			userData: decrypt,
			userId
		};
	}

	public errorEvent(socket: Sockets.Socket) {
		socket.emit('error', {
			error: 'AuthError',
			statusCode: 401
		});
	}
}