juke.factory('PlaylistFactory', function ($http) {

  var cachedPlaylists = [];

  var PlaylistFactory = {};

  PlaylistFactory.fetchAll = function () {
    return $http.get('/api/playlists')
    .then(function (response) {
      angular.copy(response.data, cachedPlaylists);
      return cachedPlaylists;
    });
  };

  PlaylistFactory.addSong = function (playlist, song) {
    return $http.post('/api/playlists/' + playlist.id + '/songs', {song: song})
    .then(function (response) {
      return response.data;
    });
  };

  PlaylistFactory.fetchLastAdded = function(){
    return cachedPlaylists[cachedPlaylists.length-1];
  };

  PlaylistFactory.fetchById = function(id){
  	return $http.get('/api/playlists/' + id)
  	.then(function (response) {
  		return response.data;
  	});
  };
  
  PlaylistFactory.create = function (data) {
    return $http.post('/api/playlists', data)
    .then(function (response) {
      var playlist = response.data
      cachedPlaylists.push(playlist);
      return playlist;
    });
  };

  return PlaylistFactory;

});