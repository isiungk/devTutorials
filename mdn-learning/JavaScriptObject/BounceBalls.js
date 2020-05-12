// 获取画布
const canvas = document.querySelector('canvas');

// 获取画布实例
const ctx = canvas.getContext('2d');

// 定义一个数组来保存所有的心球
const balls = [];

// 设定画布大小
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机颜色的函数
function random(min, max) {
    return Math.floor(Math.random()*(max-min)) + min;
}
function randomColor() {
    return `rgb( ${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}


// ------------------------
// 类：小球
// ------------------------
// 类：属性
function Ball (x, y, velX, velY, color, size) 
{
    // x坐标，y坐标
    this.x = x;
    this.y = y;

    // x轴水平向速度，y轴垂直向速度
    this.velX = velX;
    this.velY = velY;

    // 颜色
    this.color = color;

    // 大小（半径）
    this.size = size;
}

// 类：方法：绘制小球
Ball.prototype.draw = function () 
{
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(
        this.x, // 小球中心x坐标
        this.y, // 小球中心y坐标
        this.size, // 小球半径
        0, // 起始点
        2 * Math.PI // 结束点
    );
    ctx.fill();
}

// 类：方法：更新小球
Ball.prototype.update = function () {
    if ((this.x - this.size) <= 0 || (this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.y - this.size) <= 0 || (this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

// 类：方法：碰撞检测
Ball.prototype.collisionDetect = function ()
{
    for (let i = 0; i< balls.length; i++) {
       if (! (this === balls[i])) {
           let dx = this.x - balls[i].x;
           let dy = this.y - balls[i].y;
           
           let distance = Math.sqrt(dx * dx + dy * dy);
           if (distance < this.size + balls[i].size) {
               balls[i].color = randomColor();
               this.color = randomColor();
           }
       }
    }
}

// ------------------------
// 动画
// ------------------------
function loop () {
    // 填充画布
    ctx.fillStyle = 'rgb(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    // 生成小球
    while (balls.length < 25) {
        let ball = new Ball(
            random(0, width),  // 小球中心x坐标
            random(0, height), // 小球中心y坐标
            random(-10, 10),     // x轴水平向速度
            random(-10, 10),     // y轴垂直向速度
            randomColor(),     // 小球颜色
            random(10, 50)     // 小球半径
        );
        balls.push(ball);
    }

    // 一帧动画
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    // 递归调用，循环播放动画
    requestAnimationFrame(loop);
}

// 开始！
loop();