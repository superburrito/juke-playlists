juke.controller('PlaylistFormCtrl', 
	function($scope, $log, $state, PlaylistFactory, SongFactory){
	
	$scope.submit = function(){
		$log.log($scope.typedName);
		$log.log($scope.playlistForm);
		PlaylistFactory.create({
			name: $scope.typedName
		})
		.then(function(newPlaylist){
			$scope.lastAddedId = newPlaylist.id;
			$scope.playlistForm.$setPristine();
			$scope.typedName = null;
		})
		.then(function(){
			console.log("Auto-directing...");
			$state.go('showPlaylist', {playlistId: $scope.lastAddedId});
		})
	};
});


juke.controller('PlaylistCtrl', 
	function($scope, $log, PlaylistFactory, SongFactory, PlayerFactory, thePlaylist){
	
	console.log('The playlist is ', thePlaylist);
	$scope.playlist = thePlaylist;
	SongFactory.fetchAll()
	.then(function(songs){
		console.log('songs is ', songs);
		$scope.songs = songs;
	});

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

	$scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

	$scope.addSong = function(){
		var song = $scope.selectedSong  
		console.log('Adding song: ' + song + ' to playlist: ' + $scope.playlist);
		PlaylistFactory.addSong($scope.playlist, song)
		.then(function(addedSong){
			return SongFactory.convert(addedSong);
		})
		.then(function(songWithAudio){
			return $scope.playlist.songs.push(songWithAudio);
		});
		$scope.addSongForm.$setPristine();
		$scope.selectedSong = null;
	};
});


// For the sidebar
juke.controller('PlaylistsCtrl', function($scope, PlaylistFactory){
	PlaylistFactory.fetchAll()
	.then(function(playlists){
		$scope.playlists = playlists;
	});
});


