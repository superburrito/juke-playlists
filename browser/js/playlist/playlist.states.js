juke.config(function($stateProvider){
	$stateProvider.state('newPlaylist', {
		url: '/playlists/new',
		templateUrl: '/js/playlist/templates/playlist-form.html',
		controller: 'PlaylistFormCtrl'
	});

	$stateProvider.state('showPlaylist',{
		url: '/playlists/:playlistId',
		templateUrl: '/js/playlist/templates/playlist.html',
		controller: 'PlaylistCtrl',
		resolve: {
			thePlaylist: function(PlaylistFactory, $stateParams){
				console.log('StateParams.playlistID is', $stateParams.playlistId);
				return PlaylistFactory.fetchById($stateParams.playlistId);
			}
		}
	});
});

	