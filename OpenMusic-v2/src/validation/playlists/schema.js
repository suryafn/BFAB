const Joi = require('joi');

const postPlaylistSchema = Joi.object({
  name: Joi.string().required(),
});

const postPlaylistSongSchema = Joi.object({
  songId: Joi.string().required(),
});

const deletePlaylistSongSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = {
  postPlaylistSchema,
  postPlaylistSongSchema,
  deletePlaylistSongSchema,
};
