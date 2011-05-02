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


// TODO:
// + Add Footer

var RelauncherSection = function( shared ) {

	Section.call( this );

	var domElement = document.createElement( "div" );
			domElement.setAttribute( "id", "relauncher-section" );
			domElement.style.position = "relative";
			domElement.style.display = 'none';

	var navigation = {};

	// add css styling

	var rule = document.createTextNode( "#relauncher-section div.after-experience { position: absolute; padding: 25px 50px; border: 1px solid #c9c8c1; text-transform: uppercase; font: 500 12px / 17px 'Futura', Arial, sans-serif; letter-spacing: 1px; color: #434343; cursor: pointer; } #relauncher-section div.after-experience:hover { color: #f15d22; background: #30302e; }" );
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
	domElement.appendChild( d );

	var container = document.createElement("div");
	container.setAttribute("id", "container");
	container.setAttribute("style", "position: absolute;");
	domElement.appendChild(container);

	var gee = new GEE({
		fullscreen: true,
		container: container
	});
	var g = gee.ctx;

	var core = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 75 );
	var inner = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 95 );
	var outer = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 130, .25 );

	outer.showFill = false;
	outer.insides = true;
	inner.showFill = false;
	outer.setRadius(.19);
	core.setRadius(.12);

	var heart = {

		svg: new Heart (gee, "files/eminating-heart.svg", 0, 0 ),
		point: new WonderWall.Point( gee, gee.width * .5, gee.height * .5 )

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

		g.strokeStyle = rome.color.black;
		g.lineWidth = 0.5;
		outer.update().render();

		g.globalCompositeOperation = "destination-out";
		core.update().render();

		g.globalCompositeOperation = "source-out";
		g.lineWidth = 32;
		inner.showStroke = true;
		inner.showFill = false;
		inner.render();
		g.globalCompositeOperation = "source-over";

		//heart.point.setPosition(gee.width / 2.0, gee.height / 2.0);
		//heart.point.update();
		g.save();
		g.translate(heart.point.x, heart.point.y);
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
				xpos -= 82;
				ypos -= 159;
			} else if (i == 1) {
				xpos += 133;
				ypos -= 45;
			} else if (i == 2) {
				xpos += 104;
				ypos += 76;
			} else if (i == 3) {
				xpos -= 311;
				ypos += 74;
			} else {
				xpos -= 333;
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

		var start = createDomElement(container, "div", "start-over", "after-experience", "start over");
		var technology = createDomElement(container, "div", "technology", "after-experience", "technology");
		var add = createDomElement(container, "div", "add-to-the-dream", "after-experience", "add to the dream");
		var otherDreams = createDomElement(container, "div", "explore-other-dreams", "after-experience", "explore other dreams");
		var explore = createDomElement(container, "div", "continue-to-explore", "after-experience", "continue to explore");

		start.addEventListener("click", function(e) {

			e.preventDefault();
			// window.location = "/tech";
			alert("start over");

		}, false);

		technology.addEventListener("click", function(e) {

			e.preventDefault();
			// window.location = "/tech";
			alert("technology");

		}, false);

		add.addEventListener("click", function(e) {

			e.preventDefault();
			// window.location = "/tool";
			alert("Add to the Dream");

		}, false);

		otherDreams.addEventListener("click", function(e) {

			e.preventDefault();
			// window.location = "/tech";
			alert("Explore Other Dreams");

		}, false);

		explore.addEventListener("click", function(e) {

			e.preventDefault();
			// window.location = "/tech";
			alert("Continue to Explore");

		}, false);

		navigation.start = start;
		navigation.technology = technology;
		navigation.add = add;
		navigation.otherDreams = otherDreams;
		navigation.explore = explore;

		navigation.list = [ start, otherDreams, explore, add, technology ];
		init = true;

		return navigation;

	};

	this.show = function() {

		clouds.show();
		updateDomElementsPosition();
		domElement.style.display = 'block';

	};

	this.resize = function( width, height ) {

		clouds.resize( width, height );
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

	};

};

RelauncherSection.prototype = new Section();
RelauncherSection.prototype.constructor = RelauncherSection;
