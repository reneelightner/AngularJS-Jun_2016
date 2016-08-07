(function() {
  'use strict';

  angular
    .module('MyApp.Main')
    .controller('MainController', function(UI_STATES, MainControllerDataService, Utilities) {

	    var self = this;

        //GRID's filter
        self.onFilterChanged = function (value) {
		    self.gridOptions.api.setQuickFilter(value);
		};

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
	    	{"dataLabelShort": "Life Expectancy", "dataLabelLong": "Life expectancy at birth, total years", "dataID": "SP.DYN.LE00.IN", "dataLabelUnit":" yrs"},
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
		};

	    //called when the year input is changed
	    self.updateYearRange = function(startYear, endYear) {
	    	self.startYear = startYear;
	    	self.endYear = endYear;
	    	self.yearRange = startYear+":"+endYear;
	    	self.dataSet = false;//turns off disabled class on update button
		};

		//FOR THE MAP
	    //called when a year button is clicked
	    self.updateYear = function(indexSelected) {
	    	self.currentYearIndex = indexSelected;
	    	self.currentYear = self.years[indexSelected].year;
			self.dataToShowOnMap = self.years[indexSelected].data;
		};

		self.gridOptions = {
		    enableSorting: true,
		    enableFilter: true,
		    sizeColumnsToFit: true,
		    onGridReady: function(params){
		        if(self.endYear - self.startYear < 13){
		          	params.api.sizeColumnsToFit(); 
		        }
		    }
		 };

		//called when update button is clicked
		self.updateGridMap = function(theYearRange, startYear, endYear) {

			if(parseInt(startYear)>parseInt(endYear)){
				alert("Start year "+startYear+" is larger than end year "+endYear);
				return;
			}
			if(parseInt(startYear)>2015){
				alert("You must choose a time frame ending in 2015 at the latest.");
				return;
			}
			if(parseInt(endYear)<1962){
				alert("You must choose a time frame beginning in 1962 at the earliest.");
				return;
			}

		    MainControllerDataService.getHttpData(self.dataSelected.dataID, theYearRange).then(function (response) {//Pass in the dataID which will be used in the api query string
		     	self.dataSet = true;//enable the disabled class on the update button
		     	var promiseData = response[1];
		     	//console.log(promiseData);
		     	//filteredData -- USED FOR MAP AND GRID
		     	var filteredData = Utilities.getCountriesData(promiseData);
		     	//FOR THE GRID
		     	var rowData = Utilities.getDataForGrid(filteredData, self.unit);
		     	var colDefs = Utilities.upDateGridData(startYear, endYear);
		     	//add the collumn defs to the grid options
		        self.gridOptions.columnDefs = colDefs;
		        //add the grid data to the grid options
		     	self.gridOptions.rowData = rowData;
		     	//if the grid is already drawn from before then refresh it with the:
		        //new column defs, new data
		        if(self.gridOptions.api){
		        	self.gridOptions.api.setColumnDefs(colDefs);
					self.gridOptions.api.setRowData(rowData);
					self.gridOptions.api.refreshView();	
					if(endYear - startYear < 13){
          				self.gridOptions.api.sizeColumnsToFit();
          			}
				}
				//FOR THE MAP
		        //self.years is for the map, array of objs each obj has key as "year" and key as "data"
		        self.years = Utilities.getEachYearsData(startYear, endYear, filteredData);
		        self.updateYear(0);//always select the first yea when the update button is clicked
		        //set the labels for the map and grid
		        self.dataLabelLongMAPGRID = self.dataLabelLong;	  
		        self.startYearMAPGRID = self.startYear;  
		        self.endYearMAPGRID = self.endYear;  		
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
