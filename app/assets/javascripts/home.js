var geometry;
var $el;

function Timer(name){
	this.name = name;
	this.startTime = 0;
	this.stopTime = 0;
	this.start = function() {
		this.startTime = Date.now();
		return this;
	};
	this.stop = function() {
		if (this.startTime != 0) {
			this.stopTime = Date.now();
			console.log(this.name + " runtime: " + (this.stopTime - this.startTime) + "ms");
			return true;
		} else {
			console.warn(this.name + " not stopped");
			return false;
		}
		
	};
}
    
function init() {
	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
	if (false) {
		$("#vectorField").css({
			"width":"100%"
		});
	    $el = initAnimation(1800, 330);
	    if (!$el)
	        console.log("Error");
	    else
	        document.getElementById("vectorField").appendChild($el);
	} else {
		$("#vectorField").css({
			"width":"960px",
			"height":"630px",
			"margin":"-300px auto 0 auto"
		});
		initGame();
	}
};

// Game of life
var initGame = function() {
    var $cradle = $("#vectorField");
    var matrixWidth = 30;
    var matrixHeight = 20;
    var wScale = $cradle.width() / matrixWidth;
    var hScale = $cradle.height() / matrixHeight;
    var matrix = new Array(matrixHeight);
    var $elMatrix = new Array(matrixWidth);
    
    
    // Generate matrix height
    for( var i = 0; i < matrixHeight; i++ ) {
        matrix[i] = new Array(matrixWidth);   
    }
    
    // Populate matrix
    popuplateMatrix(matrix, matrixWidth, matrixHeight);
    
    // Generate $elMatrix height
    for( var i = 0; i < matrixHeight; i++ ) {
        $elMatrix[i] = new Array(matrixWidth);   
    }
    
	var populate$elTimer = (new Timer("Populate $elMatrix")).start();
	
    // Populate $elMatrix
    for( var i = 0; i < matrixHeight; i++) {
        for( var j = 0; j < matrixWidth; j++) {
            $elMatrix[i][j] = $('<div class="cell"></div>').appendTo($cradle);
            //$elMatrix[i][j].css("opacity", 0); // > IE8
            $elMatrix[i][j].css("width", wScale);
            $elMatrix[i][j].css("height", hScale);
            $elMatrix[i][j].css("top", hScale * i);
            $elMatrix[i][j].css("left", wScale * j);
            
        }
    }
	populate$elTimer.stop();
	
	
    
    setInterval(function() {update(matrix, $elMatrix, matrixWidth, matrixHeight);}, 50);
    
}

var popuplateMatrix = function(matrix, matrixWidth, matrixHeight) {
	var populateMatrixTimer = (new Timer("Populate Matrix")).start();
    for( var i = 0; i < matrixHeight; i++) {
        for( var j = 0; j < matrixWidth; j++) {
            (Math.random() > .5) ? matrix[i][j] = 1 : matrix[i][j] = 0;
        }
    }
	populateMatrixTimer.stop();
}

var update = function(matrix, $elMatrix, matrixWidth, matrixHeight) {
    var liveCount = 0;
    
    // Cache current version
    var tmpMatrix = new Array(matrixHeight);
    for( var i = 0; i < matrixHeight; i++ ) {
        tmpMatrix[i] = new Array(matrixWidth);   
    }
    for( var i = 0; i < matrixHeight; i++) {
        for( var j = 0; j < matrixWidth; j++) {
            tmpMatrix[i][j] = matrix[i][j];
            liveCount += matrix[i][j];
        }
    }
    
    // Randomly update matrix
    for( var i = 0; i < matrixHeight; i++) {
        for( var j = 0; j < matrixWidth; j++) {
            var neighbors = countNeighbors(i, j, tmpMatrix, matrixWidth, matrixHeight);
            if (matrix[i][j] == 1) {
                // Alive cell
                if ((neighbors < 2) || (neighbors > 3)) {
                    // Cell dies
                    matrix[i][j] = 0;
                    liveCount--;
                }
            } else {
                // Dead cell
                if (neighbors == 3) {
                    // Cell revives
                    matrix[i][j] = 1;
                    liveCount++;
                }
            }
        }
    }
    
    if (liveCount > 0) render(matrix, $elMatrix, matrixWidth, matrixHeight);
    else {
        // Restart if barren
        popuplateMatrix(matrix, matrixWidth, matrixHeight); 
        render(matrix, $elMatrix, matrixWidth, matrixHeight);
    }
}

