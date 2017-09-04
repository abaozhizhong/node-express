/**
 * Created by bz on 2017/8/31.
 */
//授权
/*读取接口*/
//http://open.weibo.com/wiki/2/users/show 
//http://open.weibo.com/wiki/2/users/show
module.exports = {
    HOST:'api.weibo.com',

    //PATH
    //读取微博
    TOKEN:'/oauth2/access_token',
    HOMETIMELINE:'/2/statuses/home_timeline.json',
    USERTIMELINE:'/2/statuses/user_timeline.json',
    SHOW:'/2/statuses/show.json',
    GO:'/2/statuses/go',

    //评论
    COMMENTSSHOW:'/2/comments/show.json',

    //搜索某个话题下的微博
    TOPICS:'/2/search/topics.json'

}