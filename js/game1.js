/*
    封装入口函数
*/
(function(fb) {

    function Game(option) {
        this.ctx = option.ctx;
        this.currentTime = 0;
        this.lastTime = new Date();
        this.deltaTime = 0;
        this.roles = [];
        this.hero = null;
        this.isRunnig = true;
        this.srcList = ['birds', 'sky', 'land', 'pipe1', 'pipe2'];
        this.objList = FB.loadImages(this.srcList, this.init, this);
    }

    Game.prototype.initEvent = function() {
        var that = this;
        this.ctx.canvas.onclick = function() {
            that.hero.speed = -0.3;
        }
    }

    Game.prototype.initEnv = function() {
        var imgs = this.objList;
        // 初始化蓝天
        for (var i = 0; i < 2; i++) {
            var sky = new FB.Sky({
                ctx: this.ctx,
                img: imgs['sky'],
                x: imgs['sky'].width * i,
                y: 0,
                speed: 3
            });
            this.roles.push(sky);
        }
        // 初始化管道
        for (var i = 0; i < 6; i++) {
            var pipe = new FB.Pipe({
                ctx: this.ctx,
                topImg: imgs['pipe2'],
                bottomImg: imgs['pipe1'],
                x: imgs['pipe2'].width * 3 * i + 300,
                speed: 3,
                spaceHeight: 200
            });
            this.roles.push(pipe);
        }
        // 初始化陆地
        for (var i = 0; i < 4; i++) {
            var land = new FB.Land({
                ctx: this.ctx,
                img: imgs['land'],
                x: imgs['land'].width * i,
                y: cas.height - imgs['land'].height,
                speed: 3
            });
            this.roles.push(land);
        }
        // 初始化小鸟
        var bird = new FB.Bird({
            ctx: this.ctx,
            img: imgs['birds'],
            x: 100,
            y: 100,
            speed: 0
        });
        this.roles.push(bird);
        this.hero = bird;
    }

    Game.prototype.render = function() {
        var that = this;
        var imgs = this.objList;
        (function render() {
            // 清空画布
            that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
            // 计算相关时间
            that.currentTime = new Date();
            that.deltaTime = that.currentTime - that.lastTime;
            that.lastTime = that.currentTime;

            that.ctx.beginPath();
            that.roles.forEach(function(v) {
                v.draw(that.deltaTime);
            });
            // ctx.fill();
            // 控制上下边界
            if (that.hero.y < 0 || that.hero.y + that.hero.perHeight > that.ctx.canvas.height - imgs['land'].height) {
                that.isRunnig = false;
            }
            // 控制小鸟和管子的碰撞
            if (that.ctx.isPointInPath(that.hero.x + that.hero.perWidth, that.hero.y + that.hero.perHeight)) {
                that.isRunnig = false;
            }
            if (that.isRunnig) {
                requestAnimationFrame(render);
            }
        })();
    }

    Game.prototype.init = function() {
        this.initEnv();
        this.initEvent();
        this.render();
    }

    fb.Game = Game;
})(FB);
