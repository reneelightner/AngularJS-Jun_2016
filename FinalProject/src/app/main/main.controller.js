(function() {
  'use strict';

  angular
    .module('MyApp.Main')
    .controller('MainController', function(UI_STATES, MainControllerDataService, SetGlobals, Utilities, MapUtilities, GridUtilities) {

	    var self = this;

		//for the "choose a data set" buttons
	    self.dataSets =[
	    	{"dataLabelShort": "GDP growth (annual %)", "dataID": "NY.GDP.MKTP.KD.ZG", "dataLabelUnit":"%"},
			{"dataLabelShort": "GDP (current US$)", "dataID": "NY.GDP.MKTP.CD", "dataLabelUnit":"$"},
	    	{"dataLabelShort": "GDP per capita (current US$)", "dataID": "NY.GDP.PCAP.CD", "dataLabelUnit":"$"},
	    	{"dataLabelShort": "GNI per capita, Atlas method (current US$)", "dataID": "NY.GNP.PCAP.CD", "dataLabelUnit":"$"},
	    	/*{"dataLabelShort": "Exports per of GDP", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "Foreign direct investment, net inflows (BoP, current US$)", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "GNI per capita, PPP (current international $)", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "GINI index", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "Inflation, consumer prices (annual %)", "dataID": "xx", "dataLabelUnit":""}*/
	    	{"dataLabelShort": "Population, total", "dataID": "SP.POP.TOTL", "dataLabelUnit": " people"},
	    	{"dataLabelShort": "Life expectancy at birth, total (years)", "dataID": "SP.DYN.LE00.IN", "dataLabelUnit":" yrs"},
	    	{"dataLabelShort": "Internet users (per 100 people)", "dataID": "IT.NET.USER.P2", "dataLabelUnit": ""},
	    	{"dataLabelShort": "Imports of goods and services (% of GDP)", "dataID": "NE.IMP.GNFS.ZS", "dataLabelUnit": "%"},
	    	{"dataLabelShort": "Unemployment rate of the total labor force (modeled ILO estimate)", "dataID": "SL.UEM.TOTL.ZS", "dataLabelUnit": "%"}
	    	/*{"dataLabelShort": "Agriculture, value added (% of GDP)", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "CO2 emissions (metric tons per capita)", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "Literacy rate, adult total (% of people ages 15 and above)", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "Central government debt, total (% of GDP)", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "Inflation, GDP deflator (annual %)", "dataID": "xx", "dataLabelUnit":""}*/
	    	/*{"dataLabelShort": "Poverty headcount ratio at national poverty line (% of population)", "dataID": "xx", "dataLabelUnit":""}*/
	    ];

	    //called when click on a data set button
	    self.updateData = function(indexSelected){
			self.currentDataIndex = indexSelected;
			self.dataSelected = self.dataSets[indexSelected];
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

		//GRID's filter
        self.onFilterChanged = function (value) {
		    self.gridOptions.api.setQuickFilter(value);
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
		     	//filteredData -- array of objs, one obj for each country's year USED FOR MAP AND GRID
		     	var filteredData = Utilities.getCountriesData(promiseData);
		     	self.unit = self.dataSelected.dataLabelUnit;//unit for map and grid
		     	SetGlobals.returnGlobals(startYear, endYear);
		     	//FOR THE GRID
		     	var rowData = GridUtilities.getDataForGrid(filteredData, self.unit);
		     	var colDefs = GridUtilities.upDateGridData(startYear, endYear);
		        self.gridOptions.columnDefs = colDefs;//add the collumn defs to the grid options
		     	self.gridOptions.rowData = rowData; //add the grid data to the grid options
		     	//if the grid is already drawn from before then refresh it with the: new column defs, new data
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
		        self.years = MapUtilities.getEachYearsData(startYear, endYear, filteredData);
		        self.updateYear(0);//selects the year and its data to show on map, always select the first yea when the update button is clicked
		        self.domainForLengend = MapUtilities.calcLegendDomain(filteredData);
		        //FOR THE MAP AND GRID
		        //set the text labels for the map and grid
		        self.dataLabelLongMAPGRID = self.dataSelected.dataLabelShort;	  
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

	    
	});

  /** @ngInject */

})();
