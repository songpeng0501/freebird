/*
    对外入口
*/
(function(window){
    var FB = {};
    // FB.loadImages = function(srcList,callback){
    //     var count = 0;
    //     var objList = {};
    //     srcList.forEach(function(v){
    //         var img = new Image();
    //         img.src = 'imgs/' + v + '.png';
    //         objList[v] = img;
    //         img.onload = function(){
    //             count++;
    //             if(count === srcList.length){
    //                 // 所有图片加载完成之后处理后续操作
    //                 callback(objList);
    //             }
    //         }
    //     });
    //     return objList;
    // }

    FB.loadImages = function(srcList,callback,obj){
        var count = 0;
        var objList = {};
        srcList.forEach(function(v){
            var img = new Image();
            img.src = 'imgs/' + v + '.png';
            objList[v] = img;
            img.onload = function(){
                count++;
                if(count === srcList.length){
                    // 所有图片加载完成之后处理后续操作
                    // callback(objList);
                    callback.call(obj);
                }
            }
        });
        return objList;
    }
    window.FB = FB;
})(window);