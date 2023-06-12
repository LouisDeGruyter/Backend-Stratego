import { Request, Response, NextFunction } from 'express';
import { getLogger } from './logging';
import emoji from 'node-emoji';





export default function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction) {
    const logger = getLogger();
    const { method, url, headers } = req;
    const getStatusEmoji = () => {
      if (res.statusCode >= 500) return emoji.get('skull');
      if (res.statusCode >= 400) return emoji.get('x');
      if (res.statusCode >= 300) return emoji.get('rocket');
      if (res.statusCode >= 200) return emoji.get('white_check_mark');
      return emoji.get('rewind');
    };
  
    logger.info(`${emoji.get('fast_forward')} ${method} ${url}`);
    logger.debug(headers.authorization); // 👈 1
    logger.debug(JSON.stringify((req as any).state?.user)); // 👈 2
    logger.debug((req as any).state?.jwtOriginalError); // 👈 3
  
    next();
  
    res.on('finish', () => {
      logger.info(
        `${getStatusEmoji()} ${method} ${res.statusCode} ${url}`,
      );
    });
  
    res.on('close', () => {
      logger.info(
        `${getStatusEmoji()} ${method} ${res.statusCode} ${url} (connection closed)`,
      );
    });
  
    res.on('error', (error) => {
      logger.error(`${emoji.get('x')} ${method} ${res.statusCode} ${url}`, {
        error,
      });
    });
  }