var myModule = angular.module("MyApp", []).controller('MyController', function(Utilities, Playlist){

    this.playlist = new Playlist();

    this.checkAge = function() {
    	Utilities.checkAge(this.playlist);
    };

    this.outputPlaylist = function() {
		this.playlist.outputPlaylist(this.rockSongs, this.rapSongs, this.popSongs);
    }


    //when you click on the checkboxes the respective song will be checked: true
    this.rockSongs = [{song: "Rock song #1", checked: false},
    					{song: "Rock song #2", checked: false},
    					{song: "Rock song #3", checked: false},
    					{song: "Rock song #4", checked: false},
    					{song: "Rock song #5", checked: false}];

	this.rapSongs = [{song: "Rap song #1", checked: false},
					{song: "Rap song #2", checked: false},
					{song: "Rap song #3", checked: false},
					{song: "Rap song #4", checked: false},
					{song: "Rap song #5", checked: false}];

	this.popSongs = [{song: "Pop song #1", checked: false},
					{song: "Pop song #2", checked: false},
					{song: "Pop song #3", checked: false},
					{song: "Pop song #4", checked: false},
					{song: "Pop song #5", checked: false}];

	this.genreSelected = this.rockSongs;
	

}).service('Utilities', function() {

	this.checkAge = function(playlist) {
		if (playlist.userAge < 18) {
			playlist.explicitDisabled = true;
		} else {
			playlist.explicitDisabled = false;
		}
    }

    this.buildPlaylist = function(rockSongs, rapSongs, popSongs) {
    	var allSongsChecked = [];
		this.getSongsSelected(rockSongs, allSongsChecked);
		this.getSongsSelected(rapSongs, allSongsChecked);
		this.getSongsSelected(popSongs, allSongsChecked);
		return allSongsChecked;
    }

    this.getSongsSelected = function (arrOfSongs, allSongsChecked){
		angular.forEach(arrOfSongs, function(value, key){
			if(value.checked){
				allSongsChecked.push({title: value.song});
			}
		});
    }


}).factory('Playlist', function(Utilities) {

	function Playlist(){
		this.userName;
		this.userAge;
		this.playlistSelected = "clean";//default setting
		this.explicitDisabled = true;//default setting
	}


	Playlist.prototype.outputPlaylist = function(rockSongs, rapSongs, popSongs){
    	var usersPlaylist = {};
    	usersPlaylist.name = this.userName;
    	usersPlaylist.explicit = this.playlistSelected;
    	usersPlaylist.songs = Utilities.buildPlaylist(rockSongs, rapSongs, popSongs);
    	console.log(usersPlaylist);
    }


	return Playlist;

});

