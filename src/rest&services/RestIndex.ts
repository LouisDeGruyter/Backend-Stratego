const installRankRouter = require('./rank/rank.router');

module.exports = (app:any) => {
    installRankRouter(app);
}