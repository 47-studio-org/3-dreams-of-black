var Part2 = function ( camera, scene, renderer ) {

	Effect.call( this );

	var buildings = [];

	this.init = function ( callback ) {

		var geometry = new Cube( 100, 100, 100 );
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );

		for ( var i = 0; i < 100; i ++ ) {

			var mesh = buildings[ i ] = new THREE.Mesh( geometry, material );
			mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 100;
			mesh.position.y = - 100;
			mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 100;

		}

	};

	this.show = function () {

		for ( var i = 0; i < buildings.length; i ++ ) {

			scene.addObject( buildings[ i ] );

		}

	};

	this.hide = function () {

		for ( var i = 0; i < buildings.length; i ++ ) {

			scene.removeObject( buildings[ i ] );

		}

	};

	this.update = function ( i ) {

		camera.position.z = - i * 1000 + 1000;
		camera.target.position.z = camera.position.z - 100;

		renderer.render( scene, camera );

	};

};

Part2.prototype = new Effect();
Part2.prototype.constructor = Part2;
