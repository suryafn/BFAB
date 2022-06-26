/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
const mapDBToAlbum = ({
  id,
  name,
  year,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapDBToSong = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumid,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: albumid,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToAlbum, mapDBToSong };
