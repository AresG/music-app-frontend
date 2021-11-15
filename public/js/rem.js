function remSize() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth >= 750) {
        deviceWidth = 750;
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320;
    }
    // 屏幕尺寸设定为750px
    // 设置一半的宽度，就是375px
    // 1rem = 100px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
    // body里字体大小为0.3rem/30px
    document.querySelector('body').style.fontSize = 0.3 + 'rem';
}

remSize();

window.onresize = function () {
    remSize();
}