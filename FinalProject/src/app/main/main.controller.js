(function() {
  'use strict';

  angular
    .module('MyApp.Main')
    .controller('MainController', function(UI_STATES, MainControllerDataService, Utilities) {

	    var self = this;

	    //FOR THE GRID
		self.gridOptions = {
			//rowData and columnDefs are set once update button is clicked
          	enableSorting: true,
          	enableFilter: true,
          	sizeColumnsToFit: true,
          	onGridReady: function(params){
/*          		if(self.endYear - self.startYear < 13 ){
          			  
          		}*/    
          		params.api.sizeColumnsToFit(); 
          	}
        };

        //FOR THE GRID
        self.onFilterChanged = function (value) {
		    self.gridOptions.api.setQuickFilter(value);
		};

		var columnDefsToStartWith = [
	            {field: 'cname', headerName: 'Country'},
	            {field: 'ccode', headerName: 'ISO3'}
	            //other years are set once update button is clicked
        ];


	    self.dataSets =[
	    	{"dataLabelShort": "GDP Growth", "dataLabelLong": "Gross domestic product, change from a year ago", "dataID": "NY.GDP.MKTP.KD.ZG", "dataLabelUnit":"%"},
			/*{"dataLabelShort": "GDP", "dataLabelLong": "Gross domestic product, current $", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "GDP per capita", "dataLabelLong": "Gross domestic product per capita, current $", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "GNI per capita, Atlas method (current US$)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Exports per of GDP", "dataLabelLong": "Exports of goods and services as a percent of GDP", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Foreign direct investment, net inflows (BoP, current US$)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "GNI per capita, PPP (current international $)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "GINI index", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Inflation, consumer prices (annual %)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	{"dataLabelShort": "Population", "dataLabelLong": "Population, total", "dataID": "SP.POP.TOTL", "dataLabelUnit": " people"},
	    	{"dataLabelShort": "Life Expectancy", "dataLabelLong": "Life expectancy at birth, total years", "dataID": "SP.DYN.LE00.IN", "dataLabelUnit":" years"},
	    	{"dataLabelShort": "Internet Users", "dataLabelLong": "Internet users per 100 people", "dataID": "IT.NET.USER.P2", "dataLabelUnit": " people"},
	    	/*{"dataLabelShort": "Imports of goods and services (% of GDP)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	{"dataLabelShort": "Unemployment Rate", "dataLabelLong": "Unemployment rate of the total labor force (modeled ILO estimate)", "dataID": "SL.UEM.TOTL.ZS", "dataLabelUnit": "%"}
	    	/*{"dataLabelShort": "Agriculture, value added (% of GDP)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "CO2 emissions (metric tons per capita)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Literacy rate, adult total (% of people ages 15 and above)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Central government debt, total (% of GDP)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Inflation, GDP deflator (annual %)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Poverty headcount ratio at national poverty line (% of population)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    ];

	    //called when click on a data set button
	    self.updateData = function(indexSelected){
			self.currentDataIndex = indexSelected;
			self.dataSelected = self.dataSets[indexSelected];
			self.dataLabelLong = self.dataSelected.dataLabelLong;
			self.unit = self.dataSelected.dataLabelUnit;
			self.dataSet = false;//turns off disabled class on update button
			console.log(self.unit);
		};

	    //called when the year input is changed
	    self.updateYearRange = function(startYear, endYear) {
	    	self.startYear = startYear;
	    	self.endYear = endYear;
	    	self.yearRange = startYear+":"+endYear;
	    	self.dataSet = false;//turns off disabled class on update button
	    	console.log(self.yearRange);
		};

		//FOR THE MAP
	    //called when a year button is clicked
	    self.updateYear = function(indexSelected) {
	    	self.currentYearIndex = indexSelected;
	    	self.currentYear = self.years[self.currentYearIndex].year;
			self.dataToShowOnMap = self.years[self.currentYearIndex].data;
			console.log("data to show on map:");
			console.log(self.dataToShowOnMap);
		};


		//called when update button is clicked
		self.updateGridMap = function(theYearRange, startYear, endYear) {

			if(parseInt(startYear)>parseInt(endYear)){
				alert("Start year "+startYear+" is larger than end year "+endYear);
				return;
			}

		    MainControllerDataService.getHttpData(self.dataSelected.dataID, theYearRange).then(function (response) {//Pass in the dataID which will be used in the api query string
		     	self.dataSet = true;//enable the disabled class on the update button
		     	var promiseData = response[1];
		     	//filteredData IS USED FOR MAP AND GRID
		     	var filteredData = Utilities.getCountriesData(promiseData);
		     	//FOR THE GRID
		     	//add the country and year collumn defs
		     	self.gridOptions.columnDefs = columnDefsToStartWith;
		     	//add all of the years to the grid's collumDefs in the grid option
	        	for (var i = parseInt(startYear); i < parseInt(endYear); i++) {
	        		var theYear = i.toString();
		        	self.gridOptions.columnDefs.push({field: theYear, headerName: theYear});
		        }
		        //add the grid data to the grid options
		     	self.gridOptions.rowData = Utilities.getDataForGrid(filteredData, self.unit);
		        //if the grid is already drawn from before then refresh it with the new data
		        if(self.gridOptions.api){
					self.gridOptions.api.setRowData(self.gridOptions.rowData)
					self.gridOptions.api.refreshView();	
				}
				//FOR THE MAP
		        //self.years is for the map, array of objs each obj has key as "year" and key as "data"
		        self.years = Utilities.getEachYearsData(startYear, endYear, filteredData);
		        self.updateYear(0);//always select the first yea when the update button is clicked	    		
		    }, function (error) {//error callback
		     	console.log("error in api request");
		    });
		};

		//trigger the app on load 
		self.updateData(0);
		self.updateYearRange("2005","2015");
		self.updateGridMap(self.yearRange, self.startYear, self.endYear);

	    
	}).directive('myGrid', function () {
	    return {
	        restrict: 'E',
	        templateUrl: 'app/main/gridtemp.html', //path from index.html
	        scope: {// attributes bound to the scope of the directive
	          gridOptions : '='
	        },
	        link: function (scope, element, attrs) {	
	        	console.log(scope.gridOptions);
	        }
	    };
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
		      unit: '='
		    },
		    link: function (scope, element, attrs) {	
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

  /** @ngInject */

})();
