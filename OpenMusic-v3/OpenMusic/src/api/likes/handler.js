const ClientError = require('../../exceptions/ClientError');

class LikesHandler {
  constructor(likesService, albumsService, cacheService) {
    this._likesService = likesService;
    this._albumsService = albumsService;
    this._cacheService = cacheService;

    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.getAlbumLikeHandler = this.getAlbumLikeHandler.bind(this);
  }

  async postAlbumLikeHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._albumsService.checkAlbum(id);

      await this._cacheService.delete(`openmusic:${id}`);
      const message = await this._likesService.likeAlbums(credentialId, id);
      return h.response({
        status: 'success',
        message,
      }).code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getAlbumLikeHandler(request, h) {
    try {
      const { id } = request.params;
      const dataRaw = await this._cacheService.get(`openmusic:${id}`);
      const data = JSON.parse(dataRaw);
      const response = h.response({
        status: 'success',
        data,
      }).header('X-Data-Source', 'cache');
      return response;
    } catch (error) {
      const { id } = request.params;

      const likes = await this._likesService.getCountAlbumLikes(id);
      const data = {
        likes,
      };

      await this._cacheService.set(`openmusic:${id}`, JSON.stringify(data));
      return h.response({
        status: 'success',
        data,
      });
    }
  }
}

module.exports = LikesHandler;
