const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongHandler = this.putSongHandler.bind(this);
    this.deleteSongHandler = this.deleteSongHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validatorSongPayload(request.payload);
      const {
        title, year, genre, performer, duration, albumId,
      } = request.payload;

      const result = await this._service.addSong({
        title, year, genre, performer, duration, albumId,
      });

      const response = h.response({
        status: 'success',
        data: {
          songId: result,
        },
      });
      response.code(201);
      return response;
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
        status: 'fail',
        message: 'An error occurred on the server',
      });
      response.code(500);
      return response;
    }
  }

  async getSongsHandler(request, h) {
    try {
      const result = await this._service.getAllSongs(request.query);

      const response = h.response({
        status: 'success',
        data: {
          songs: result.map((song) => ({
            id: song.id,
            title: song.title,
            performer: song.performer,
          })),
        },
      });
      response.code(200);
      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'An error occurred on the server',
      });
      response.code(500);
      return response;
    }
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const result = await this._service.getSongById(id);

      const response = h.response({
        status: 'success',
        data: {
          song: result,
        },
      });
      response.code(200);
      return response;
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
        status: 'fail',
        message: 'An error occurred on the server',
      });
      response.code(500);
      return response;
    }
  }

  async putSongHandler(request, h) {
    try {
      this._validator.validatorSongPayload(request.payload);
      const { id } = request.params;
      await this._service.editSongById(id, request.payload);

      const response = h.response({
        status: 'success',
        message: 'Successfully updated song',
      });
      response.code(200);
      return response;
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
        status: 'fail',
        message: 'An error occurred on the server',
      });
      response.code(500);
      return response;
    }
  }

  async deleteSongHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteSong(id);

      const response = h.response({
        status: 'success',
        message: 'Successfully deleted song',
      });
      response.code(200);
      return response;
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
        status: 'fail',
        message: 'An error occurred on the server',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = SongsHandler;
