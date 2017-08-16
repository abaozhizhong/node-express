/**
 * Created by bz on 2017/8/15.
 */
let fortunes = [
    '高~',
    '福',
    '帅'
]

exports.getFortunes = function () {
    var index = Math.floor(Math.random()*fortunes.length)
    return fortunes[index];
}