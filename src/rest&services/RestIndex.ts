const installRankRouter = require('./rank/rank.router');
const installFieldRouter = require('./field/field.router');

module.exports = (app:any) => {
    installRankRouter(app);
    installFieldRouter(app);

}