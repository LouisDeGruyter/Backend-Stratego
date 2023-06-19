import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import handleError from './core/handleError';
import {initializeLogger, getLogger} from './core/logging';
import installRest from './rest&services/RestIndex';
import emoji from 'node-emoji';
import requestLoggingMiddleware from './core/handleLogging';

dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}
initializeLogger({level: 'info', disabled: false});
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLoggingMiddleware);
installRest(app);

app.use(handleError);

const logger = getLogger();

module.exports = async function createServer() {
	
    return {
		getApp() {
			return app;
		},
		start() {
return new Promise<void>((resolve) => {
        const port = process.env.PORT || 5000;
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

  