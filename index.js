var canvas = null;
var ctx = null;
var interval = null;  //计时器

var clockRadius = 150;  //钟表半径
var hoursCalibrationWidth = 3; //时针刻度宽度
var minutesCalibrationWidth = 1; //分针刻度宽度
var hoursLineWidth = 10;  //时针宽度
var minutesLineWidth = 7;  //分针宽度
var secondsLineWidth = 4;  //秒针宽度

window.addEventListener("visibilitychange", function (event) {
    if (document.hidden) {
        window.clearInterval(interval);
        interval = null;
    } else {
        startDraw();
    }
})

window.addEventListener("load", function () {
    canvas = document.getElementById('clock');
    if (!canvas.getContext) {
        return;
    }
    //去除透明度
    ctx = canvas.getContext('2d', { alpha: false });
    //移动中心
    ctx.translate(canvas.width / 2, canvas.height / 2);
    //设置钟表半径
    clockRadius = Math.min(canvas.width, canvas.height) / 2;
    //调整路径结束点样式
    ctx.lineCap = "round";
    //开始绘制
    startDraw();
});

function startDraw() {
    drawClock();
    interval = setInterval(function () {
        drawClock();
    }, 1000);
}

function drawClock() {
    ctx.clearRect(-clockRadius, -clockRadius, 2 * clockRadius, 2 * clockRadius);
    //火狐浏览器问题
    ctx.fillStyle = "white";
    ctx.fillRect(-clockRadius, -clockRadius, 2 * clockRadius, 2 * clockRadius);
    
    drawCalibration();
    drawHourText();

    drawDateTime();

    drawCenterCicle();
}

//画时钟圆心
function drawCenterCicle() {
    ctx.beginPath();
    ctx.fillStyle = "#999999";
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#666666";
    ctx.arc(0, 0, 3, 0, 2 * Math.PI);
    ctx.fill();
}

//画时间
function drawDateTime() {
    ctx.strokeStyle = "black";
    var date = new Date();
    drawHoursLine(date.getHours());
    drawMinutesLine(date.getMinutes());
    drawSecondsLine(date.getSeconds());
}

//画小时
function drawHoursLine(hour) {
    ctx.beginPath();
    ctx.lineWidth = hoursLineWidth;
    var theta = ((hour % 12) - 2) * (Math.PI * 2) / 12;
    var x = clockRadius * Math.cos(theta);
    var y = clockRadius * Math.sin(theta);
    ctx.moveTo(-0.10 * x, -0.10 * y);
    ctx.lineTo(0.35 * x, 0.35 * y);
    ctx.stroke();
}

//画分针
function drawMinutesLine(minutes) {
    ctx.beginPath();
    ctx.lineWidth = minutesLineWidth;
    var theta = (minutes - 15) * (Math.PI * 2) / 60;
    var x = clockRadius * Math.cos(theta);
    var y = clockRadius * Math.sin(theta);
    ctx.moveTo(-0.15 * x, -0.15 * y);
    ctx.lineTo(0.50 * x, 0.50 * y);
    ctx.stroke();
}

//画秒针
function drawSecondsLine(seconds) {
    ctx.beginPath();
    ctx.lineWidth = secondsLineWidth;
    var theta = (seconds - 15) * (Math.PI * 2) / 60;
    var x = clockRadius * Math.cos(theta);
    var y = clockRadius * Math.sin(theta);
    ctx.moveTo(-0.20 * x, -0.20 * y);
    ctx.lineTo(0.65 * x, 0.65 * y);
    ctx.stroke();
}

//画时间
function drawHourText() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 1; i <= 12; i++) {
        var theta = (i - 3) * (Math.PI * 2) / 12;
        var x = clockRadius * 0.75 * Math.cos(theta);
        var y = clockRadius * 0.75 * Math.sin(theta);
        ctx.fillText(i, x, y);
    }
}

//画刻度线
function drawCalibration() {
    ctx.strokeStyle = "black";
    for (var i = 0; i < 60; i++) {
        ctx.beginPath();
        var theta = i * (Math.PI * 2) / 60;
        var x = clockRadius * Math.cos(theta);
        var y = clockRadius * Math.sin(theta);
        ctx.moveTo(x, y);
        if (i % 5 == 0) {
            ctx.lineWidth = hoursCalibrationWidth;
            ctx.lineTo(0.85 * x, 0.85 * y);
        } else {
            ctx.lineWidth = minutesCalibrationWidth;
            ctx.lineTo(0.95 * x, 0.95 * y);
        }
        ctx.stroke();
    }
}
