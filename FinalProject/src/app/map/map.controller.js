
angular.module('MyApp.Map')

.controller('MapController', function(Utilities, SetGlobals, MapUtilities) {

	var self = this;
	//trying to get the filteredData from the Utilities service but its not ready
	//self.filteredData = Utilities.getFilteredData();

	//console.log(self.filteredData);

}).directive('myMap', function () {
 		
 		var map = d3.geomap.choropleth()
            .geofile('assets/countries.json')//the topojson file loaded to draw the map countires
            .colors(colorbrewer.YlGnBu[9]) //d3.geomap comes with support for color schemes from the ColorBrewer project.
            .column('figure') //data used to color the map and legend 
            .legend(true) //if you don't want to display a legend or make your own set it to false
            .unitId('ccode')//which in the data contains the ID values of the geographic units displayed on the map (in this case iso3)
            .zoomFactor(5); //zoom factor to use when a map unit is clicked

	    return {
	        restrict: 'E',
	        template:"<div id='map'></div>",
	        scope: { // attributes bound to the scope of the directive
		      val: '=',
		      unit: '=',
		      domain: "="
		    },
		    link: function (scope, element, attrs) {
		    	scope.$watch('domain', function (newVal, oldVal) {
		    		map.domain(newVal);
		    	});
		    	scope.$watch('unit', function (newVal, oldVal) {// whenever the bound 'unit' expression changes, execute this 
		    		map.format(function(d) {return (Math.round(d * 10) / 10).toFixed(2)+newVal;});//add the format for the map legend that includes the unit 
		    	});
		    	scope.$watch('val', function (newVal, oldVal) {// whenever the bound 'val' expression changes, execute this 			        
			        // clear the elements inside of the directive
			        if(oldVal != newVal){
			        	d3.select('#map svg').remove();
			        }
        			//draw the map
        			d3.select('#map')
                		.datum(newVal)
                		.call(map.draw, map);
			    });
		    }
	    };

 	});

