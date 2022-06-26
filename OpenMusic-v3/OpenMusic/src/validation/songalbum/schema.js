const Joi = require('joi');

const AlbumPaylodSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2022)
    .required(),
});

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

module.exports = { AlbumPaylodSchema, SongPayloadSchema };
