var UgcSection = function ( shared ) {

	var intro, objectCreator, ui;

	var domElement = document.createElement( 'div' );
	domElement.style.display = 'none';

	this.getDomElement = function () {

		return domElement;

	};

	this.load = function () {

		var Signal = signals.Signal;

		shared.ugcSignals = {};
		shared.ugcSignals.showintro = new Signal();
		shared.ugcSignals.showobjectcreator = new Signal();

		shared.ugcSignals.object_createmode = new Signal();
		shared.ugcSignals.object_erasemode = new Signal();
		shared.ugcSignals.object_symmetrymode = new Signal();
		shared.ugcSignals.object_changecolor = new Signal();
		shared.ugcSignals.object_changesize = new Signal();

		shared.ugcSignals.submit = new Signal();

		intro = new UgcIntro( shared );
		domElement.appendChild( intro.getDomElement() );

		objectCreator = new UgcObjectCreator( shared );
		objectCreator.getDomElement().style.display = 'none';
		domElement.appendChild( objectCreator.getDomElement() );

		ui = new UgcUI( shared );
		ui.getDomElement().style.position = 'absolute';
		ui.getDomElement().style.left = '20px';
		ui.getDomElement().style.top = '50%';
		ui.getDomElement().style.display = 'none';
		domElement.appendChild( ui.getDomElement() );

		ui.addListeners();
		ui.HANDLERS.updateCapacity(0);

		// Signals listeners

		shared.ugcSignals.showintro.add( function ( mode ) {

			intro.getDomElement().style.display = 'block';

			objectCreator.getDomElement().style.display = 'none';
			ui.getDomElement().style.display = 'none';

		} );

		shared.ugcSignals.showobjectcreator.add( function ( mode ) {

			intro.getDomElement().style.display = 'none';

			objectCreator.getDomElement().style.display = 'block';
			ui.getDomElement().style.display = 'block';

		} );

	};

	this.show = function () {

		domElement.style.display = 'block';
		objectCreator.show();

	};

	this.hide = function () {

		domElement.style.display = 'none';
		objectCreator.hide();

	};

	this.resize = function ( width, height ) {

		var nativeWidth = 1342;

		ui.scale( width / nativeWidth );
		ui.getDomElement().style.marginTop = - 255 * width / nativeWidth + 'px';

		objectCreator.resize( width, height );

	};

	this.update = function () {

		objectCreator.update();

	};

}

UgcSection.prototype = new Section();
UgcSection.prototype.constructor = UgcSection;
