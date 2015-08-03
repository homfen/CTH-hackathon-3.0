$(document).ready(function(){
    //$(".sidebar").css("height",$(window).height());

    $(".userInfo").on("click",function(){
        $('body').css({"height":"100%",
            "overflow":"hidden"
    });
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    })

    $(".setting").on("click",function(){
        $('body').css({"height":"100%",
            "overflow":"hidden"
    });
        $('.theme-popover-mask').fadeIn(100);
        $('.setting-popover').slideDown(200);
    })

        $('.close').click(function(){
            $('body').css({"height":"auto",
            "overflow":"visible"
    });
        $('.theme-popover-mask').fadeOut(100);
        $(this).parent().slideUp(200);
    })

    $(".sidebar").on("click","li",function(){
        $(this).css({
            color: "rgb(78, 190, 203)",
  background: "#F8FAFA"
        })
        $(this).siblings().css({
            color: "white",
  background: "rgb(78, 190, 203)"
        })

    });

    for(var i=0;i<3;i++){
        var title='<div class="recommend-title">'+dataInt.recommend[i].title+'</div>',
        img='<img src="images/'+dataInt.recommend[i].src+'" width="195" height="100">',
total=$(title+img);
$(".list_show li").eq(i).append(total);
    }

    $("#check4").on("click",function(){
        $(".radio-ad").toggle();
    })

})