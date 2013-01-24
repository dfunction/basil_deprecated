var geometry;
var $el;
    
function init() {
    $el = initAnimation(1800, 330);
    if (!$el)
        console.log("Error");
    else
        document.getElementById("vectorField").appendChild($el);
};
        
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