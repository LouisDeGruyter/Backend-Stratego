import { Express } from 'express';
import installRankRouter from './rank/rank.router';
import installFieldRouter from './field/field.router';
import installPlayerRouter from './player/player.router';
import installUserRouter from './user/user.router';
export default function installRest(app: Express) :void {
  installRankRouter(app);
  installFieldRouter(app);
  installPlayerRouter(app);
  installUserRouter(app);
}
