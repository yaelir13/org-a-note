app.factory("canvasSrv", function ($q, $log) {

    /* load and add image to the drawing. It may take time to load. */
    function loadImage(url) {

        var async = $q.defer();

        const image = new Image();
        image.src = url;
        image.onload = function () {
            if (drawing && drawing.ctx) {
                drawing.width = image.width;
                drawing.height = image.height;
                drawing.ctx.drawImage(image, 0, 0);
            };
        }
        async.resolve(image);

        return async.promise;
    }
   
    return {
        loadImage: loadImage
    }

});