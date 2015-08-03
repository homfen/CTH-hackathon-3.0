$(document).ready(function() {
    loadImg();
    window.onscroll = function() {
        if (checkscrollside()) {
            loadImg();
        };
    }
    setTimeout(function(){$(window).trigger("scroll");},100);
})

var dataInt = {
    'data': [
        {
            'src': '106.jpg',
            'tag': '热门',
            'title': '我的游记',
            'author': 'ZouWeiyun',
            'place': 'Shanghai'
        }, 
        {
            'src': '119.jpg',
            'tag': '热门',
            'title': '我在寻找你的路上',
            'author': '飞翔的猪',
            'place': 'Shanghai'
        }, 
        {
            'src': '120.jpg',
            'tag': '热门',
            'title': '你的孤独虽败犹荣',
            'author': '风行天下',
            'place': 'Shanghai'
        }, 
        {
            'src': '121.jpg',
            'tag': '热门',
            'title': '我思故我在',
            'author': '威龙',
            'place': 'Shanghai'
        }, 
        {
            'src': '125.jpg',
            'tag': '热门',
            'title': '我被判处终身寂寞',
            'author': '爱猫者',
            'place': 'Shanghai'
        }, 
        {
            'src': '128.jpg',
            'tag': '热门',
            'title': '所谓永远、所谓曾经',
            'author': '风行天下',
            'place': 'Shanghai'
        }, 
        {
            'src': '132.jpg',
            'tag': '热门',
            'title': '就这样毕业了',
            'author': '杨晓梅',
            'place': 'Shanghai'
        }, 
        {
            'src': '115.jpg',
            'tag': '热门',
            'title': '走过你来时的路',
            'author': '伤信',
            'place': 'Shanghai'
        }, 
        {
            'src': '113.jpg',
            'tag': '热门',
            'title': '时光还在你还在',
            'author': '他在那座城',
            'place': 'Shanghai'
        }, 
        {
            'src': '111.jpg',
            'tag': '热门',
            'title': '贝贝的世界',
            'author': '绿色心情',
            'place': 'Shanghai'
        }, 
    ],
    'recommend': [{
        'src': '115.jpg',
        'title': '走过你来时的路'
    }, {
        'src': '111.jpg',
        'title': '贝贝的世界'
    }, {
        'src': '113.jpg',
        'title': '时光还在你还在'
    }]
};

function loadImg() {
    var oParent = document.getElementById('main'); // 父级对象
    for (var i = 0; i < dataInt.data.length; i++) {
        var oPin = document.createElement('div'); //添加 元素节点
        oPin.className = 'pin'; //添加 类名 name属性
        oParent.appendChild(oPin); //添加 子节点
        var oBox = document.createElement('div');
        oBox.className = 'box';
        oPin.appendChild(oBox);
        var img='<a href="../detail/html/detail.html"><img src="images/'+dataInt.data[i].src+'" width="250"></a>'
        var title = '<div class="title">' + dataInt.data[i].title + '</div><div class="place">' + dataInt.data[i].place + '</div><div class="author">By ' + dataInt.data[i].author + '</div>';
var total=$(img+title);
        $(oBox).append(total);
    }

    waterfall('main', 'pin');

}
/*
    parend 父级id
    pin 元素id
*/
function waterfall(parent, pin) {
    var oParent = document.getElementById(parent); // 父级对象
    var aPin = getClassObj(oParent, pin); // 获取存储块框pin的数组aPin
    var iPinW = aPin[0].offsetWidth; // 一个块框pin的宽
    var num = 4; //每行中能容纳的pin个数【窗口宽度除以一个块框宽度】

    var pinHArr = []; //用于存储 每列中的所有块框相加的高度。
    for (var i = 0,len=aPin.length; i <len ; i++) { //遍历数组aPin的每个块框元素
        var pinH = aPin[i].offsetHeight;
        if (i < num) {
            pinHArr[i] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        } else {
            var minH = Math.min.apply(null, pinHArr); //数组pinHArr中的最小值minH
            var minHIndex = getminHIndex(pinHArr, minH);
            aPin[i].style.position = 'absolute'; //设置绝对位移
            aPin[i].style.top = minH + 'px';
            aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex] += aPin[i].offsetHeight; //更新添加了块框后的列高
        }
    }
}

/****
 *通过父级和子元素的class类 获取该同类子元素的数组
 */
function getClassObj(parent, className) {
    var obj = parent.getElementsByTagName('*'); //获取 父级的所有子集
    var pinS = []; //创建一个数组 用于收集子元素
    for (var i = 0; i < obj.length; i++) { //遍历子元素、判断类别、压入数组
        if (obj[i].className == className) {
            pinS.push(obj[i]);
        }
    };
    return pinS;
}
/****
 *获取 pin高度 最小值的索引index
 */
function getminHIndex(arr, minH) {
    for (var i in arr) {
        if (arr[i] == minH) {
            return i;
        }
    }
}


function checkscrollside() {
    var oParent = document.getElementById('main');
    var aPin = getClassObj(oParent, 'pin');
    var lastPinH = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length - 1].offsetHeight / 2); //创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //注意解决兼容性
    var documentH = document.documentElement.clientHeight; //页面高度
    return (lastPinH < scrollTop + documentH) ? true : false; //到达指定高度后 返回true，触发waterfall()函数
}