var countNeighbors = function(i, j, matrix, matrixWidth, matrixHeight) {
    var neighbors = 0;
    // Top left
    if ((i - 1 >= 0) && (j - 1 >= 0)) {
        neighbors += matrix[i - 1][j - 1];
    }
    // Top
    if ((i - 1 >= 0)) {
        neighbors += matrix[i - 1][j];
    }
    // Top right
    if ((i - 1 >= 0) && (j + 1 < matrixWidth)) {
        neighbors += matrix[i - 1][j + 1];
    }
    // Right
    if ((j + 1 < matrixWidth)) {
        neighbors += matrix[i][j + 1];
    }
    // Bottom right
    if ((i + 1 < matrixHeight) && (j + 1 < matrixWidth)) {
        neighbors += matrix[i + 1][j + 1];
    }
    // Bottom
    if ((i + 1 < matrixHeight)) {
        neighbors += matrix[i + 1][j];
    }
    // Bottom left
    if ((i + 1 < matrixHeight) && (j - 1 >= 0)) {
        neighbors += matrix[i + 1][j - 1];
    }
    // Left
    if ((j - 1 >= 0)) {
        neighbors += matrix[i][j - 1];
    }
    return neighbors;
}

var render = function(matrix, $elMatrix, matrixWidth, matrixHeight) {
	var renderTimer = (new Timer("Renderer")).start();
    for( var i = 0; i < matrixHeight; i++) {
        for( var j = 0; j < matrixWidth; j++) {
			/*
            (matrix[i][j] == 1) ?
                $($elMatrix[i][j]).css("background-color", "rgba(0," + Math.floor(255 * Math.random()) + ",130,.35)") :
                $($elMatrix[i][j]).css("background-color", "white");
			*/
			if (matrix[i][j] == 1) {
				//$($elMatrix[i][j]).stop();
				$($elMatrix[i][j]).css({"background-color":"rgba(0," + Math.floor(255 * Math.random()) + ",130,.35)",
										"opacity":"1"});
				//$($elMatrix[i][j]).stop().animate({"opacity":"1"}, 200);
			} else {
				$($elMatrix[i][j]).css("background-color", "white");
				//$($elMatrix[i][j]).stop();
				//$($elMatrix[i][j]).css("opacity", "0");
				//$($elMatrix[i][j]).stop().animate({"opacity":"0"}, 200);
			}
        }
    }
	renderTimer.stop();
}


// Mesh animation  
function initAnimation(width, height) {
    var halfWidth = 5;
    var depth = 5;
    var scale = 7;
            
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(width, height);
            
    geometry = new THREE.Geometry();
    for (var j = depth - 1; j >= 0; j--) {
        for (var i = halfWidth - 1; i >= - halfWidth; i--) {
            geometry.vertices.push( new THREE.Vector3(i * scale, j * scale, 0 ) );
            geometry.vertices.push( new THREE.Vector3((i + 1) * scale, j * scale, 0 ) );
            geometry.vertices.push( new THREE.Vector3((i + 1) * scale, (j+1) * scale, 0 ) );
            geometry.vertices.push( new THREE.Vector3(i * scale, (j+1) * scale, 0 ) );
        }
    }

    for (var k = 0; k < halfWidth * 2 * depth; k++) {
        geometry.faces.push( new THREE.Face4(0 + (k * 4), 1 + (4 * k), 2 + (4 * k), 3 + (4 * k)) );
    }
    geometry.mergeVertices();
    geometry.computeFaceNormals();
    geometry.computeCentroids();
    geometry.dynamic = true;
            
    geometry.faceVertexUvs[ 0 ].push( [
            new THREE.Vector2( 0, 0 ),
            new THREE.Vector2( 0, 1 ),
            new THREE.Vector2( 1, 1 ),
            new THREE.Vector2( 1, 0 )
        ] );

    var material = new THREE.MeshLambertMaterial({color: 0xffffff});
            
    var surface = new THREE.Mesh(geometry, material);

    surface.geometry.computeFaceNormals();
    scene.add(surface);

    // create a point light
    var pointLight = new THREE.PointLight(0xffffff, 1, 5000);

    // set its position
    pointLight.position.x = 0;
    pointLight.position.y = 50;
    pointLight.position.z = 100;

    // add to the scene
    scene.add(pointLight);

    camera.position.y = 0;
    camera.position.x = 0;
    camera.position.z = 12;
    camera.lookAt(new THREE.Vector3(0, 10, 0));
            
    // Rendering
    var ticks = 0;
    function render() {
        ticks++;
        geometry.computeFaceNormals();
        geometry.computeCentroids();
        geometry.verticesNeedUpdate = true;
        geometry.normalsNeedUpdate = true;
        updateVertices(ticks);
        requestAnimationFrame(render);
        renderer.render(scene, camera);

    }
    function updateVertices(ticks) {
        for(var j = 0; j < geometry.vertices.length; j++) {
            geometry.vertices[j].z = Math.pow(-1, j) * Math.sin(ticks/15 + j + Math.sin(j));
        }
    }
            
    render();
            
    return renderer.domElement;
};