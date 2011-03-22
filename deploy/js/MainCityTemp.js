var Signal = signals.Signal;

var audio, sequencer,
camera, camera2, scene, renderer,
container, events;

var screenWidth, screenHeight,
screenWidthHalf, screenHeightHalf;

var tune, time, stats, gui;

init();

function init() {

	audio = document.getElementById( 'audio' );

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer.autoClear = false;

	window.addEventListener( 'resize', onWindowResize, false );
	onWindowResize();

	events = {

		mousemove : new Signal(),
		loadItemAdd : new Signal(),
		loadItemComplete : new Signal()

	};

	tune = new Tune( audio );
	tune.setBPM( 85 );
	tune.setRows( 4 );

	loadProgress = new LoadProgress( document.getElementById( 'loadProgress' ) );
	events.loadItemAdd.add( loadProgress.addItem );
	events.loadItemComplete.add( loadProgress.completeItem );

	sequencer = new Sequencer();

	// Parts

	sequencer.add( new ClearEffect( renderer ), tune.getPatternMS( 0 ), tune.getPatternMS( 75 ), 0 );
	sequencer.add( new Part1( renderer, events ), tune.getPatternMS( 16 ), tune.getPatternMS( 75 ), 1 );

}

function start( pattern ) {

	document.body.removeChild( document.getElementById( 'launcher' ) );

	container = document.createElement( 'div' );
	container.appendChild( renderer.domElement );
	document.body.appendChild( container );

	stats = new Stats();
	stats.domElement.style.position = 'fixed';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );

	//document.body.appendChild( gui.domElement );

	//gui.add(GUI, "showSaveString");
	//gui.add( audio, 'currentTime', 0, 210, 10 ).name( 'Time' ).listen();

	//gui.add( this, 'jumpToPart1').name( 'Part 1: City' );
	//gui.add( this, 'jumpToPart2').name( 'Part 2: Prairie' );
	//gui.add( this, 'jumpToPart3').name( 'Part 3: Dunes' );

	audio.play();
	audio.currentTime = tune.getPatternMS( pattern ) / 1000;
	audio.volume = 0.2;	

	//gui.add( audio, 'volume', 0, 1).name( 'Volume' );

	document.addEventListener( 'keydown', onDocumentKeyDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	animate();

}

// Hack for gui-dat :/

this.jumpToPart1 = function () {

	audio.currentTime = tune.getPatternMS( 16 ) / 1000;

}

this.jumpToPart2 = function () {

	audio.currentTime = tune.getPatternMS( 32 ) / 1000;

}

this.jumpToPart3 = function () {

	audio.currentTime = tune.getPatternMS( 48 ) / 1000;

}

function onDocumentKeyDown( event ) {

	switch( event.keyCode ) {

		case 32:

			audio.paused ? audio.play() : audio.pause();
			break;

		case 37:

			audio.currentTime -= 1;
			break;

		case 39:

			audio.currentTime += 1;
			break;

	}

}

function onDocumentMouseMove( event ) {

	events.mousemove.dispatch( event.clientX - screenWidthHalf, event.clientY - screenHeightHalf );

}

function onWindowResize( event ) {

	var width = 1280, height = 720,
	scale = window.innerWidth / width;

	screenWidth = width * scale;
	screenHeight = height * scale;

	renderer.setSize( screenWidth, screenHeight );

	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = ( ( window.innerHeight - screenHeight  ) / 2 ) + 'px';

}

function animate() {

	requestAnimationFrame( animate );
	render();
	stats.update();

}

function render() {

	sequencer.update( audio.currentTime * 1000 );

}
