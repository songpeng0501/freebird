/*
    绘制陆地背景
*/
(function(fb){
    function Land(option){
        this.ctx = option.ctx;
        this.img = option.img;
        this.x = option.x;
        this.y = option.y;
        this.speed = option.speed;
    }

    Land.prototype.draw = function(){
        this.x -= this.speed;
        if(this.x <= -this.img.width){
            this.x += 4 * this.img.width;
        }
        this.ctx.drawImage(this.img,this.x,this.y);
    }

    fb.Land = Land;
})(FB);