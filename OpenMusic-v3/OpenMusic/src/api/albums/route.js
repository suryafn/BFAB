const routes = (albumHandler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: albumHandler.postAlbumHandler,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: albumHandler.getAlbumByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: albumHandler.putAlbumHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: albumHandler.deleteAlbumHandler,
  },
];

module.exports = routes;
