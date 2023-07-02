import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import handleError from './core/handleError';
import {initializeLogger, getLogger} from './core/logging';
import installRest from './rest&services/RestIndex';
import emoji from 'node-emoji';
import requestLoggingMiddleware from './core/handleLogging';
import {createServer} from "http";
import { Server } from 'socket.io';
import config from 'config';
import socket from './utils/socket';
import { checkIfAuthenticated } from './core/auth';
dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}
initializeLogger({level: 'info', disabled: false});
const app = express();
// app.use(checkJwtToken);
app.use(cors());
app.use(express.json());
app.use(requestLoggingMiddleware);
installRest(app);
app.use(handleError);
const logger = getLogger();


const corsOrigin = config.get<string>('corsOrigin');
const host = config.get<string>('host');
const port = config.get<number>('port');
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: corsOrigin,
		credentials: true,
	},
});

app.get('/', (req, res) => {
	res.send('Server is running.');
});
httpServer.listen(port,host, () => {
	logger.info(`httpserver is running on http://${host}:${port}`);
	socket({io});
});

export async function createExpressServer():Promise<{
	getApp(): express.Express;
	start(): Promise<void>;
	stop(): Promise<void>;
	}>{
	
    return {
		getApp() {
			return app;
		},
		start() {
return new Promise<void>((resolve) => {
        const port = process.env.PORT || 9000;
        app.listen(port);
        logger.info(`${emoji.get('rocket')}, Server started on port ${port}`);
     resolve()
});
		},
		async stop() {
			app.removeAllListeners();
			
			logger.info('Goodbye');
		}
	};

}

  