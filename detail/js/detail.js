function createItems(data){
    for(var i=0,len=data.length;i<len;i++){
        var dayData = data[i];
        var header = $('<div class="header" id="H'+i+'">\
                                    <h3>\
                                        <span>'+dayData.dateStr+'</span>\
                                        <span>第'+chsNum[i+1]+'天</span>\
                                    </h3>\
                                </div>');
        $("#main .content").append(header);
        
        for(var j=0,len2=dayData.count;j<len2;j++){
            var item = $('<div class="item" id="I'+i+j+'"></div>');
            var player = CVideo(760,423,dayData,j);
            item.append(player);
            if(i==0&&j==0){
                player.video[0].play();
                player.video[0].webkitRequestFullscreen();
            }
            $("#main .content").append(item);
        }
    }
}

function createSide(data){
    for(var i=0,len=data.length;i<len;i++){
        var html = '<h3><a href="#H'+i+'">第'+chsNum[i+1]+'天</a></h3><ul>';
        for(var j=0,len2=data[i].addresses.length;j<len2;j++){
            if(i==0&&j==0){
                html+='<li class="current"><a href="#I'+i+j+'">'+data[i].addresses[j]+'</a></li>';
            }else{
                html+='<li><a href="#I'+i+j+'">'+data[i].addresses[j]+'</a></li>';
            }
        }
        html+='</ul>';
        $("#side").append($(html));
    }
    $("#side li").bind("click",function(){
        $("#side .current").removeClass("current");
        $(this).addClass("current");
    });
}

var data = [
    {
        count:2,
        dateStr:'2015-04-22',
        likes:[
            5,6
        ],
        comments:[
            ["1111"],
            ["2222"]
        ],
        addresses:[
            "跑马场",
            "蓝色清真寺"
        ],
        times:[
            '07:12:10',
            '08:50:33'
        ],
        srcs:[    
            '../media/1.mp4',           
            '../media/2.mp4'
        ],
        descriptions:[
            '这是在老城区里一幢不大的三层楼房子， 前前后后都隔着浅浅的小巷与对面的房子相依。',
            '君士坦丁七世波菲罗格尼图斯为了纪念他的祖父巴西尔一世贝斯雷奥斯，于公元10世纪建造。碑身外原来镶满了镀金青铜浮雕，顶端还有一个球。后在13世纪第四次十字军入侵时被洗劫熔化。只剩下石质的核心，被称为墙柱。'
        ]
    },
    {
        count:3,
        dateStr:'2015-04-23',
        likes:[
            7,8,9
        ],
        comments:[
            ["1111"],
            ["2222"],
            ["2222"]
        ],
        addresses:[
            "地下水宫",
            "圣索菲亚大教堂",
            "伊斯坦布尔大学"
        ],
        times:[
            '10:31:02',
            '13:40:44',
            '16:00:01'
        ],
        srcs:[            
            '../media/3.mp4',           
            '../media/1.mp4',
            '../media/2.mp4'
        ],
        descriptions:[
            '托普卡帕宫建筑群位于萨拉基里奥角， 这是个可以俯瞰金角湾及马尔马拉海的山岬， 在古老的过去，曾有拜占庭的卫城建于此处。',
            '今天是离开前的第二天， 经历了前面这十多天的旅程辛苦， 今日的任务就排得相对轻松点了。',
            '这一路来都没有见到什么华丽丽的清真寺， 于是决定在伊斯坦布尔的第一日， 先去把那些有名的清真寺逛咯~'
        ]
    }
];

createItems(data);
createSide(data);
