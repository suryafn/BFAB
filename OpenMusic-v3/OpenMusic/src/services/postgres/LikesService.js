const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class LikesService {
  constructor() {
    this._pool = new Pool();
  }

  async likeAlbums(userId, albumId) {
    const checkQuery = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const checkResult = await this._pool.query(checkQuery);

    if (!checkResult.rows.length) {
      const id = `album-likes-${nanoid(16)}`;
      const addQuery = {
        text: 'INSERT INTO user_album_likes VALUES ($1, $2, $3) RETURNING id',
        values: [id, userId, albumId],
      };

      const addResult = await this._pool.query(addQuery);

      if (!addResult.rows.length) {
        throw new InvariantError('Gagal menyukai album');
      }

      return 'Berhasil menambahkan ke likes album';
    }
    const idItem = checkResult.rows[0].id;

    const deleteQuery = {
      text: 'DELETE FROM user_album_likes WHERE id = $1 RETURNING id',
      values: [idItem],
    };

    const deleteResult = await this._pool.query(deleteQuery);

    if (!deleteResult.rows.length) {
      throw new InvariantError('Gagal menyukai album');
    }

    return 'Berhasil menghapus dari likes album';
  }

  async getCountAlbumLikes(albumId) {
    const query = {
      text: 'SELECT COUNT(*) as "likes" FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    return parseInt(result.rows[0].likes, 10);
  }
}

module.exports = LikesService;
