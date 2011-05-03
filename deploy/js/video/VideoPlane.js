var VideoPlane = function( shared, layer, conf ) {
	
	var video, texture, interval, shader, material, wireMaterial;
	var config = conf;
	var hasDistortion = false;
	var hasKey = false;
    
	VideoLoadRegister[ layer.path ] = 1;
	
    video = document.createElement( 'video' );
    video.src = layer.path;
	video.preload = true;
	video.load();
    
	shared.signals.loadItemAdded.dispatch();
	
	// emit loaded signal either at canplaythrough event
	// or after 5 seconds
	// (this is to get around occasional not firing of 
	//  canplaythrough event :/)

	video.addEventListener( "canplaythrough", function() { 	

		if ( VideoLoadRegister[ layer.path ] == 1 ) {
		
			shared.signals.loadItemCompleted.dispatch();
			VideoLoadRegister[ layer.path ] = 2;

		}

	}, false );
	
	setTimeout( function() { 
		
		if( VideoLoadRegister[ layer.path ] == 1 ) {

			shared.signals.loadItemCompleted.dispatch();
			VideoLoadRegister[ layer.path ] = 2;

		}

	}, 5000 );
	
    texture = new THREE.Texture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    switch ( layer.shaderId ) {

        case VIDEO_OPAQUE:
            shader = VideoShaderSource.opaque;
            break;

		case VIDEO_OPAQUE_DISTORT:
            shader = VideoShaderSource.distortOpaque;
			hasDistortion = true;
            break;

		case VIDEO_KEYED_DISTORT:
            shader = VideoShaderSource.distortKeyed;
			hasDistortion = true;
			hasKey = true;
            break;

		case VIDEO_HALFALPHA:
            shader = VideoShaderSource.halfAlpha;
            break;

        case VIDEO_KEYED:
        default:
            shader = VideoShaderSource.keyed;
			hasKey = true;
            break;

    }
	
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms ); // ? ######
    uniforms['map'].texture = texture;
	
	if ( hasDistortion ) {

		uniforms['mouseXY'].value = new THREE.Vector2( 0, 0 );
		uniforms['aspect'].value = config.aspect;

	}
	
	if ( hasKey ) {

		uniforms['colorScale'].value = layer.colorScale;
		uniforms['threshold'].value = layer.threshold;
		uniforms['alphaFadeout'].value = layer.alphaFadeout;

	}
	
	material = new THREE.MeshShaderMaterial({

        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
		depthTest: false

    });
	
	//
	if( !layer.width ) layer.width = ( hasDistortion ) ? 1.104 : 1;
	if( !layer.height ) layer.height = ( hasDistortion ) ? 1.24 : 1;
    
    if( hasDistortion ) 
		this.mesh = new THREE.Mesh( config.grid, material );
	else 
		this.mesh = new THREE.Mesh( new THREE.Plane( 1,1,1,1 ), material );
		
	
	this.mesh.scale.x = layer.width;
	this.mesh.scale.y = layer.height;
    this.mesh.position.z = layer.z;
    this.mesh.scale.x *= Math.abs(layer.z) * config.adj * config.aspect;
    this.mesh.scale.y *= Math.abs(layer.z) * config.adj;
	
	
	if ( false ) { //hasDistortion) {

		wireMaterial = new THREE.MeshShaderMaterial( {
			uniforms: uniforms,
			vertexShader: VideoShaderSource.distortWire.vertexShader,
			fragmentShader: VideoShaderSource.distortWire.fragmentShader,
			blending: THREE.BillboardBlending,
			wireframe: true
		});
		
		this.wireMesh = new THREE.Mesh( config.grid, wireMaterial );
		this.wireMesh.scale.x = layer.width;
		this.wireMesh.scale.y = layer.height;
	    this.wireMesh.position.z = layer.z + 0.1;
	    this.wireMesh.scale.x *= Math.abs(layer.z) * config.adj * config.aspect;
	    this.wireMesh.scale.y *= Math.abs(layer.z) * config.adj;

	}
	
	this.start = function( t ) {
		
		video.currentTime = video.duration * t;
		video.play();
		
		interval = setInterval( function() {

	        if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

	            texture.needsUpdate = true;

	        }

	    }, 1000 / 24);

	}
	
	this.stop = function() {
		
		video.pause();
		clearInterval( interval );

	}
	
	this.updateUniform = function(mouseX, mouseY) {

		if( !hasDistortion ) return;

		material.uniforms['mouseXY'].value.x = -mouseX * config.aspect;
		material.uniforms['mouseXY'].value.y = -mouseY;

	}

};

var VideoLoadRegister = {
};


