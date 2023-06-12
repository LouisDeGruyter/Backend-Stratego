import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import handleError from './core/handleError';
const ServiceError = require('./core/serviceError');
const {initializeLogger, getLogger} = require('./core/logging');
const emoji = require('node-emoji');
const installRest = require('./rest&services/RestIndex');
dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}
const app = express();
installRest(app);
app.use(cors());
app.use(express.json());
app.use(handleError);


module.exports = async function createServer() {
	initializeLogger({level: 'info', disabled: false,
    defaultMeta: {dotenv}});
    return {
		getApp() {
			return app;
		},
		start() {
return new Promise<void>((resolve) => {
        const port = process.env.PORT || 5000;
        app.listen(port);
        console.log(emoji.get('rocket'), `Server started on port ${port}`);
     resolve()
});
		},
		async stop() {
			app.removeAllListeners();
			
			getLogger().info('Goodbye');
		}
	};

}