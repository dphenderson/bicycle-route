(function(window, document, undefined) {

	/* Polyfill
	 *
	 * Noticed that map was not drawing correctly in my older iPhone browser.
	 * Investigation revealed that the includes method was undefined.  
	 *
	 */ 

	if (!Array.prototype.includes) { Array.prototype.includes =
		function(searchElement /*, fromIndex*/ ) { 'use strict'; var O =
			Object(this); var len = parseInt(O.length) || 0;
			if (len === 0) {
				return false;
			}
			var n = parseInt(arguments[1]) || 0;
			var k;
			if (n >= 0) {
				k = n;
			} else {
				k = len + n;
				if (k < 0) {k = 0;}
			}
			var currentElement;
			while (k < len) {
				currentElement = O[k];
				if (searchElement === currentElement ||
					(searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
					return true;
				}
				k++;
			}
			return false;
		};
	}

  var width = window.innerWidth,
      height = window.innerHeight,
	  proj = d3.geo.conicConformal().parallels([24.5, 49.5]).rotate([96,0]).center([-98.583333, 39.833333]).translate([0,0]).scale(2000),
	  path = d3.geo.path().projection(proj),
      svg = d3.select('body').append('svg').attr('width', width).attr('height', height),
	  g = svg.append('g').attr('id', 'map');

	  proj.translate([(width / 2) - proj(proj.center())[0],(height / 2) - proj(proj.center())[1]]);

      d3.json('/assets/json/north_america.json', function(error, na) {
        if (error) {
          throw error;
        }
		var states_passed = ['VA', 'KY', 'IN', 'IL', 'IA', 'NE', 'WY', 'ID', 'OR', 'CA'];

		g.selectAll('.state').data(topojson.feature(na, na.objects.usa).features.filter(function(d) { return states_passed.includes(d.id); })).enter().append('path').attr('id', function(d) { return d.id; }).attr('class', function(d) { return 'state ' + d.id; }).attr('d', path);
        g.append('path').datum(topojson.mesh(na, na.objects.north_america)).attr('d', path).attr('class', 'intl-boundaries');
        g.append('path').datum(topojson.mesh(na, na.objects.usa)).attr('d', path).attr('class', 'state-boundaries');
        g.append('path').datum(topojson.feature(na, na.objects.waypoints)).attr('d', path.pointRadius(2)).attr('class', 'waypoint');
        g.append('path').datum(topojson.mesh(na, na.objects.routes)).attr('d', path).attr('class', 'route');
      });
})(window, document);
