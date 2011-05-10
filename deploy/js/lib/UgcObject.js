var UgcObject = function ( data ) {

	var VERSION = 4, UNIT_SIZE = 50,
	_type = UgcObject.TYPE_GROUND, _grid = {}, _count = 0;

	this.addVoxel = function ( x, y, z, color, object ) {

		_grid[ x + "." + y + "." + z ] = { x: x, y: y, z: z, color: color, object: object };
		_count ++;

	};

  this.getType = function() {
    return _type;
  };

	this.getVoxel = function ( x, y, z ) {

		return _grid[ x + "." + y + "." + z ];

	};

	this.deleteVoxel = function ( x, y, z ) {

		delete _grid[ x + "." + y + "." + z ];
		_count --;

	};

	this.isEmpty = function () {

		return _count == 0;

	};

	this.getJSON = function () {

		var i, item, array = [ VERSION ],
		currentColor = null, items = [], itemsCount = 0;

		function pushItems() {

			if ( items.length ) {

				array.push( currentColor );
				array.push( itemsCount );
				array = array.concat( items );

			}

		}

		for ( i in _grid ) {

			item = _grid[ i ];

			if ( item.color != currentColor ) {

				pushItems();

				currentColor = item.color;
				itemsCount = 0;
				items = [];

			}

			items.push( item.x + 20, item.y, item.z + 20 );
			itemsCount ++;

		}

		pushItems();

		return JSON.stringify( array );
	};

	this.getMesh = function () {

		var i, item, voxel,
		geometry = new THREE.Cube( UNIT_SIZE, UNIT_SIZE, UNIT_SIZE ),
		group = new THREE.Object3D();

		for ( i in _grid ) {

			item = _grid[ i ];

			voxel = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: item.color } ) );
			voxel.position.x = item.x * UNIT_SIZE;
			voxel.position.y = item.y * UNIT_SIZE;
			voxel.position.z = item.z * UNIT_SIZE;
			voxel.matrixAutoUpdate = false;
			voxel.updateMatrix();
			voxel.update();

			group.addChild( voxel );

		}

		return group;

	};

	// Parse data

	if ( data && data[ 0 ] == VERSION ) {

		var i = 1, l = data.length, currentColor = 0, itemsCount = 0;

		while ( i < l ) {

			currentColor = data[ i ++ ];
			itemsCount = data[ i ++ ];

			for ( j = 0; j < itemsCount; j ++ ) {

				this.addVoxel(
					Math.min( 40, Math.max( 0, data[ i ++ ] ) ) - 20,
					Math.min( 40, Math.max( 0, data[ i ++ ] ) ),
					Math.min( 40, Math.max( 0, data[ i ++ ] ) ) - 20,
					currentColor
				);

			}

		}

	}

};

UgcObject.TYPE_GROUND = 'ground';
UgcObject.TYPE_SKY = 'sky';
