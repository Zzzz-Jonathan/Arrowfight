/*document.onkeydown = function(e){
    var obj = document.getElementById("arrow");
    var x = obj.offsetLeft;
    var y = obj.offsetTop;
    switch ((e||event).keyCode) {
        case 37: x--; break;
        case 39: x++; break;
        case 38: y--; break;
        case 40: y++; break;
    }
    obj.style.left = x+"px";
    obj.style.top = y+"px";
};
document.onkeydown = function(e){
    var oEvent = e || event;
    keyCode = oEvent.keyCode;
    var obj = document.getElementById("arrow");
   if (keyCode == 37) {

   }
        case 37:
            direction -= 10;
            direction %= 360;
            obj.style.transform = 'rotate('+direction+'deg)';
            //console.log(direction);
            break;
        case 39:
            direction += 10;
            direction %= 360;
            obj.style.transform = 'rotate('+direction+'deg)';
            //console.log(direction);
            break;
    }
}
*/
var direction = 0, time = 60, score = 0, startFlag = 0, doorAble = 0, doorHigh = 0;
var isPressed = {}, ex = {}, ey = {}, punishment = [1,1,1,1];
var flag1 = 1,flag2 = 1, ax = 0, ay = 0, desx = 0, desy = 0, forbid = {}, jumpCd = 0, canJump = 0, displayFlag = 0, dirr = 0, dirl = 0;
var btn = document.getElementById("btn1");
var jDT = new Door(document.getElementsByClassName("jumpDoor"),document.getElementsByClassName("jumpDoorMask"));
var movr = new Mr(document.getElementById('movingr')), movl = new Ml(document.getElementById('movingl'));
var movEme = new Enemylive(document.querySelectorAll('.enemy'));

