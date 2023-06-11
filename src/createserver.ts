import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { stat } from 'fs';
import { Request, Response, NextFunction } from 'express';
const ServiceError = require('./core/serviceError');
const {initializeLogger, getLogger} = require('./core/logging');
const emoji = require('node-emoji');
const installRest = require('./rest&services/RestIndex');
dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

module.exports = async function createServer() {
	initializeLogger({level: 'info', disabled: false,
    defaultMeta: {dotenv}});
	const logger = getLogger();
    app.use((err:typeof ServiceError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = 500;
        const errorBody = {
          code: err.code || 'INTERNAL_SERVER_ERROR',
          message: err.message,
          details: err.details || {},
          stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
        };
    
        if (err instanceof ServiceError) {
          if (err.isNotFound) {
            res.status(404).json(errorBody);
            return;
          }
    
          if (err.isValidationFailed) {
            res.status(400).json(errorBody);
            return;
          }
    
          if (err.isUnauthorized) {
            res.status(401).json(errorBody);
            return;
          }
    
          if (err.isForbidden) {
            res.status(403).json(errorBody);
            return;
          }
        }
    
        res.status(statusCode).json(errorBody);
      });
    
      
    app.use((err: typeof ServiceError, req: Request, res: Response, next: NextFunction) => {
        console.log(`Error: ${err.message}`);
        next(err);
    });
    installRest(app);
    return {
		getApp() {
			return app;
		},
		start() {
return new Promise<void>((resolve) => {
        console.log("test")
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