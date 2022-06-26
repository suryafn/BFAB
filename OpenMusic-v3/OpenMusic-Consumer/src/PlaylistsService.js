const { Pool } = require('pg');
const { mapDBToModelPlaylistSong } = require('./utils');
class PlaylistsService {
  constructor() {
    this._pool = new Pool();

    this.getPlaylist = this.getPlaylist.bind(this);
  }

  async getPlaylist(playlistId) {
    const query = {
      text: `SELECT playlists.id as "Playlist Id", playlists.name, users.username, songs.*
      FROM playlist_songs
      JOIN playlists
      ON playlist_songs.playlist_id = playlists.id
      JOIN users 
      ON playlists.owner = users.id
      JOIN songs
      ON playlist_songs.song_id = songs.id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return mapDBToModelPlaylistSong(result.rows);
  }
}

module.exports = PlaylistsService;
