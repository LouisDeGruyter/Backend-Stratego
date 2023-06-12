import { Express } from 'express';
import installRankRouter from './rank/rank.router';
import installFieldRouter from './field/field.router';

export default function installRest(app: Express) {
  installRankRouter(app);
  installFieldRouter(app);
}
