var UgcSection = function ( shared ) {

	var that = this;

	var intro, objectCreator/*, soupCreator*/, ui;

	var domElement = document.createElement( 'div' );
	domElement.style.display = 'none';

	var DEG2RAD = Math.PI / 180,
	light1, light2, loader,
	intersects, intersectedFace, intersectedObject,
	isRotateMode = false, isMouseDown = false, radius = 300, oldRadius = 300, newRadius = 300, theta = 45, phi = 15;

	var camera = new THREE.Camera( 50, window.innerWidth / window.innerHeight, 1, 20000 );
	camera.target.position.y = 20;

	// Background

	that.scene = new THREE.Scene();
	that.scene.fog = new THREE.FogExp2( 0xffffff, 0.00075 );
	that.scene.fog.color.setHSV( 0.576, 0.382, 0.9 );

	// Lights

	var ambient = new THREE.AmbientLight( 0x221100 );
	var directionalLight1 = new THREE.DirectionalLight( 0xffeedd );
	var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );

	ambient.color.setHSV( 0, 0, 0.1 );

	directionalLight1.color.setHSV( 0.088, 0, 1 );
	directionalLight1.position.set( 0.8, 0.3, - 0.5 );
	directionalLight1.position.normalize();

	directionalLight2.color.setHSV( 0, 0, 0.564 );
	directionalLight2.position.set( 0.1, 0.5, 0.2 );
	directionalLight2.position.normalize();

	that.scene.addLight( ambient );
	that.scene.addLight( directionalLight1 );
	that.scene.addLight( directionalLight2 );

	initLensFlares( that, new THREE.Vector3( 0, 0, - 750 ), 60, 292 );

	var loader = new THREE.SceneLoader();
	loader.load( "/files/models/dunes/D_tile_1.js", function ( result ) {

		for ( var i = 0, l = result.scene.objects.length; i < l; i ++ ) {

			var object = result.scene.objects[ i ];

			if ( object.visible ) {

				object.rotation.x = - 90 * Math.PI / 180;
				object.position.y = - 20;
				object.position.x = 500;
				object.scale.x = object.scale.y = object.scale.z = 0.1;
				that.scene.addObject( object );

			}

		}

	} );

	// Renderer

	var renderer;

	if ( !shared.renderer ) {

		renderer = new THREE.WebGLRenderer();
		renderer.domElement.style.position = 'absolute';
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( that.scene.fog.color );
		renderer.sortObjects = false;
		renderer.autoClear = false;

		shared.renderer = renderer;

	}

	domElement.appendChild( shared.renderer.domElement );

	function onKeyDown( event ) {

		switch ( event.keyCode ) {

			case 16: isRotateMode = true; break;
			// case 17: isEraseMode = true; break;
			// case 18: isEraseMode = true; break;

		}

	}

	function onKeyUp( event ) {

		switch ( event.keyCode ) {

			case 16: isRotateMode = false; break;
			// case 17: isEraseMode = false; break;
			// case 18: isEraseMode = false; break;

		}

	}

	function onMouseWheel( event ) {

		newRadius = radius + ( event.wheelDeltaY / 2 );

	}

	this.getDomElement = function () {

		return domElement;

	};

	this.load = function () {

		var Signal = signals.Signal;

		shared.ugc = {};
		shared.ugcSignals = {};
		shared.ugcSignals.showintro = new Signal();
		shared.ugcSignals.showobjectcreator = new Signal();
		shared.ugcSignals.showsoupcreator = new Signal();

		shared.ugcSignals.object_mode = new Signal();
		shared.ugcSignals.soup_mode = new Signal();

		shared.ugcSignals.object_createmode = new Signal();
		shared.ugcSignals.object_erasemode = new Signal();
		shared.ugcSignals.object_symmetrymode = new Signal();
		shared.ugcSignals.object_changecolor = new Signal();
		shared.ugcSignals.object_changesize = new Signal();

		shared.ugcSignals.submit_dialogue = new Signal();
		shared.ugcSignals.submit = new Signal();

		shared.ugcSignals.object_smoothup = new Signal();
		shared.ugcSignals.object_smoothdown = new Signal();
		shared.ugcSignals.object_undo = new Signal();

		shared.ugcSignals.object_requestsnapshot = new Signal();
		shared.ugcSignals.object_receivesnapshot = new Signal();

		intro = new UgcIntro( shared );
		domElement.appendChild( intro.getDomElement() );

		objectCreator = new UgcObjectCreator( shared, camera, that.scene );
		// soupCreator = new UgcSoupCreator( shared );

		ui = new UgcUI( shared );
		ui.getDomElement().style.position = 'absolute';
		ui.getDomElement().style.left = '20px';
		ui.getDomElement().style.top = '50%';
		ui.getDomElement().style.display = 'none';
		domElement.appendChild( ui.getDomElement() );

		ui.addListeners();

		// Signals listeners

		shared.ugcSignals.showintro.add( function () {

			intro.getDomElement().style.display = 'block';

			ui.getDomElement().style.display = 'none';

		} );

		shared.ugcSignals.showobjectcreator.add( function ( mode ) {

			intro.getDomElement().style.display = 'none';

			ui.getDomElement().style.display = 'block';

		} );

		/*
		shared.ugcSignals.showsoupcreator.add( function ( mode ) {


		} );
		*/

		var ugcHandler = new UgcHandler();

		shared.ugcSignals.submit.add( function () {

			var c = document.createElement('canvas');
			c.width = 300;
			c.height = 180;
			var ctx = c.getContext('2d');
			ctx.drawImage(renderer.domElement,0,0,c.width,c.height);
			var thumbnail = c.toDataURL();
			delete c;

			var submission = {
				title: 'Amorphous Building',
				email: 'dougfritz@gmail.com',
				category: 'ground',
				data: objectCreator.getPainter().getObject().getJSON()
			};

			ugcHandler.submitUGO( submission, thumbnail, function ( rsp ) {
				console.log(rsp);
			});

		} );

	};

	this.show = function () {

		domElement.style.display = 'block';
		objectCreator.show();

		shared.signals.keydown.add( onKeyDown );
		shared.signals.keyup.add( onKeyUp );

		shared.signals.mousewheel.add( onMouseWheel );

		// soupCreator.init();

	};

	this.hide = function () {

		domElement.style.display = 'none';
		objectCreator.hide();

		shared.signals.keydown.remove( onKeyDown );
		shared.signals.keyup.remove( onKeyUp );

		shared.signals.mousewheel.remove( onMouseWheel );

	};

	this.resize = function ( width, height ) {

		intro.resize( width, height );

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		shared.viewportWidth = width;
		shared.viewportHeight = height;

		shared.renderer.setSize( width, height );
		shared.renderer.domElement.style.left = '0px';
		shared.renderer.domElement.style.top = '0px';

		ui.resize(width, height);

	};

	this.update = function () {

		// objectCreator.update();
		// soupCreator.update();
		ui.update();

		// Background

		if ( isRotateMode ) {

			theta += ( shared.mouse.x / shared.screenWidth ) * 4 - 2;
			phi += - ( shared.mouse.y / shared.screenHeight ) * 4 + 2;
			phi = phi > 90 ? 90 : phi < 0 ? 0 : phi;

		}

		radius += (newRadius-radius)/20;

		camera.position.x = radius * Math.sin( theta * DEG2RAD ) * Math.cos( phi * DEG2RAD );
		camera.position.y = radius * Math.sin( phi * DEG2RAD );
		camera.position.z = radius * Math.cos( theta * DEG2RAD ) * Math.cos( phi * DEG2RAD );

		shared.renderer.clear();
		shared.renderer.render( that.scene, camera );

	};

}

UgcSection.prototype = new Section();
UgcSection.prototype.constructor = UgcSection;
