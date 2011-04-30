/*

2-4 videos

possible shader: opaque, chromakey, distortchromakey, distortopaque

shader needs: aspect, mouseXY, map

the effect gets a config object like this:

{
	path: "video"
	shader: 0|1|2|3
	z: -900
}

the first element in the array is on the bottom, the next ones come on top
 
*/

var VIDEO_OPAQUE = 1;
var VIDEO_OPAQUE_DISTORT = 2;
var VIDEO_KEYED = 3;
var VIDEO_KEYED_DISTORT = 4;

var VideoPlayer = function(shared, layers, conf){
	var that = this;
	//SequencerItem.call( this );

	var config = {};
	var planes = [];
	var gridLoaded = false;
	
	var renderer = shared.renderer, renderTarget = shared.renderTarget;
  var glContext = renderer.getGLContext();

  var renderTargetDepth = new THREE.WebGLRenderTarget( viewWidth, viewHeight, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter } );
  //var postCamera = new THREE.Camera();
  //postCamera.projectionMatrix = THREE.Matrix4.makeOrtho( viewWidth / - 2, viewWidth / 2, viewHeight / 2, viewHeight / - 2, -10000, 10000 );
  //var postScene = new THREE.Scene();
  //postScene.addObject( new THREE.Mesh( new THREE.Plane( viewWidth, viewHeight ), postMaterial ) );
  var mouseRay = new THREE.Vector3();
  var readBuffer = new Uint8Array(4);

  var mouseX = 0, mouseY = 0;
  var mouseU = 0, mouseV = 0;
	var targetPos;
	
	this.init = function(){
		
		config.prx = conf.paralaxHorizontal || 0;
		config.pry = conf.paralaxVertical || 0;
		config.tgd = conf.targetDistance || 1500;

		onGrid = function(geometry){
			config.grid = geometry;
			that.onLoad();
		};
		
		gridLoader = new THREE.JSONLoader();
		gridLoader.load( { model: "models/grid.cells.1.js", callback: onGrid } );
	};
	
	this.onLoad = function() {	
		gridLoaded = true;
	
		/*
	 	shared.signals.mousemoved.add(function(){
	 	mouseX = (shared.mouse.x / shared.screenWidth) * 2 - 1;
	 	mouseY = (shared.mouse.y / shared.screenHeight) * 2 - 1;
	 	});
		*/
		
		document.addEventListener('mousemove', this.mouseMove, false);
		targetPos = new THREE.Vector2(0,0);
		
		config.fov = 54;
		config.aspect = 2.35;
		config.adj = Math.tan( config.fov * Math.PI / 360 ) * 2;
    config.near = 1;
    config.far = 2000;
		
		camera = new THREE.Camera( config.fov, config.aspect, config.near, config.far );
		camera.target.position = new THREE.Vector3(0, 0, config.tgd * -1);
		camera.updateMatrix();
		
		scene = new THREE.Scene();
		scene.addLight( new THREE.AmbientLight( 0x000000 ) );

		for(var i = 0; i < layers.length; i++) {
			var p = new VideoPlane(layers[i], config);
			planes.push(p);
			scene.addObject(p.mesh);
			//if(p.wireMesh) scene.addObject(p.wireMesh);
		}
	};
	
	this.show = function(progress) {
		for (var i = 0; i < planes.length; i++) {
			planes[i].start(progress);
		}
	};
	
	this.hide = function(){
		for (var i = 0; i < planes.length; i++) {
			planes[i].stop();
		}
	};
	
	this.update = function(progress, delta, time) {
		if(!gridLoaded) return;
		
		targetPos.x = mouseX * config.prx;
		targetPos.y = mouseY * config.pry;

		camera.position.x += (targetPos.x - camera.position.x) / 2;
		camera.position.y += (targetPos.y - camera.position.y) / 2;	
		for (var i = 0; i < planes.length; i++) {
			planes[i].updateUniform(mouseX, mouseY, mouseRay.z);
		}
		//renderer.render( scene, camera, renderTarget );

    for (var i = 0; i < planes.length; i++) planes[i].updatePass(1);
		renderer.render( scene, camera, renderTargetDepth, true );
    glContext = renderer.getGLContext();
    glContext.readPixels(Math.floor(mouseU*viewWidth), viewHeight-Math.floor(mouseV*viewHeight * aspect), 1, 1, glContext.RGBA, glContext.UNSIGNED_BYTE, readBuffer);
    mouseRay = new THREE.Vector3(readBuffer[0],readBuffer[1],readBuffer[2]);

		for (var i = 0; i < planes.length; i++) planes[i].updatePass(0);
    renderer.render( scene, camera );

	};
	
	// #####
	var windowHalfX = window.innerWidth >> 1;
	var windowHalfY = window.innerHeight >> 1;
	this.mouseMove = function(e){
		mouseX = (event.clientX - windowHalfX) / -windowHalfX;
		mouseY = (event.clientY - windowHalfY) / windowHalfY;
    mouseU = (event.clientX) / viewWidth;
    mouseV = (event.clientY) / viewHeight / aspect;
  }
};

/*
VideoPlayer.prototype = new SequencerItem();
VideoPlayer.prototype.constructor = VideoPlayer;
*/