document.addEventListener("keyup",function(e){
    isPressed[e.keyCode] = false;
});
document.addEventListener("keydown",function(e){
    isPressed[e.keyCode] = true;
});
document.addEventListener("mousedown",function(e){
    if (startFlag) {
        displayFlag = 1;
    }
});
document.addEventListener("mouseup",function(e){
    var sdwi = document.getElementById("shadow").getElementsByTagName("img")[0];
    var obj = document.getElementById("arrow");
    var dx = 0, dy = 0, angle = 0;
    if (startFlag) {
        if (canJump){
            jumpCd -= 2.5;
            canJump = 0;
            angle = direction*Math.PI/180;
            dx = Math.sin(angle)*250;
            dy = Math.cos(angle)*250;
            if ((ax < 0 && dx < 0) || (ax > 1398 && dx > 0)){}
            else ax += dx;
            if ((ay < 0 && dy > 0) || (ay > 678 && dy < 0)){}
            else ay -= dy;
            obj.style.left = ax+"px";
            obj.style.top = ay+"px";
        }
        sdwi.style.display = "none";
        displayFlag = 0;
    }
});
btn.onclick = function (){
    if (!startFlag){
        time = 60;
        score = 0;
        jumpCd = 0;
        var num = document.getElementById("count").getElementsByTagName("h1")[0];
        num.innerHTML = 3;
        num.style.display = "block";
        setTimeout(function(){
            num.innerHTML = 2;
            setTimeout(function(){
                num.innerHTML = 1;
                setTimeout(function(){
                    num.style.display = "none";
                    startFlag = 1;
                },1000);
            },1000);
        },1000);
        movEme.freshEme();
    }
};
function Door(objectDoor,objectMask){
    this.jumpTo = function (){
        var x1 = objectDoor[0].offsetLeft, y1 = objectDoor[0].offsetTop, x2 = objectDoor[1].offsetLeft, y2 = objectDoor[1].offsetTop;
        var obj = document.getElementById("arrow");
        if ((ax > (x1 - 21) && ax < (x1 +51)) && (ay > (y1 - 21) && ay < (y1 +51)) && doorAble){
            ax = x2 + 10;
            ay = y2 + 10;
            obj.style.top = (y2+10)+'px';
            obj.style.left = (x2+10)+'px';
            console.log('1');``
            doorAble = 0;
            doorHigh = 0;
        }
        else if ((ax > (x2 - 21) && ax < (x2 +51)) && (ay > (y2 - 21) && ay < (y2 +51)) && doorAble){
            ax = x1 + 10;
            ay = y1 + 10;
            obj.style.top = (y1+10)+'px';
            obj.style.left = (x1+10)+'px';
            console.log('2');
            doorAble = 0;
            doorHigh = 0;
        }
    }
    this.changeCd = function (){
        if (doorHigh <= 63){
            doorHigh += 0.063;
            objectMask[0].style.height = doorHigh+'px';
            objectMask[1].style.height = doorHigh+'px';
        }
        else doorAble = 1;
    }
    this.freshDoor = function (){
        var x1 = Math.random()*1377, y1 = Math.random()*657, x2 = Math.random()*1377, y2 = Math.random()*657;
        objectDoor[0].style.left = x1+'px';
        objectDoor[0].style.top = y1+'px';
        objectDoor[1].style.left = x2+'px';
        objectDoor[1].style.top = y2+'px';
    }
}
function Enemylive(mE){
    this.moveEnemy = function (){
        var obj = document.getElementById("arrow");
        for(i = 0; i < mE.length; i++){
            var x = mE[i].offsetLeft, y = mE[i].offsetTop;
            var moveDir = Math.atan((y-obj.offsetTop)/(obj.offsetLeft-x));
            if(!isNaN(moveDir)){
                if (ax <= x) moveDir += Math.PI;
                ex[i] += Math.cos(moveDir);
                ey[i] -= Math.sin(moveDir);
                mE[i].style.left = ex[i]+'px';
                mE[i].style.top = ey[i]+'px';
            }
        }
    }
    this.freshEme = function (){
        if(flag2){
            for(var i = 0; i < mE.length; i++){
                ex[i] = mE[i].offsetLeft;
                ey[i] = mE[i].offsetTop;
            }
            flag2 = 0;
        }
        for(i = 0; i < mE.length; i++){
            var rTheta = 3.14*2*Math.random();
            ex[i] = ax + 330*Math.cos(rTheta);
            ey[i] = ay - 330*Math.sin(rTheta);
        }
    }
    this.punish = function (){
        for(var i = 0; i < mE.length; i++){
            if(ax < (ex[i]+42) && ax > (ex[i]-42) && ay < (ey[i] + 42) && ay > (ey[i]-42)){
                if (punishment[i]  >= 1){
                    score -= 1;
                    punishment[i] = 0;
                }
            }
            if(punishment[i] < 1) punishment[i] += 0.01;
        }
    }
}
function  jump(){
    var jcd = document.getElementById("jumpCd2");
    var sdwi = document.getElementById("shadow").getElementsByTagName("img")[0];
    var sdw = document.getElementById("shadow");
    var obj = document.getElementById("arrow");
    var dx = 0, dy = 0, angle = 0;
    if (startFlag){
        if (displayFlag) {
            sdwi.style.display = "block";
        }
        else sdwi.style.display = "none";
        angle = direction*Math.PI/180;
        dx = Math.sin(angle)*250;
        dy = Math.cos(angle)*250;
        sdw.style.left = (ax+dx)+"px";
        sdw.style.top = (ay-dy)+"px";
        if (jumpCd <= 3.3) jumpCd += 0.005;
        jcd.style.width = jumpCd*100+"px";
        if (jumpCd >= 2.5) {
            canJump = 1;
            obj.style.backgroundColor = "rgba(255,255,0,0.5)";
        }
        else obj.style.backgroundColor = "rgba(255,255,0,0)";
    }
}
function move(){
    if (startFlag){
        var obj = document.getElementById("arrow");
        var arr = document.getElementById("arrow");
        var mr = document.getElementById('movingr');
        var ml = document.getElementById('movingl');
        var axisa = [arr.offsetLeft,arr.offsetTop], axisr = [mr.offsetLeft,mr.offsetTop], axisl = [ml.offsetLeft,ml.offsetTop];
        var x = obj.offsetLeft;
        var y = obj.offsetTop;
        //console.log(obj);
        var dx = 0, dy = 0, angle = 0;
        if(flag1){
            ax = x;
            ay = y;
            flag1 = 0;
        }
        if(isPressed[68] && !isPressed[32]){
            //console.log('r');
            direction++;
            direction %= 360;
            obj.style.transform = 'rotate('+direction+'deg)';
        }
        if(isPressed[65] && !isPressed[32]){
            //console.log('l');
            direction--;
            direction %= 360;
            obj.style.transform = 'rotate('+direction+'deg)';
        }
        if(isPressed[32] && !(isPressed[65] || isPressed[68])){
            //console.log('space');
            angle = direction*Math.PI/180;
            dx = Math.sin(angle);
            dy = Math.cos(angle);
            obj.style.transform = 'rotate('+direction+'deg)';
            //console.log(ax,ay);
            if(!(((axisa[0] <= (axisr[0] + 84) && axisa[0] >= (axisr[0] - 42)) && (axisa[1] <= (axisr[1] + 214) && axisa[1] >= (axisr[1] - 42))) || ((axisa[0] <= (axisl[0] + 214) && axisa[0] >= (axisl[0] - 42)) && (axisa[1] <= (axisl[1] + 84) && axisa[1] >= (axisl[1] - 42))))){
                if ((ax < 0 && dx < 0) || (ax > 1398 && dx > 0)){}
                else ax += dx;
                if ((ay < 0 && dy > 0) || (ay > 678 && dy < 0)){}
                else ay -= dy;
            }
        }
        if(isPressed[68] && isPressed[32]){
            //console.log('r&s');
            direction++;
            direction %= 360;
            obj.style.transform = 'rotate('+direction+'deg)';
            angle = direction*Math.PI/180;
            dx = Math.sin(angle);
            dy = Math.cos(angle);
            //console.log(ax,ay);
            if(!(((axisa[0] <= (axisr[0] + 84) && axisa[0] >= (axisr[0] - 42)) && (axisa[1] <= (axisr[1] + 214) && axisa[1] >= (axisr[1] - 42))) || ((axisa[0] <= (axisl[0] + 214) && axisa[0] >= (axisl[0] - 42)) && (axisa[1] <= (axisl[1] + 84) && axisa[1] >= (axisl[1] - 42))))){
                if ((ax < 0 && dx < 0) || (ax > 1398 && dx > 0)){}
                else ax += dx;
                if ((ay < 0 && dy > 0) || (ay > 678 && dy < 0)){}
                else ay -= dy;
            }
        }
        if(isPressed[65] && isPressed[32]){
            //console.log('l&s');
            direction--;
            direction %= 360;
            obj.style.transform = 'rotate('+direction+'deg)';
            angle = direction*Math.PI/180;
            dx = Math.sin(angle);
            dy = Math.cos(angle);
            //console.log(ax,ay);
            if(!(((axisa[0] <= (axisr[0] + 84) && axisa[0] >= (axisr[0] - 42)) && (axisa[1] <= (axisr[1] + 214) && axisa[1] >= (axisr[1] - 42))) || ((axisa[0] <= (axisl[0] + 214) && axisa[0] >= (axisl[0] - 42)) && (axisa[1] <= (axisl[1] + 84) && axisa[1] >= (axisl[1] - 42))))){
                if ((ax < 0 && dx < 0) || (ax > 1398 && dx > 0)){}
                else ax += dx;
                if ((ay < 0 && dy > 0) || (ay > 678 && dy < 0)){}
                else ay -= dy;
            }
        }
        if (isPressed[65] && isPressed[68]) {}
        obj.style.left = ax+"px";
        obj.style.top = ay+"px";
    }
}
function Mr(objectr){
    this.moving = function (){
        var xtop = objectr.offsetTop;
        if(dirr){
            if(xtop <= 506) objectr.style.top = xtop+1+'px';
            else dirr = 0;
        }
        else{
            if(xtop >= 0) objectr.style.top = xtop-1+'px';
            else dirr = 1;
        }
    }
    this.refresh = function (){
        objectr.style.left = Math.random()*1356+'px';
        objectr.style.top = Math.random()*506+'px';
    }
}
function Ml(objectl){
    this.moving = function (){
        var xleft = objectl.offsetLeft;
        if(dirl){
            if(xleft <= 1226) objectl.style.left = xleft+1+'px';
            else dirl = 0;
        }
        else{
            if(xleft >= 0) objectl.style.left = xleft-1+'px';
            else dirl = 1;
        }
    }
    this.refresh = function (){
        objectl.style.left = Math.random()*1226+'px';
        objectl.style.top = Math.random()*636+'px';
    }
}
function boundFix(){
    var arr = document.getElementById("arrow");
    var mr = document.getElementById('movingr');
    var ml = document.getElementById('movingl');
    var axisa = [arr.offsetLeft,arr.offsetTop], axisr = [mr.offsetLeft,mr.offsetTop], axisl = [ml.offsetLeft,ml.offsetTop];
    var axis1 = [axisa[0] - axisr[0],axisa[1] - axisr[1]], axis2 = [axisa[0] - axisl[0],axisa[1] - axisl[1]], hr = mr.offsetHeight, wr = mr.offsetWidth, hl = ml.offsetHeight,wl = ml.offsetWidth,kr = hr/wr, kl = hl/wl;
    if((axisa[0] <= (axisr[0] + 84) && axisa[0] >= (axisr[0] - 42)) && (axisa[1] <= (axisr[1] + 214) && axisa[1] >= (axisr[1] - 42))) {
        if(axis1[0] < 0.5*wr){
            if(axis1[1] < 0.5*hr) {
                if(axis1[1] < kr*axis1[0]) ay = axisr[1]-46;
                else ax = axisr[0]-46;
            }
            else {
                if(axis1[1] < (hr - kr*axis1[0])) ax = axisr[0]-46;
                else ay = axisr[1]+hr+4;
            }
        }
        else{
            if(axis1[1] < 0.5*hr) {
                if(axis1[1] < (hr - kr*axis1[0])) ay = axisr[1]-46;
                else ax = axisr[0]+wr+4;
            }
        else {
                if(axis1[1] < kr*axis1[0]) ax = axisr[0]+wr+4;
                else ay = axisr[1]+hr+4;
            }
        }
    }
    if((axisa[0] <= (axisl[0] + 214) && axisa[0] >= (axisl[0] - 42)) && (axisa[1] <= (axisl[1] + 84) && axisa[1] >= (axisl[1] - 42))) {
        if(axis2[0] < 0.5*wl){
            if(axis2[1] < 0.5*hl) {
                if(axis2[1] < kl*axis2[0]) ay = axisl[1]-46;
                else ax = axisl[0]-46;
            }
            else {
                if(axis2[1] < (hl - kl*axis2[0])) ax = axisl[0]-46;
                else ay = axisl[1]+hl+4;
            }
        }
        else{
            if(axis2[1] < 0.5*hl) {
                if(axis2[1] < (hl - kl*axis2[0])) ay = axisl[1]-46;
                else ax = axisl[0]+wl+4;
            }
            else {
                if(axis2[1] < kl*axis2[0]) ax = axisl[0]+wl+4;
                else ay = axisl[1]+hl+4;
            }
        }
    }
}
function startGame(){
    var timeRest = document.getElementById("time").getElementsByTagName("h1")[0];
    var num = document.getElementById("count").getElementsByTagName("h1")[0];
    var soc = document.getElementById("score").getElementsByTagName("h1")[0];
    var obj = document.getElementById("arrow");
    var destination = document.getElementById("destination");
    var forbr = document.getElementsByClassName("fr");
    var forbl = document.getElementsByClassName("fl");
    for (var i = 0; i <= 5; i++){
        if (i <= 2) forbid[i] = forbr[i].offsetLeft;
        if (i > 2) forbid[i] = forbr[i-3].offsetTop;
    }
    for (i = 0; i <= 5; i++){
        if (i <= 2) forbid[i+6] = forbl[i].offsetLeft;
        if (i > 2) forbid[i+6] = forbl[i-3].offsetTop;
    }
    soc.innerHTML = score;
    desx = destination.offsetLeft;
    desy = destination.offsetTop;
    //console.log(desx);
    var x = obj.offsetLeft;
    var y = obj.offsetTop;
    if (startFlag) {
        if (time <= 0 || score < 0) {
            startFlag = 0;
            num.innerHTML = "Time Out!";
            num.style.display = "block";
            setTimeout(function () {
                num.style.display = "none";
            }, 1000);
        } else {
            time -= 0.01;
            timeRest.innerHTML = time.toFixed(2) + 's';
            //console.log(timeRest.innerHTML);
        }
        if ((x <= (desx + 63) && x >= (desx - 21)) && (y <= (desy + 63) && y >= (desy - 21))) {
            score += 2;
            time += 7;
            //soc.innerHTML = score;
            desx = Math.random() * 1356;
            desy = Math.random() * 636;
            destination.style.left = desx + "px";
            destination.style.top = desy + 'px';
            for (i = 0; i <= 2; i++) {
                forbid[i] = Math.random() * 1356;
            }
            for (i = 3; i <= 5; i++) {
                forbid[i] = Math.random() * 506;
            }
            for (i = 6; i <= 8; i++) {
                forbid[i] = Math.random() * 1226;
            }
            for (i = 9; i <= 11; i++) {
                forbid[i] = Math.random() * 636;
            }
            for (i = 0; i <= 11; i++) {
                if (i <= 2) forbr[i].style.left = forbid[i]+ "px";
                if (i > 2 && i <= 5) forbr[i - 3].style.top = forbid[i]+ "px";
                if (i > 5 && i <= 8) forbl[i - 6].style.left = forbid[i]+ "px";
                if (i > 8 && i <= 11) forbl[i - 9].style.top = forbid[i]+ "px";
            }
            jDT.freshDoor();
            movr.refresh();
            movl.refresh();
            movEme.freshEme();
        }
        else {
            if ((x <= (forbid[0] + 84) && x >= (forbid[0] - 42)) && (y <= (forbid[3] + 214) && y >= (forbid[3] - 42))) time -= 0.1;
            if ((x <= (forbid[1] + 84) && x >= (forbid[1] - 42)) && (y <= (forbid[4] + 214) && y >= (forbid[4] - 42))) time -= 0.1;
            if ((x <= (forbid[2] + 84) && x >= (forbid[2] - 42)) && (y <= (forbid[5] + 214) && y >= (forbid[5] - 42))) time -= 0.1;
            if ((x <= (forbid[6] + 214) && x >= (forbid[6] - 42)) && (y <= (forbid[9] + 84) && y >= (forbid[9] - 42))) time -= 0.1;
            if ((x <= (forbid[7] + 214) && x >= (forbid[7] - 42)) && (y <= (forbid[10] + 84) && y >= (forbid[10] - 42))) time -= 0.1;
            if ((x <= (forbid[8] + 214) && x >= (forbid[8] - 42)) && (y <= (forbid[11] + 82) && y >= (forbid[11]  - 42))) time -= 0.1;
        }
    }
}
var s1 = setInterval("move()",5);
var s2 = setInterval("startGame()",10);
var s3 = setInterval("jump()",5);
var s4 = setInterval(function (){
    if (startFlag){
        if (doorAble) jDT.jumpTo();
        jDT.changeCd();
    }
},10);
var s5 = setInterval(function (){
    if (startFlag){
        movr.moving();
        movl.moving();
        boundFix();
    }
},1);
var s6 = setInterval(function (){
    if(startFlag){
        movEme.moveEnemy();
    }
},10);
var s7 = setInterval(function (){
    if(startFlag){
        movEme.punish();
    }
},10);
