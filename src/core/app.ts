import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify/inversify.config';
import { HttpException } from './exception';
import express, { NextFunction, Response, Request } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import 'dotenv/config';
import { Socket } from './sockets';
export class App {
	async start() {

		///Express Config
		const server = new InversifyExpressServer(container);
		server.setConfig((app) => {
			app.use(express.json());
		});

		////Global Error Config
		server.setErrorConfig((app) => {
			app.use((err: any, req: Request, res: Response, next: NextFunction) => {

				if (err instanceof HttpException) {
					res.status(err.statusCode).json({ error: err.message });
				} else {
					console.log(err);
					res.status(500).json({ error: 'Internal Server Exception' });
				}
			});
		});

		/////Build Server
		const app = server.build();
    
		////Web Sockets
		const httpServer = createServer(app);
		httpServer.listen(5000, () => {
			console.log(`Server running on Port ${process.env.PORT}`);
		});
        
		//WebSockets
		new Socket().connect(httpServer);
	}
}