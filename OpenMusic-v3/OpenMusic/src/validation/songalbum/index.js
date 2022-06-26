const InvariantError = require('../../exceptions/InvariantError');
const { AlbumPaylodSchema, SongPayloadSchema } = require('./schema');

const OpenMusicValidator = {
  validatorAlbumPayload: (payload) => {
    const validationResult = AlbumPaylodSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatorSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = OpenMusicValidator;
