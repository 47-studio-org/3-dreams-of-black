var FadeOutEffect = function ( hex, shared ) {

	SequencerItem.call( this );

	var camera, scene, material, object,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function( callback ) {

		camera = new THREE.Camera( 60, 1, 1, 10000 );
		camera.position.z = 2;

		scene = new THREE.Scene();

		material = new THREE.MeshBasicMaterial( { color: hex, opacity: 1, depthTest: false } );

		object = new THREE.Mesh( new Plane( 3, 3 ), material );
		scene.addObject( object );
		
		renderer.initMaterial( material, scene.lights, scene.fog, object );

	};

	this.update = function ( f ) {

		material.opacity = 1 - f;
		renderer.render( scene, camera, renderTarget );

	};

};

FadeOutEffect.prototype = new SequencerItem();
FadeOutEffect.prototype.constructor = FadeOutEffect;
