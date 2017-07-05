/*
    绘制蓝天背景
*/
(function(fb){
    function Sky(option){
        this.ctx = option.ctx;
        this.img = option.img;
        this.x = option.x;
        this.y = option.y;
        this.speed = option.speed;
    }

    Sky.prototype.draw = function(){
        // 控制背景向左移动
        this.x -= this.speed;
        if(this.x <= -this.img.width){
            this.x += 2 * this.img.width;
        }
        this.ctx.drawImage(this.img,this.x,this.y);
    }

    fb.Sky = Sky;
})(FB);