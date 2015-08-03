var chsNum = ["零","一","二","三","四","五","六","七","八","九","十"];

function CVideo(width,height,data,index){
    if(!index) index = 0;
    var html = '<div class="player">\
                        <video class="video video-js vjs-default-skin" controls preload="none" width="'+width+'" height="'+height+'" src="'+data.srcs[index]+'">\
                        </video>\
                        <div class="overlays"></div>\
                    </div>\
                    <div style="margin:15px 0 10px;"><p>'+data.descriptions[index]+'</p></div>\
                    <div class="footer">\
                        <span class="time">'+data.times[index]+'</span>\
                        <a class="like">喜欢('+data.likes[index]+')</a>\
                        <a class="commentNum">评论('+data.comments[index].length+')</a>\
                    </div>';
    var player = $(html);
    player.width = width;
    player.height = height;
    player.data = data;
    player.currentIndex = index;
    player.video = player.find("video");
    player.overlays = player.find(".overlays");
    player.addOverlay = function(html,position,delay,timing){
        var overlay = $(html);
        if(position){
            overlay.css({"position":"absolute","display":"none"});
            if(typeof position=="string"){
                switch(position){
                    case "lefttop":
                        overlay.css({"left":0,"top":0});
                        break;
                    case "righttop":
                        overlay.css({"right":0,"top":0});
                        break;
                    case "leftbottom":
                        overlay.css({"left":0,"bottom":0});
                        break;
                    case "rightbottom":
                        overlay.css({"right":0,"bottom":0});
                        break;
                    case "center":
                        overlay.css({"left":"50%","top":"50%","transform":"translate(-50%,-50%)"});
                        break;
                    case "leftcenter":
                        overlay.css({"left":0,"top":"50%","transform":"translate(0,-50%)"});
                        break;
                    case "rightcenter":
                        overlay.css({"right":0,"top":"50%","transform":"translate(0,-50%)"});
                        break;
                    case "topcenter":
                        overlay.css({"left":"50%","top":0,"transform":"translate(-50%,0)"});
                        break;
                    case "bottomcenter":
                        overlay.css({"left":"50%","bottom":0,"transform":"translate(-50%,0)"});
                        break;
                    default:
                        overlay.css({"right":0,"top":0});
                        break;
                }
            }else if(typeof position=="object"){
                overlay.css(position);
            }
        }
        player.overlays.append(overlay);
        if(delay){
            setTimeout(function(){
                overlay.fadeIn();
                if(timing){
                    setTimeout(function(){
                        overlay.fadeOut();
                    },timing);
                }
            },delay);
        }else{
            if((!overlay.hasClass("toplay")&&!overlay.hasClass("next")&&!overlay.hasClass("prev"))||document.webkitIsFullScreen){
                overlay.fadeIn();
                if(timing){
                    setTimeout(function(){
                        overlay.fadeOut();
                    },timing);
                }
            }
        }    
    }
    function fullscreenMoveHandler(){
        player.next.show();
        player.prev.show();
        if(player.timer){
            clearTimeout(player.timer);
        }
        player.timer = setTimeout(function(){
            player.next.fadeOut();
            player.prev.fadeOut();
        },5000);
    }
    player.on("webkitfullscreenchange", function () {
        var isFullScreen = document.webkitIsFullScreen;
        if(isFullScreen){
            player.overlays.addClass("fullscreen");
            player.bind('mousemove',fullscreenMoveHandler);
            player.toplay.slideDown();
            player.setAd();
        }else{
            player.overlays.removeClass("fullscreen");
            player.unbind('mousemove',fullscreenMoveHandler);
            player.next.hide();
            player.prev.hide();
            player.toplay.hide();
            player.goulay && player.goulay.hide();
            player.jianlay && player.jianlay.hide();
            player.shang && player.shang.hide();
        }
    });
    player.setToplay = function(index){
        if(player.toplay){
            player.toplay.remove();
        }
        player.toplay = $('<div class="toplay">\
                                <div><p style="padding:0;margin:0;">'+player.data.descriptions[index]+'</p></div>\
                                <div class="toplayIcons">\
                                    <a class="like">喜欢('+player.data.likes[index]+')</a>\
                                    <a class="commentNum">评论('+player.data.comments[index].length+')</a>\
                                    <a class="gou">代购</a>\
                                    <a class="jian">推荐</a>\
                                    <a class="shang">打赏</a>\
                                </div>\
                            </div>');
        player.toplay.find(".gou").bind("click",function(){
            if(!player.goulay){
                player.goulay = $('<div class="goulay" style="display:none;">\
                                                <div class="gouitem">\
                                                    <a href="http://g.ctrip.com/merchant/detail/660" target="_blank">\
                                                    <img src="../image/apm.jpg">\
                                                    <div>\
                                                        <p>APM MONACO</p>\
                                                        <p>APM MONACO（巴黎店）</p>\
                                                    </div>\
                                                    </a>\
                                                </div>\
                                                <div class="gouitem">\
                                                    <a href="http://g.ctrip.com/merchant/detail/466" target="_blank">\
                                                    <img src="../image/la.jpg">\
                                                    <div>\
                                                        <p>La Vallée Village</p>\
                                                        <p>山谷购物村</p>\
                                                    </div>\
                                                    </a>\
                                                </div>\
                                                <div class="gouitem">\
                                                    <a href="http://g.ctrip.com/merchant/detail/287" target="_blank">\
                                                    <img src="../image/one.jpg">\
                                                    <div>\
                                                        <p>One Nation</p>\
                                                        <p>One Nation高档时装折扣店</p>\
                                                    </div>\
                                                    </a>\
                                                </div>\
                                            </div>');
            }
            if(player.goulay.css("display")=="none"){
                if(player.jianlay) player.jianlay.hide();
                player.addOverlay(player.goulay,{right:0,top:61});
            }else{
                player.goulay.hide();
            }
        });
        player.toplay.find(".jian").bind("click",function(){
            if(!player.jianlay){
                player.jianlay = $('<div class="goulay" style="display:none;">\
                                                <div class="gouitem">\
                                                    <a href="http://vacations.ctrip.com/around/p2666945s2.html" target="_blank">\
                                                    <img src="../image/jian1.jpg">\
                                                    <div>\
                                                        <p>浙江千岛湖2日1晚半自助游·千岛湖激情漂流  宿阳光水岸度假村</p>\
                                                    </div>\
                                                    </a>\
                                                </div>\
                                                <div class="gouitem">\
                                                    <a href="http://vacations.ctrip.com/around/p2814237s2.html" target="_blank">\
                                                    <img src="../image/jian2.jpg">\
                                                    <div>\
                                                        <p>浙江舟山+浙江普陀山2日1晚跟团游·纯玩祈福 赠送旅意险 入住农家乐</p>\
                                                    </div>\
                                                    </a>\
                                                </div>\
                                                <div class="gouitem">\
                                                    <a href="http://vacations.ctrip.com/grouptravel/p2487127s2.html" target="_blank">\
                                                    <img src="../image/jian3.jpg">\
                                                    <div>\
                                                        <p>华东3市+乌镇4日3晚跟团游(5钻)·携程会员专属 五星订制 上海成团</p>\
                                                    </div>\
                                                    </a>\
                                                </div>\
                                            </div>');
            }
            if(player.jianlay.css("display")=="none"){
                if(player.goulay) player.goulay.hide();
                player.addOverlay(player.jianlay,{right:0,top:61});
            }else{
                player.jianlay.hide();
            }
        });
        player.toplay.find(".shang").bind("click",function(){
            if(player.shang && player.shang.css("display")!="none"){
                player.shang.hide();
            }else{
                player.shang = $('<div class="shanglay" style="display:none;"><img src="../image/qian.png"/>作者拍视频这么辛苦，打赏<span class="qian">1元</span>？<a class="payok" href="https://www.alipay.com" target="_blank">OK</a><a class="close">算了</a></div>');
                player.shang.find(".close").bind("click",function(){
                    player.shang.fadeOut();
                });
                player.addOverlay(player.shang,{"left":"50%","bottom":"20px","transform":"translate(-50%,0)"});
            }
        });
        player.addOverlay(player.toplay,"lefttop");
    }
    player.setAd = function(){
        player.ad = $('<div class="ad"><img src="../image/ad.jpg" width="96"/><a class="close">x</a></div>');
        player.ad.find(".close").bind("click",function(){
            player.ad.fadeOut();
        });
        player.addOverlay(player.ad,{left:"10px",bottom:"10px"},3000);
    }
    player.setToplay(index);
    player.on("click",function(e){
        var target = $(e.target);
        if(!target.hasClass("like") && !target.hasClass("liked")) return;
        var isLike = target.hasClass("like");
        var likeNum = player.data.likes[player.currentIndex]+(isLike?1:-1);
        player.data.likes[player.currentIndex]=likeNum;
        if(isLike){
            player.find(".toplay .like").each(function(i,like){
                $(like).removeClass('like').addClass('liked').html('喜欢('+likeNum+')');
            });
            $(".footer:eq("+player.currentIndex+") .like").each(function(i,like){
                $(like).removeClass('like').addClass('liked').html('喜欢('+likeNum+')');
            });
        }else{
            player.find(".toplay .liked").each(function(i,like){
                $(like).removeClass('liked').addClass('like').html('喜欢('+likeNum+')');
            });
            $(".footer:eq("+player.currentIndex+") .liked").each(function(i,like){
                $(like).removeClass('liked').addClass('like').html('喜欢('+likeNum+')');
            });
        }
    });
    player.next = $('<div class="next"></div>');
    player.next.on('click',function(){
        var index = player.currentIndex+1;
        var src = player.data.srcs[index];
        if(src){
            player.video.attr("src",src);
            player.video[0].play();
            player.currentIndex +=1;
            player.setToplay(index);
        }
    });
    player.addOverlay(player.next,"rightcenter");
    player.prev = $('<div class="prev"></div>');
    player.prev.on('click',function(){
        var index = player.currentIndex-1;
        var src = player.data.srcs[index];
        if(src){
            player.video.attr("src",src);
            player.video[0].play();
            player.currentIndex -=1;
            player.setToplay(index);
        }
    });
    player.addOverlay(player.prev,"leftcenter");
    return player;
}

function removeSelf(self){
    $(self).fadeOut();
}

function timeToStr(d){
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}

function timeToDate(d){
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
}