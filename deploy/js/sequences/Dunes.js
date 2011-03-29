var Dunes = function ( shared ) {

	SequencerItem.call( this );

	var camera, world, soup
	renderer = shared.renderer;

	this.init = function () {

		camera = new THREE.QuakeCamera( {

			fov: 60, aspect: WIDTH / HEIGHT, near: 1, far: 100000,
			movementSpeed: 10, lookSpeed: 0.0015, noFly: false, lookVertical: true, 
			autoForward: true /*, heightSpeed: true, heightMin: 250, heightMax: 1500, heightCoef: 0.025*/

		} );

		camera.lon = 90;

		world = new DunesWorld( shared );
		soup = new DunesSoup( camera, world.scene );

		shared.signals.cameraFov.add( function ( value ) {

			camera.fov = value;
			camera.updateProjectionMatrix();

		} );

	};

	this.show = function ( f ) {

		camera.position.x = 0;
		camera.position.y = 250;
		camera.position.z = 0;

		renderer.setClearColor( world.scene.fog.color );

	};

	this.hide = function () {

	};

	this.update = function ( f ) {

		world.update( camera );
		soup.update();

		renderer.render( world.scene, camera );

	};

};

Dunes.prototype = new SequencerItem();
Dunes.prototype.constructor = Dunes;
