/**
 * Created by bz on 2017/8/25.
 */
module.exports = {
    bzToString: function (data) {
        return data.toString('utf-8', 0, data.length + 1);
    }
}