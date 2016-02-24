(function(window, document, undefined) {
  var width = window.innerWidth,
      height = window.innerHeight,
      svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

      d3.json('/assets/json/north_america.json', function(error, na) {
        if (error) {
          throw error;
        }

        svg.append('path').datum(topojson.feature(na, na.objects.north_america)).attr('d', d3.geo.path().projection(d3.geo.mercator()));
        svg.append('path').datum(topojson.feature(na, na.objects.usa)).attr('d', d3.geo.path().projection(d3.geo.mercator()));
        svg.append('path').datum(topojson.feature(na, na.objects.waypoints)).attr('d', d3.geo.path().projection(d3.geo.mercator())).attr('fill', 'red');
        svg.append('path').datum(topojson.mesh(na, na.objects.routes)).attr('d', d3.geo.path().projection(d3.geo.mercator())).attr('fill', 'none').attr('stroke', 'white');
      });
})(window, document);
