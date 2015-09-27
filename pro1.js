(function () {
    function start() {
        var sec = 0;
        window.setInterval(//网页页脚函数,让浏览器每隔1秒都会执行一次函数。
        function () {
        sec = sec + 1;
        $("#needtime").text(sec);
        $("#flagleft").text(leftflag);
        }, 1000);
    }
    var cell = [];
    for(var i = 0; i < 8 ; i ++){
                cell[i] = [];
                for(var j = 0; j < 8; j ++){
                    cell[i][j] = 0; //64个单元格的的cell[u][v]=0
                }
            }
    

    function judge(){
        var time = 0;
           for  (var i = 0; i < 8 ; i ++){
                for(var j = 0; j < 8; j ++){
                    if(cell[i][j] ==1){
                        time ++;
                        console.log(i,j);
                    }
                }
           }
           //console.log(time);
           if(time == 54){
                setTimeout(function(){
                    if(window.confirm("you win,want to try again?"))
                         window.location.reload();
                    },200);     
            }
    }

    var s = document.querySelector("#start");
    s.addEventListener("click", waitUserClick, false);//目前先用这两句 之后用上面的代替
    s.addEventListener("click", start, false);

    var list = [];
    //var flagnumber = 6;
    var leftflag = 6;
    function drawbg() {//页面加载完毕调用函数，初始化棋盘
        var canvas = document.getElementById("bg");
        var context = canvas.getContext("2d");

        for (var i = 0; i <= 320; i += 40) {//绘制棋盘的线
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(320, i);
            //context.closePath();//绘制好路径之后，手动关闭路径，没有的话，context就会自动调用closepath关闭路径
            context.stroke();//绘制路径

            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, 320);
            //context.closePath();
            context.stroke();

        } 
         drawBomb();	    	
    }

    function drawBomb(){
    	var canvas = document.getElementById("bg");
        var context = canvas.getContext("2d");
        	var num = 0;
        	var i = 0;
          	while(num < 10){
          		var flag = 0;
    		    var c1 = rand(0,7);
    		    var c2 = rand(0,7);
    		    var obj = [c1,c2];

    		    for(var j = 0; j < list.length; j ++){
                    if (obj[0] == list[j][0] && obj[1] == list[j][1]){
                        flag = 1;
                        break;//跳出for循环
                    }
    			}
    		    if(flag == 1){
    		    	continue;//重新while
    		    }
    		    else{		    	
    		    	list[num] = [c1,c2];
    		    	num ++;
                    //var img = document.getElementById("source");
                    //context.drawImage(img, c1*40+8, c2*40+8, 24, 24);
    			}
    		}
    		
    }
    //判断点击的单元格是否有炸弹
    function whetherTopLeftCoorInList(m, n){
        var flag = 0;
        for(var i = 0; i < list.length ; i ++){
            if(m == list[i][0] && n == list[i][1]){
                flag = 1;
            }
        }
        return flag;
    }

    function rand(min,max){
    	var range = max - min;
    	var rand = Math.random();
    	return (min+ Math.round(rand * range));
    }

    function waitUserClick(){
        document.oncontextmenu = function(e){//禁止鼠标右击事件
               e.preventDefault();
           };
    	$("#bg").mousedown(function(event){
    		switch(event.which){
    			case 1:
    	            leftClick(event);//处理左击事件
    	            break;
    	        case 3:
                    event.preventDefault();
    	            rightClick(event);//处理右击事件
    	            break;
    	        default:
    	            alert('You have a strange Mouse!');
    		}
    	});
    }

    function rightClick(e){
        if(leftflag > 0){
            var x,y;
            var m, n;
            var rightclickpos = getClickPos(e);
            x = rightclickpos.a;
            y = rightclickpos.b;
            var topleft = getTopLeftCornerCoordinate(x, y);
            m = topleft.p;
            n = topleft.q;

            var image = document.getElementById("banner");
            var canvas = document.getElementById("bg");
            var context = canvas.getContext("2d");
            context.drawImage(image,m*40 + 8, n*40 +8, 24, 24);
            leftflag --;
        }
        else
            return;
    }

    function putNumber2(u, v, i) {
        
        var canvas = document.getElementById("bg");
        var context = canvas.getContext("2d");

        if (i != 0) {//如果当前坐标周围有雷
            var image = new Image;
            image.onload = function(){
                context.drawImage(image, u*40+8, v*40+8, 24, 24);
            }
           // image.setAttribute("src", i + ".png");  
            image.src="pic/" + i + ".png";
        }
        else {//如果当前坐标中没有雷，修改该单元格的颜色
            changeCellColor({ x: u*40, y: v*40 }, { x: u*40+40, y: v*40+40 })
        }
        cell[u][v] = 1;
    }

    function changeCellColor(topLeftCoor,bottomRightCoor){
       

        var c = document.getElementById("bg");
        var ctx = c.getContext("2d");
        ctx.fillStyle="#FFF000";
        ctx.fillRect(topLeftCoor.x+1,topLeftCoor.y+1,bottomRightCoor.x-topLeftCoor.x-2,bottomRightCoor.y-topLeftCoor.y-2);
    }

    function leftClick(e){
        var x,y;
        var m, n;
        var clickpos = getClickPos(e);
        x = clickpos.a;
        y = clickpos.b;

        var topleft = getTopLeftCornerCoordinate(x, y);//获取单击坐标的左上角坐标
        m = topleft.p;
        n = topleft.q;

        if(whetherTopLeftCoorInList(m, n)){//如果点中炸弹
            //console.log("you lose the game!");
            var canvas = document.getElementById("bg");
            var context = canvas.getContext("2d");
            for(var i = 0; i < list.length; i ++){
                var p = list[i][0];
                var q = list[i][1];
                var img = document.getElementById("source"); 
                context.drawImage(img, p*40 +8, q*40 +8, 24,24);
            }

            alert("you lose the game! want to play again?");
            window.location.reload();
        }
        else{//如果没有点中炸弹

            var isBomb = function (pt) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i][0] == pt[0] && list[i][1] == pt[1]) {
                        return true;
                    }
                }
                return false;
            }

            var countBombs = function (u, v) {
                var pt = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
                //console.log(pt.map(function(item,index,array){return item[0] + u, item[0] + v}));
                //console.log(pt.map(function (p) { return [p[0] + u, p[1] + v] }));
                return pt
                    //.map(function(item,index,array){return item[0] + u, item[0] + v})
                    .map(function (p) { return [p[0] + u, p[1] + v] })//无论点击的是否是边缘 都得到8个坐标
                    .map(isBomb) //对每个坐标进行判断，如果有雷 就为true 否则为false true false组成新的数组
                    .reduce(function(pre,cur){return pre + cur},0); // 有几个true 就得到数字几
                    //.reduce(function (i, prev) { return (i ? 1 : 0) + prev; }, 0);//0是初始值 
            } 
            var visited = []; 
            
            for(var i = 0; i < 8 ; i ++){
                visited[i] = [];
                for(var j = 0; j < 8; j ++){
                    visited[i][j] = 0; //64个单元格的的visited[u][v]=0
                }
            }

            var showBombNumberAround = function (u, v) {
                for(var i = 0; i < list.length; i ++){
                    if(u == list[i][0] && v == list[i][1])
                        return;
                }
                if (u < 0 || u > 7 || v < 0 || v > 7 || visited[u][v]) {
                    return;
                }

                var bombCount = countBombs(u, v);
                visited[u][v] = 1;
                putNumber2(u, v, bombCount);//无论周围有没有雷 统一由这个函数处理
                if (bombCount == 0) {
                    [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
                        .map(function (p) { return [p[0] + u, p[1] + v] })
                        .forEach(function (p) { showBombNumberAround(p[0], p[1]); });
                }
            }

            showBombNumberAround(m, n);
        }
        judge();
    }

    function getClickPos(e){
        var xPosition = 0;
        var yPosition = 0;
        var element = e.currentTarget;
        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        //console.log(xPosition);
        x=e.clientX - xPosition;
        y=e.clientY - yPosition;
        return {a : x, b : y};
    }

    function getTopLeftCornerCoordinate(x, y){
        m = x;
        n = y;
        while(m%40 != 0)
            m--;
            m /= 40;
        while(n%40 != 0)
            n--;
            n /= 40;
        return {p : m, q : n};
    }

    function getBottomRightCornerCoordiante(m,n){
        while(m%40 != 0)
            m++;
            m /= 40;
        while(n%40 != 0)
            n++;
            n /= 40;
        return {x : m, y : n};
    }

    drawbg();
})();

