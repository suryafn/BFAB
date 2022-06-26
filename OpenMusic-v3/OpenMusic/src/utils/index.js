const mapDBToModel = ({
  id, title, year, genre, performer, duration, albumid,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: albumid,
});

const mapSongToAlbum = (albumWithSong) => ({
  id: albumWithSong[0]['Album Id'],
  name: albumWithSong[0].name,
  year: albumWithSong[0]['Album year'],
  coverUrl: albumWithSong[0].coverUrl,
  songs: albumWithSong[0].id !== null ? albumWithSong.map(mapDBToModel) : [],
});

const mapDBToModelSong = ({
  id, title, performer,
}) => ({
  id,
  title,
  performer,
});

const mapDBToModelPlaylistSong = (playlistSong) => ({
  id: playlistSong[0]['Playlist Id'],
  name: playlistSong[0].name,
  username: playlistSong[0].username,
  songs: playlistSong.map(mapDBToModelSong),
});

const mapDBToActivities = ({
  username, title, action, time,
}) => ({
  username,
  title,
  action,
  time,
});

const mapDBToModelPlaylistActivities = (playlistActivies) => ({
  playlistId: playlistActivies[0].id,
  activities: playlistActivies[0].action !== null ? playlistActivies.map(mapDBToActivities) : [],
});

module.exports = {
  mapSongToAlbum,
  mapDBToModel,
  mapDBToModelPlaylistSong,
  mapDBToModelPlaylistActivities,
};
