var UgcObjectCreator = function ( shared ) {

	var domElement = document.createElement( 'div' );

	var DEG2RAD = Math.PI / 180,
	camera, light1, light2, scene, loader, renderer,
	intersects, intersectedFace, intersectedObject,
	isDeleteMode = false, isRotateMode = false,
	isMouseDown = false, radius = 1500, theta = 45, phi = 15;

	camera = new THREE.Camera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.target.position.y = 200;

	// Background

	scene = new THREE.Scene();

	scene.fog = new THREE.Fog( 0xffffff, 1000, 10000 );
	scene.fog.color.setHSV( 0.6, 0.1235, 1 );

	light1 = new THREE.DirectionalLight( 0xffeedd, 1.5 );
	light1.position.set( 0.5, 0.75, 1 );
	light1.color.setHSV( 0, 0, 1 );
	scene.addLight( light1 );

	light2 = new THREE.DirectionalLight( 0xffeedd, 1.5 );
	light2.position.set( - 0.5, - 0.75, - 1 );
	light2.color.setHSV( 0, 0, 0.306 );
	scene.addLight( light2 );

	loader = new THREE.JSONLoader();
	loader.load( { model: "files/models/ugc/D_tile_1.D_tile_1.js", callback: function ( geometry ) {

		mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		mesh.position.x = 1500;
		mesh.position.y = - 50;
		mesh.rotation.x = - 90 * Math.PI / 180;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.5;
		scene.addChild( mesh );

	} } );

	// Renderer

	renderer = new THREE.WebGLRenderer();
	renderer.domElement.style.position = 'absolute';
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( scene.fog.color );
	renderer.sortObjects = false;
	renderer.autoClear = false;
	domElement.appendChild( renderer.domElement );

	// Painter

	var painter = new VoxelPainter( camera );


	function onMouseDown( event ) {

		painter.setMode( !isDeleteMode ? VoxelPainter.MODE_DRAW : VoxelPainter.MODE_ERASE );

	}

	function onMouseUp( event ) {

		painter.setMode( VoxelPainter.MODE_IDLE );

	}

	function onMouseMove( event ) {

		painter.moveMouse( shared.mouse.x / shared.screenWidth, shared.mouse.y / shared.screenHeight );

	}

	function onMouseWheel( event ) {

		radius -= event.wheelDeltaY;

	}

	function onKeyDown( event ) {

		switch ( event.keyCode ) {

			case 16: isRotateMode = true; break;
			case 17: isDeleteMode = true; break;
			// case 18: isDeleteMode = true; break;

		}

	}

	function onKeyUp( event ) {

		switch ( event.keyCode ) {

			case 16: isRotateMode = false; break;
			case 17: isDeleteMode = false; break;
			// case 18: isDeleteMode = false; break;

		}
	}

	//

	this.getDomElement = function () {

		return domElement;

	};

	this.show = function () {

		shared.signals.mousedown.add( onMouseDown );
		shared.signals.mouseup.add( onMouseUp );
		shared.signals.mousemoved.add( onMouseMove );
		shared.signals.mousewheel.add( onMouseWheel );

		shared.signals.keydown.add( onKeyDown );
		shared.signals.keyup.add( onKeyUp );

	};

	this.hide = function () {

		shared.signals.mousedown.remove( onMouseDown );
		shared.signals.mouseup.remove( onMouseUp );
		shared.signals.mousemoved.remove( onMouseMove );
		shared.signals.mousewheel.remove( onMouseWheel );

		shared.signals.keydown.remove( onKeyDown );
		shared.signals.keyup.remove( onKeyUp );

	};

	this.resize = function ( width, height ) {

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize( width, height );

	};

	this.update = function () {

		if ( isRotateMode ) {

			theta += ( shared.mouse.x / shared.screenWidth ) * 2 - 1;

			phi -= ( shared.mouse.y / shared.screenHeight ) * 2 - 1;
			phi = phi > 90 ? 90 :
			      phi < - 90 ? - 90 :
			      phi;

		}

		camera.position.x = radius * Math.sin( theta * DEG2RAD ) * Math.cos( phi * DEG2RAD );
		camera.position.y = radius * Math.sin( phi * DEG2RAD );
		camera.position.z = radius * Math.cos( theta * DEG2RAD ) * Math.cos( phi * DEG2RAD );

		painter.update();

		renderer.clear();
		renderer.render( scene, camera );
		renderer.render( painter.getScene(), camera );

	};

};
