var Part2 = function ( renderer, events ) {

	Effect.call( this );

	var camera, world;

	this.init = function ( callback ) {

		camera = new THREE.QuakeCamera( {
			fov: 60, aspect: window.innerWidth / window.innerHeight, near: 1, far: 100000,
			movementSpeed: 3, lookSpeed: 0.0035, noFly: false, lookVertical: true, 
			autoForward: true, heightSpeed: true, heightMin: -1500, heightMax: 1000, heightCoef: 0.0125
		} );

		world = new Part2World();

	};

	this.show = function () {

		camera.position.y = 0;
		camera.position.z = -1000;
		camera.position.x = 15000;
		camera.lon = 170;

		renderer.setClearColor( world.scene.fog.color );

	};

	this.hide = function () {

	};

	this.update = function ( i ) {

		renderer.render( world.scene, camera );

	};

};

Part2.prototype = new Effect();
Part2.prototype.constructor = Part2;
