/**
 * @author / http://jonobr1.com/
 * Dependent on js/lib/Gee.js
 *					 Heart.js
 *					 Swell.js
 *					 WonderWall.js
 *					 Clouds.js
 *					 Three.js
 *					 files/eminating-heart.svg
 */

var RelauncherSection = function( shared ) {

	Section.call( this );

	var domElement = document.createElement( "div" );
			domElement.setAttribute( "id", "relauncher-section" );
			domElement.style.position = "relative";
			domElement.style.display = 'none';

	var navigation = {};
	var footer, footNav;

	// add css styling
	var rule = document.createTextNode( "#relauncher-section div.after-experience { position: absolute; height: 57px; overflow: hidden; cursor: pointer; } #relauncher-section div.after-experience img { display: block; } #relauncher-section div.after-experience:hover img { margin-top: -57px; }" );
	var head = document.getElementsByTagName( 'head' )[ 0 ];
	var style = document.createElement( "style" );
	style.type = "text/css";

	if( style.styleSheet ) {

		style.styleSheet.cssText = rule.nodeValue;

	} else {

		style.appendChild( rule );

	}

	head.appendChild( style );

	var clouds = new Clouds( shared, true );
	var d = clouds.getDomElement();
	d.style.background = "#fff";
	d.style.zIndex = -2;
	domElement.appendChild( d );

	var container = document.createElement("div");
	container.setAttribute("id", "container");
	container.setAttribute("style", "position: absolute; z-index: -1;");
	domElement.appendChild(container);

	var gee = new GEE({
		fullscreen: true,
		container: container,
		loop: false
	});
	var g = gee.ctx;

	// Implemented Footer.js
	footer = document.createElement( 'div' );
	footer.style.position = 'absolute';
	footer.style.width = "100%";
	footer.style.top = (window.innerHeight - 78) + "px";
	footer.style.left = "0";
	footNav = new Footer( footer );
	domElement.appendChild( footer );

	var core = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 80 );
	var inner = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 95 );
	var outer = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 130, .25 );

	outer.showFill = false;
	outer.insides = true;
	inner.showFill = false;
	outer.setRadius(.19);
	core.setRadius(.12);

	var heart = {

		svg: new Heart (gee, "files/eminating-heart.svg", 0, 0 ),
		point: new WonderWall.Point( gee, gee.width * .5, gee.height * .5 + 6 )

	};
	heart.point.r = .0625;

	// Rome Colors
	var rome = rome || {};
	rome.color = {

		red: "#f15d22",
		black: "#30302e",
		white: "#f4f4ea"

	};

	// Handle dom elements
	navigation = initDomElements( domElement );
	for ( var i = 0; i < navigation.list.length; i++ ) {

		var dom = navigation.list[i];
		dom.addEventListener("mouseover", function(e) {

			var iterator = navigation.list.indexOf(this);
			core.setUpdatePoint(true, iterator);
			inner.setUpdatePoint(true, iterator);
			outer.setUpdatePoint(true, iterator);
			heart.point.updating = true;

		}, false);

		dom.addEventListener("mouseout", function(e) {

			var iterator = navigation.list.indexOf(this);
			core.setUpdatePoint(false, iterator);
			inner.setUpdatePoint(false, iterator);
			outer.setUpdatePoint(false, iterator);
			heart.point.updating = false;

		}, false);

	}

	updateDomElementsPosition();

	gee.draw = function() {

		inner.update();
		var points = inner.getPoints();

		g.clearRect(0, 0, gee.width, gee.height);

		g.globalCompositeOperation = "source-over";

		g.strokeStyle = rome.color.black;
		g.lineWidth = 0.5;
		outer.update().render();

		g.globalCompositeOperation = "destination-out";
		core.update().render();

		g.globalCompositeOperation = "xor";
		g.lineWidth = 24;
		inner.showStroke = true;
		inner.showFill = false;
		inner.render();
		g.globalCompositeOperation = "source-over";

		g.save();
		g.translate(gee.width / 2.0, gee.height / 2.0);
		heart.svg.render();
		g.restore();

	};

	function updateDomElementsPosition() {

		var points = inner.getPoints();
		for (var i = 0; i < points.length; i++) {

			var point = points[i].getOriginPosition();
			// these are the center points of the objects
			var navItem = navigation.list[i];
			var xpos = point.x;
			var ypos = point.y;

			if (i == 0) {
				xpos -= 113;
				ypos -= 162;
			} else if (i == 1) {
				xpos += 137;
				ypos -= 46;
			} else if (i == 2) {
				xpos += 106;
				ypos += 78;
			} else if (i == 3) {
				xpos -= 312;
				ypos += 75;
			} else {
				xpos -= 344;
				ypos -= 46;
			}
			navItem.style.left = xpos + "px";
			navItem.style.top = ypos + "px";

		}

	};

	function createDomElement( parent, element, id, zclass, contents ) {

		var dom = document.createElement( element );
		dom.setAttribute( "id", id );
		dom.setAttribute( "class", zclass );
		dom.innerHTML = contents;
		parent.appendChild( dom );
		return dom;

	};

	function initDomElements(container) {

		var navigation = {};

		var start = createDomElement(container, "div", "start-over", "after-experience", "<img src = 'files/relaunch_section/start_over.png' alt = 'Start Over' />");
		var technology = createDomElement(container, "div", "technology", "after-experience", "<img src = 'files/relaunch_section/technology.png' alt = 'Technology' />");
		var add = createDomElement(container, "div", "add-to-the-dream", "after-experience", "<img src = 'files/relaunch_section/add_dreams.png' alt = 'Add to the Dream' />");
		var otherDreams = createDomElement(container, "div", "explore-other-dreams", "after-experience", "<img src = 'files/relaunch_section/explore_dreams.png' alt = 'Explore Other Dreams' />");
		var explore = createDomElement(container, "div", "continue-to-explore", "after-experience", "<img src = 'files/relaunch_section/continue.png' alt = 'Continue To Explore' />");

		start.addEventListener("click", function(e) {

			e.preventDefault();
			shared.signals.showfilm.dispatch();
			shared.signals.startfilm.dispatch( 0, 1 );

		}, false);

		technology.addEventListener("click", function(e) {

			e.preventDefault();
			window.location = "/tech";

		}, false);

		add.addEventListener("click", function(e) {

			e.preventDefault();
			shared.signals.showugc.dispatch();

		}, false);

		otherDreams.addEventListener("click", function(e) {

			e.preventDefault();
			window.location = "/gallery";

		}, false);

		explore.addEventListener("click", function(e) {

			e.preventDefault();
			shared.signals.showexploration.dispatch();
			shared.signals.startexploration.dispatch( 'dunes' );

		}, false);

		navigation.start = start;
		navigation.technology = technology;
		navigation.add = add;
		navigation.otherDreams = otherDreams;
		navigation.explore = explore;

		navigation.list = [ explore, start, otherDreams, add, technology ];
		init = true;

		return navigation;

	};

	this.show = function() {

		clouds.show();
		updateDomElementsPosition();
		if(footNav.isSetup()) footNav.setupEmiBuyButton();
		domElement.style.display = 'block';

	};

	this.resize = function( width, height ) {

		clouds.resize( width, height );
		footer.style.top = (window.innerHeight - 78) + "px";
		updateDomElementsPosition();

	};

	this.hide = function() {

		clouds.hide();
		domElement.style.display = "none";

	};

	this.getDomElement = function() {

		return domElement;

	};

	this.update = function() {

		clouds.update();
		gee.draw();

	};

};

RelauncherSection.prototype = new Section();
RelauncherSection.prototype.constructor = RelauncherSection;
