
angular.module('MyApp.Grid')

.controller('GridController', function($scope, Utilities, SetGlobals, GridUtilities) {

	var self = this;
	var colDefs;
	var rowData;

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

	//GRID's filter
    self.onFilterChanged = function (value) {
		self.gridOptions.api.setQuickFilter(value);
	};

	Utilities.getFilteredData().then(function(data){
		self.filteredData = data;
	});

	SetGlobals.getStartYear().then(function(data){
		self.startYear = data;
	});

	SetGlobals.getEndYear().then(function(data){
		self.endYear = data;
		//once you have self.filteredData, self.startYear,self.endYear...
		//..calc the grid's data and col defs
		makeGrid();
	});

	//NOT WORKING
	//trying to watch for Utilities.filteredDataGlobal to change again
	//Which would be every time the update button is clicked
	$scope.$watch(Utilities.filteredDataGlobal, function (newVal, oldVal,scope) {		
		console.log(newVal, oldVal);
		self.filteredData = newVal;
	});

	function makeGrid(){
		rowData = GridUtilities.getDataForGrid(self.filteredData);
		colDefs = GridUtilities.upDateGridData(self.startYear, self.endYear);
		//add the data and the colDefs to self.gridOptions
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
	}


}).directive('myGrid', function () {

	    return {
	        restrict: 'E',
	        templateUrl: 'app/main/gridtemp.html', //path from index.html
	        scope: {// attributes bound to the scope of the directive
	          gridOptions : '='
	        }
	    };

});

