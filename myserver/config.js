/**
 * Created by bz on 2017/8/31.
 */
//授权
/*读取接口*/
//http://open.weibo.com/wiki/2/users/show 
//http://open.weibo.com/wiki/2/users/show
module.exports = {
    HOST:'api.weibo.com',
    APPKEY:'1742776748',
    APPSECRET:'ebb6d86f6bac78187a4f19f62bb64c2f',
    REDERECTURL:'http://192.168.17.69:3000/index.html',
    //PATH
    TOKEN:'/oauth2/access_token',
    HOMETIMELINE:'/2/statuses/home_timeline.json',
    USERTIMELINE:'/2/statuses/user_timeline.json',
    SHOW:'/2/statuses/show.json',
    GO:'/2/statuses/go',
}