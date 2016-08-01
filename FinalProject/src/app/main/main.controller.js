(function() {
  'use strict';

  angular
    .module('template')
    .service('MainControllerDataService',function($resource){

    	var self = this;

	    var myResourceobject = $resource("/countries/indicators/:dataID",{
	    	format: 'json',
	    	per_page: 3000
	    },{
	    	getData:{
	    		method: "GET",
	    		isArray: true
	    	}
	    });

	    //this returns a promise object that handles the response (if its successful or error)
	    self.getHttpData = function(theDataID, yearRange){
		    return myResourceobject.getData({dataID:theDataID, date: yearRange}).$promise;
	    };

    })
    .service('Utilities',function(){

    	var self = this;

    	//pass in firstYear, endYear, loop through each year, find its data
    	this.getEachYearsData = function(startYear, endYear, filteredData) {

    		var starYearAsNum = parseInt(startYear);
    		var endYearAsNum = parseInt(endYear);
    		var theYears = [];
    		var counter = 0;

    	    for (var i = starYearAsNum; i < (endYearAsNum+1); i++) {
    			var dataForThisYear = [];
    			var currYear = i;
	        	for (var k = 0; k < filteredData.length; k++) {
	        		if(filteredData[k].year == currYear){
	        			dataForThisYear.push(filteredData[k]);
	        		}
	        	}
    			theYears[counter] = {"year": i, "data":dataForThisYear};
    			counter++;
    		}
    		console.log(theYears);
    		return theYears;
    	};

    	var countryCodes = {"AF":"AFG","AX":"ALA","AL":"ALB","DZ":"DZA","AS":"ASM","AD":"AND",
		"AO":"AGO","AI":"AIA","AQ":"ATA","AG":"ATG","AR":"ARG","AM":"ARM","AW":"ABW","AU":"AUS",
		"AT":"AUT","AZ":"AZE","BS":"BHS","BH":"BHR","BD":"BGD","BB":"BRB","BY":"BLR","BE":"BEL",
		"BZ":"BLZ","BJ":"BEN","BM":"BMU","BT":"BTN","BO":"BOL","BA":"BIH","BW":"BWA","BV":"BVT",
		"BR":"BRA","VG":"VGB","IO":"IOT","BN":"BRN","BG":"BGR","BF":"BFA","BI":"BDI","KH":"KHM",
		"CM":"CMR","CA":"CAN","CV":"CPV","KY":"CYM","CF":"CAF","TD":"TCD","CL":"CHL","CN":"CHN",
		"HK":"HKG","MO":"MAC","CX":"CXR","CC":"CCK","CO":"COL","KM":"COM","CG":"COG","CD":"COD",
		"CK":"COK","CR":"CRI","CI":"CIV","HR":"HRV","CU":"CUB","CY":"CYP","CZ":"CZE","DK":"DNK",
		"DJ":"DJI","DM":"DMA","DO":"DOM","EC":"ECU","EG":"EGY","SV":"SLV","GQ":"GNQ","ER":"ERI",
		"EE":"EST","ET":"ETH","FK":"FLK","FO":"FRO","FJ":"FJI","FI":"FIN","FR":"FRA","GF":"GUF",
		"PF":"PYF","TF":"ATF","GA":"GAB","GM":"GMB","GE":"GEO","DE":"DEU","GH":"GHA","GI":"GIB",
		"GR":"GRC","GL":"GRL","GD":"GRD","GP":"GLP","GU":"GUM","GT":"GTM","GG":"GGY","GN":"GIN",
		"GW":"GNB","GY":"GUY","HT":"HTI","HM":"HMD","VA":"VAT","HN":"HND","HU":"HUN","IS":"ISL",
		"IN":"IND","ID":"IDN","IR":"IRN","IQ":"IRQ","IE":"IRL","IM":"IMN","IL":"ISR","IT":"ITA",
		"JM":"JAM","JP":"JPN","JE":"JEY","JO":"JOR","KZ":"KAZ","KE":"KEN","KI":"KIR","KP":"PRK",
		"KR":"KOR","KW":"KWT","KG":"KGZ","LA":"LAO","LV":"LVA","LB":"LBN","LS":"LSO","LR":"LBR",
		"LY":"LBY","LI":"LIE","LT":"LTU","LU":"LUX","MK":"MKD","MG":"MDG","MW":"MWI","MY":"MYS",
		"MV":"MDV","ML":"MLI","MT":"MLT","MH":"MHL","MQ":"MTQ","MR":"MRT","MU":"MUS","YT":"MYT",
		"MX":"MEX","FM":"FSM","MD":"MDA","MC":"MCO","MN":"MNG","ME":"MNE","MS":"MSR","MA":"MAR",
		"MZ":"MOZ","MM":"MMR","NA":"NAM","NR":"NRU","NP":"NPL","NL":"NLD","AN":"ANT","NC":"NCL",
		"NZ":"NZL","NI":"NIC","NE":"NER","NG":"NGA","NU":"NIU","NF":"NFK","MP":"MNP","NO":"NOR",
		"OM":"OMN","PK":"PAK","PW":"PLW","PS":"PSE","PA":"PAN","PG":"PNG","PY":"PRY","PE":"PER",
		"PH":"PHL","PN":"PCN","PL":"POL","PT":"PRT","PR":"PRI","QA":"QAT","RE":"REU","RO":"ROU",
		"RU":"RUS","RW":"RWA","BL":"BLM","SH":"SHN","KN":"KNA","LC":"LCA","MF":"MAF","PM":"SPM",
		"VC":"VCT","WS":"WSM","SM":"SMR","ST":"STP","SA":"SAU","SN":"SEN","RS":"SRB","SC":"SYC",
		"SL":"SLE","SG":"SGP","SK":"SVK","SI":"SVN","SB":"SLB","SO":"SOM","ZA":"ZAF","GS":"SGS",
		"SS":"SSD","ES":"ESP","LK":"LKA","SD":"SDN","SR":"SUR","SJ":"SJM","SZ":"SWZ","SE":"SWE",
		"CH":"CHE","SY":"SYR","TW":"TWN","TJ":"TJK","TZ":"TZA","TH":"THA","TL":"TLS","TG":"TGO",
		"TK":"TKL","TO":"TON","TT":"TTO","TN":"TUN","TR":"TUR","TM":"TKM","TC":"TCA","TV":"TUV",
		"UG":"UGA","UA":"UKR","AE":"ARE","GB":"GBR","US":"USA","UM":"UMI","UY":"URY","UZ":"UZB",
		"VU":"VUT","VE":"VEN","VN":"VNM","VI":"VIR","WF":"WLF","EH":"ESH","YE":"YEM","ZM":"ZMB","ZW":"ZWE"};

    	this.getCountriesData = function(dataFromPromise){

    		var filteredData = [];//this is where all of the filtered data (just the countries) will go	 

	     	angular.forEach(dataFromPromise, function(value, key){//allData is an object..need to use for each
	     		if(countryCodes[value.country.id] && value.value !== null){//make sure we are pulling out countries in the countryCode list
		     		var figure = value.value;
		     		var ccode = countryCodes[value.country.id];//replace the two letter country with w/3 letter country code from countryCode obj
		     		var cname = value.country.value;
		     		var year = value.date;
		     		filteredData.push({"figure":figure, "ccode":ccode, "cname":cname, "year":year});
		     	}
	     	});

	     	return filteredData;

    	};


    })
    .controller('MainController', function(MainControllerDataService, Utilities) {

	    var self = this;

	    self.dataSets =[
	    	{"dataLabelShort": "GDP Growth", "dataLabelLong": "Gross domestic product, change from a year ago", "dataID": "NY.GDP.MKTP.KD.ZG"},
			/*{"dataLabelShort": "GDP", "dataLabelLong": "Gross domestic product, current $", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "GDP per capita (current US$)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "GNI per capita, Atlas method (current US$)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Exports of goods and services (% of GDP)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Foreign direct investment, net inflows (BoP, current US$)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "GNI per capita, PPP (current international $)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "GINI index", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	/*{"dataLabelShort": "Inflation, consumer prices (annual %)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	{"dataLabelShort": "Population", "dataLabelLong": "Population, total", "dataID": "SP.POP.TOTL"},
	    	{"dataLabelShort": "Life Expectancy", "dataLabelLong": "Life expectancy at birth, total years", "dataID": "SP.DYN.LE00.IN"},
	    	{"dataLabelShort": "Internet Users", "dataLabelLong": "Internet users per 100 people", "dataID": "IT.NET.USER.P2"},
	    	/*{"dataLabelShort": "Imports of goods and services (% of GDP)", "dataLabelLong": "xx", "dataID": "xx"}*/
	    	{"dataLabelShort": "Unemployment Rate", "dataLabelLong": "Unemployment rate of the total labor force (modeled ILO estimate)", "dataID": "SL.UEM.TOTL.ZS"}
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
			self.dataSet = false;//turns off disabled class on update button
			console.log(self.dataSelected);
		};

	    //called when the year input is changed
	    self.updateYearRange = function(startYear, endYear) {
	    	self.startYear = startYear;
	    	self.endYear = endYear;
	    	self.yearRange = startYear+":"+endYear;
	    	self.dataSet = false;//turns off disabled class on update button
	    	console.log(self.yearRange);
		};

	    self.currentYearIndex = 0;//automatically show the first year on the map

	    //called when a year button is clicked
	    self.updateYear = function(indexSelected) {
	    	self.currentYearIndex = indexSelected;
			self.dataToShowOnMap = self.years[self.currentYearIndex].data;	
			console.log(self.dataToShowOnMap);
		};

		//called when the app loads and when map and grid button is clicked
		self.updateGridMap = function(theYearRange, startYear, endYear) {

			console.log(self.yearRange);

		    MainControllerDataService.getHttpData(self.dataSelected.dataID, theYearRange).then(function (response) {//Pass in the dataID which will be used in the api query string
		     	var promiseData = response[1]; 
		     	var filteredData = Utilities.getCountriesData(promiseData);
		     	//console.log(filteredData);
		        //now that filteredData is built use the getEachYearsData() function in the Utilities service
		        //to add each year's data to self.years ..."data" will be the key in each obj of self.years
		        self.years = Utilities.getEachYearsData(startYear, endYear, filteredData);
		        //will need to reset the currentYearIndex if it goes over the number of years set in theYearRange
		        if(self.currentYearIndex > self.years.length){
		        	self.currentYearIndex = 0;
		        }
		        self.dataToShowOnMap = self.years[self.currentYearIndex].data;
		        console.log(self.dataToShowOnMap);
	    		self.dataToShowOnGrid = filteredData;
	    		self.dataSet = true;//enable the disabled class on the update button
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
	        templateUrl: 'grid.html'
	    };
	});

  /** @ngInject */

})();