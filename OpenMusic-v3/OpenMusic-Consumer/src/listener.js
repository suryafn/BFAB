class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistsService.getPlaylist(playlistId);
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(playlist));
      console.log(result);
    } catch(error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
