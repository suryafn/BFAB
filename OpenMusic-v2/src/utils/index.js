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


module.exports = {
  mapSongToAlbum,
  mapDBToModel,
  mapDBToModelPlaylistSong,
};
