let titleFun = function (chunkName, title) {
    let titleDef = '泰山院'
    if (chunkName.indexOf('index') !== -1) {
        return titleDef
    } else {
        return title + '_' + titleDef
    }
}
module.exports = {
    titleFun: titleFun
}