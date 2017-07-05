/*
    小鸟的绘制
*/
(function(fb) {
    function Bird(option) {
        this.ctx = option.ctx;
        this.img = option.img;
        this.x = option.x;
        this.y = option.y;
        this.perWidth = this.img.width / 3;
        this.perHeight = this.img.height;
        this.speed = option.speed;
        this.acc = 0.0005;
        this.maxSpeed = 1;
        this.maxAngle = Math.PI / 4;
        this.index = 0;
    }

    Bird.prototype.draw = function(deltaTime) {
        // 相邻两帧绘制时间间隔内，小鸟移动的距离
        var deltaY = this.speed * deltaTime + this.acc * deltaTime * deltaTime / 2;
        // 当前小鸟的速度
        this.speed += this.acc * deltaTime;

        // 保存之前的状态
        this.ctx.save();

        // 控制小鸟的旋转
        this.ctx.translate(this.x + this.perWidth / 2, this.y + this.perHeight / 2);

        // 旋转角度计算
        // 当前速度/最大速度 = 当前角度/最大角度
        // 当前角度 = 当前速度/最大速度*最大角度
        var currentAngle = this.speed / this.maxSpeed * this.maxAngle;
        if (currentAngle >= this.maxAngle) {
            currentAngle = this.maxAngle;
        }

        // 旋转小鸟
        this.ctx.rotate(currentAngle);

        // 当前小鸟的canvas坐标
        this.y += deltaY;
        // 绘制当前坐标下的单个小鸟
        this.ctx.drawImage(this.img, this.perWidth * this.index, 0, this.perWidth, this.perHeight, -this.perWidth / 2, -this.perHeight / 2, this.perWidth, this.perHeight);
        // 控制小鸟的索引变化
        this.index++
        this.index %= 3;

        // 恢复原来的状态
        this.ctx.restore();
    }

    fb.Bird = Bird;
})(FB);
