app.controller("canvasCtrl", function ($scope, $log, $routeParams, $location, userLibrary) {

    // size of drawing and its starting background colour
    const drawingInfo = {
        width: 344,
        height: 640,
        bgColor: "white",
    }
    const brushSizes = [1, 2, 3, 4, 5, 6, 7, 8];
    const colors = "red,orange,yellow,green,cyan,blue,purple,white,gray,black".split(",");
    var currentColor = "blue";
    var currentWidth = 2;
    var currentSelectBrush;
    var currentSelectColor;
    const colorSel = document.getElementById("colorSel");
    colors.forEach((color, i) => {
        var swatch = document.createElement("span");
        swatch.className = "swatch";
        swatch.style.backgroundColor = color;
        if (currentColor === color) {
            swatch.className = "swatch highlight";
            currentSelectColor = swatch;
        } else {
            swatch.className = "swatch";
        }
        swatch.addEventListener("click", (e) => {
            currentSelectColor.className = "swatch";
            currentColor = e.target.style.backgroundColor;
            currentSelectColor = e.target;
            currentSelectColor.className = "swatch highlight";
        });
        colorSel.appendChild(swatch);
    })
    brushSizes.forEach((brushSize, i) => {
        var brush = document.createElement("canvas");
        brush.width = 16;
        brush.height = 16;
        brush.ctx = brush.getContext("2d");
        brush.ctx.beginPath();
        brush.ctx.arc(8, 8, brushSize / 2, 0, Math.PI * 2);
        brush.ctx.fill();
        brush.brushSize = brushSize;
        if (currentWidth === brushSize) {
            brush.className = "swatch highlight";
            currentSelectBrush = brush;
        } else {
            brush.className = "swatch";
        }

        brush.addEventListener("click", (e) => {
            currentSelectBrush.className = "swatch";
            currentSelectBrush = e.target;
            currentSelectBrush.className = "swatch highlight";
            currentWidth = e.target.brushSize;

        });
        colorSel.appendChild(brush);
    })

    const canvas = document.getElementById("can");
    const mouse = createMouse().start(canvas, true);
    const ctx = canvas.getContext("2d");

    var updateDisplay = true; // when true the display needs updating
    var ch, cw, w, h; // global canvas size vars


    var currentLine;

    var displayOffset = {
        x: 0,
        y: 0
    };

    // a point object creates point from x,y coords or object that has x,y
    const point = (x, y = x.y + ((x = x.x) * 0)) => ({
        x,
        y
    });
    // function to add a point to the line
    function addPoint(x, y) {
        this.points.push(point(x, y));
    }

    function drawLine(ctx, offset) { // draws a line
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        var i = 0;
        while (i < this.points.length) {
            const p = this.points[i++];
            ctx.lineTo(p.x + offset.x, p.y + offset.y);
        }
        ctx.stroke();
    }

    function createLine(color, width) {
        return {
            points: [],
            color,
            width,
            add: addPoint,
            draw: drawLine,
        };
    }


    // creates a canvas
    function createCanvas(width, height) {
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        c.ctx = c.getContext("2d");
        return c;
    }
    // resize main display canvas and set global size vars
    function resizeCanvas() {
        ch = ((h = canvas.height = innerHeight - 32) / 2) | 0;
        cw = ((w = canvas.width = innerWidth) / 2) | 0;
        updateDisplay = true;
    }

    function createMouse() {
        function preventDefault(e) { e.preventDefault() }
        const mouse = {
            x: 0,
            y: 0,
            buttonRaw: 0,
            prevButton: 0
        };
        const bm = [1, 2, 4, 6, 5, 3]; // bit masks for mouse buttons
        const mouseEvents = "mousemove,mousedown,mouseup".split(",");
        const m = mouse;
        // one mouse handler
        function mouseMove(e) {
            m.bounds = m.element.getBoundingClientRect();
            m.x = e.pageX - m.bounds.left - scrollX;
            m.y = e.pageY - m.bounds.top - scrollY;

            if (e.type === "mousedown") {
                m.buttonRaw |= bm[e.which - 1];
            } else if (e.type === "mouseup") {
                m.buttonRaw &= bm[e.which + 2];
            }
            // check if there should be a display update
            if (m.buttonRaw || m.buttonRaw !== m.prevButton) {
                updateDisplay = true;
            }
            // if the mouse is down and the prev mouse is up then start a new line
            if (m.buttonRaw !== 0 && m.prevButton === 0) { // starting new line
                currentLine = createLine(currentColor, currentWidth);
                currentLine.add(m); // add current mouse position
            } else if (m.buttonRaw !== 0 && m.prevButton !== 0) { // while mouse is down
                currentLine.add(m); // add current mouse position      
            }
            m.prevButton = m.buttonRaw; // remember the previous mouse state
            e.preventDefault();
        }
        // starts the mouse 
        m.start = function (element, blockContextMenu) {
            m.element = element;

            mouseEvents.forEach(n => document.addEventListener(n, mouseMove));
            if (blockContextMenu === true) {
                document.addEventListener("contextmenu", preventDefault)
            }
            return m
        }
        return m;
    }
    var cursor = "crosshair";
    function update(timer) { // Main update loop
        cursor = "crosshair";
        globalTime = timer;
        // if the window size has changed resize the canvas
        if (w !== innerWidth || h !== innerHeight) {
            resizeCanvas()
        }
        if (updateDisplay) {
            updateDisplay = false;
            display(); // call demo code
        }

        ctx.canvas.style.cursor = cursor;
        requestAnimationFrame(update);
    }
    // create a drawing canvas.
    const drawing = createCanvas(drawingInfo.width, drawingInfo.height);
    // fill with white
    drawing.ctx.fillStyle = drawingInfo.bgColor;
    drawing.ctx.fillRect(0, 0, drawing.width, drawing.height);

    // function to display drawing 
    function display() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        const imgX = cw - (drawing.width / 2) | 0;
        const imgY = ch - (drawing.height / 2) | 0;
        // add a shadow to make it look nice
        ctx.fillRect(imgX + 5, imgY + 5, drawing.width, drawing.height);

        // add outline
        ctx.strokeStyle = "black";
        ctx.lineWidth = "2";
        ctx.strokeRect(imgX, imgY, drawing.width, drawing.height);
        // draw the image
        ctx.drawImage(drawing, imgX, imgY);
        if (mouse.buttonRaw !== 0) {
            if (currentLine !== undefined) {
                currentLine.draw(ctx, displayOffset); // draw line on display canvas
                cursor = "none";
                updateDisplay = true; // keep updating 
            }
        } else if (mouse.buttonRaw === 0) {
            if (currentLine !== undefined) {
                currentLine.draw(drawing.ctx, { x: -imgX, y: -imgY }); // draw line on drawing
                currentLine = undefined;
                updateDisplay = true;
                // next line is a quick fix to stop a slight flicker due to the current frame not showing the line
                ctx.drawImage(drawing, imgX, imgY);

            }
        }
    }

    requestAnimationFrame(update);
    debugger;

    $scope.imgID = $routeParams.id;

    userLibrary.getActiveUserLibrary().then(function (scoresLibrary) {
        $scope.scoresLibrary = scoresLibrary;
        var notFound = true;
        var i = 0;
        while (notFound) {
            if ($scope.scoresLibrary[i].id == $scope.imgID) {
                $scope.score = $scope.scoresLibrary[i];
                $scope.preview = $scope.score.preview;
                notFound = false;
            }
            else i += 1;
        }
        //score preview should be 370x480 for optimal viewing

        // resizeScoreImage($scope.preview) 
        loadImage($scope.preview);
    })

    // function resizeScoreImage(url) {

    // }

    function loadImage(url) {
        const image = new Image();
        image.src = url;
        image.onload = function () {
            if (drawing && drawing.ctx) {
                drawing.width = image.width;
                drawing.height = image.height;
                drawing.ctx.drawImage(image, 0, 40);
            }
        }

    }

    function updatePreviewInLibrary(userId, image) {
        userLibrary.getActiveUserLibrary().then(function (scoresLibrary) {
            $scope.scoresLibrary = scoresLibrary;
            var notFound = true;
            var i = 0;
            while (notFound) {
                if ($scope.scoresLibrary[i].id == userId) {
                    
                    // base64Img=image.replace("data:image/octet-stream;base64,","");
                    // $log.log(base64Img)
                    // var decodedImage = atob(base64Img);
                    // $log.log(decodedImage);
                    // $scope.scoresLibrary[i].preview = decodedImage;
                    $scope.scoresLibrary[i].preview=image;
                    notFound = false;
                }
                else i += 1;
            }
        })
        $location.path("/scores");
    }

    $scope.to_image = function () {
        var can = document.getElementById("can");
        var image = can.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        window.location.href = image;
        updatePreviewInLibrary($scope.imgID, image);
    }
})