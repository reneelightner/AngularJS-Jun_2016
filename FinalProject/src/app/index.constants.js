/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('template')

    .constant('UI_STATES', {
    	HOME: 'home',
    	MAP: 'map',
    	GRID: 'grid'
    })

    .service('MainControllerDataService',function($resource){

    	var self = this;

	    var myResourceobject = $resource("/countries/indicators/:dataID",{
	    	format: 'json',
	    	per_page: 15000
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

    	self.getCountriesData = function(dataFromPromise){

    		var filteredData = [];//this is where all of the filtered data (just the countries) will go	 

	     	angular.forEach(dataFromPromise, function(value, key){//allData is an object..need to use for each
	     		if(countryCodes[value.country.id] && value.value !==null){//make sure we are pulling out countries in the countryCode list
		     		var figure = value.value;
		     		var ccode = countryCodes[value.country.id];//replace the two letter country with w/3 letter country code from countryCode obj
		     		var cname = value.country.value;
		     		var year = value.date;
		     		filteredData.push({"figure":figure, "ccode":ccode, "cname":cname, "year":year});
		     	}
	     	});

	     	self.filteredDataGlobal = filteredData;

	     	return filteredData;

    	};

    	self.getFilteredData = function(){
			return self.filteredDataGlobal;
		};

    })

	.service('SetGlobals',function(){

		var self = this;

		self.returnGlobals = function(startYear, endYear){

			self.startYearGlobal = startYear;
			self.endYearGlobal = endYear;

		};

		self.getStartYear = function(){
			return self.startYearGlobal;
		};

		self.getEndYear = function(){
			return self.endYearGlobal;
		};


	})

	.service('MapUtilities',function(){

		var self = this;

		//for the map's legend domain find the min and max values of all years' data
		self.calcLegendDomain = function(filteredData){

			var i, len, elem, allValues = [], maxVal, minVal;

			for (i = 0, len = filteredData.length; i < len; i++) {
			    elem = filteredData[i];

			    allValues.push(parseFloat(elem.figure));
			}

			maxVal = d3.max(allValues);
			minVal = d3.min(allValues);

			return [minVal, maxVal];
		};

		//pass in firstYear, endYear, loop through each year, find its data
    	self.getEachYearsData = function(startYear, endYear, filteredData) {

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

    		return theYears;
    	};

	})

	.service('GridUtilities',function(){

		var self = this;

		//get the columns that will show in the grid (one col for each year)
    	self.upDateGridData = function(startYear, endYear){

		     	//reset the collumn defs
		     	var colDefs = [
	            	{field: 'cname', headerName: 'Country'},
	            	{field: 'ccode', headerName: 'ISO3'}
        		];
		     	//depending on the start and end year:
		     	//add all of the years to the grid's collum defs 
	        	for (var i = parseInt(startYear); i < parseInt(endYear); i++) {
	        		var theYear = i.toString();
		        	colDefs.push({field: theYear, headerName: theYear});
		        }
		        
				return colDefs;
		};

		self.getDataForGrid = function(filteredData, dataUnit){

    		var i, len, res = [], obj = {}, obj1 = {}, elem;

			for (i = 0, len = filteredData.length; i < len; i += 1) {
			    elem = filteredData[i];
			    if (!(obj1 = obj[elem.ccode])) {
			        obj1 = obj[elem.ccode] = {
			            ccode: elem.ccode,
			            cname: elem.cname
			        };
			        res.push(obj1);
			    }
			    obj1[filteredData[i].year] = (Math.round(elem.figure * 10) / 10).toFixed(2)+dataUnit;//Round the figure to tenths pace
			}

			return res;

    	};

	});

})();
