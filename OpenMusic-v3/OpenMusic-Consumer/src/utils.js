const mapDBToModelSong = ({
  id, title, performer,
}) => ({
  id,
  title,
  performer,
});

const mapDBToModelPlaylistSong = (playlistSong) => ({
  playlist: {
    id: playlistSong[0]['Playlist Id'],
    name: playlistSong[0].name,
    songs: playlistSong.map(mapDBToModelSong),
  }
});

module.exports = { mapDBToModelPlaylistSong };
