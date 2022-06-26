const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumHandler = this.putAlbumHandler.bind(this);
    this.deleteAlbumHandler = this.deleteAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      this._validator.validatorAlbumPayload(request.payload);
      const { name, year } = request.payload;
      const result = await this._service.addAlbum({ name, year });

      const response = h.response({
        status: 'success',
        data: {
          albumId: result,
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

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const result = await this._service.getAlbumById(id);

      const response = h.response({
        status: 'success',
        data: {
          album: result,
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

  async putAlbumHandler(request, h) {
    try {
      this._validator.validatorAlbumPayload(request.payload);
      const { id } = request.params;
      await this._service.editAlbumById(id, request.payload);

      const response = h.response({
        status: 'success',
        message: 'Successfully updated album',
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

  async deleteAlbumHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteAlbum(id);

      const response = h.response({
        status: 'success',
        message: 'Successfully deleted album',
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

module.exports = AlbumsHandler;
