const nodeMailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendMail(targetMail, content) {
    const message = {
      from: 'Openmusic',
      to: targetMail,
      subject: 'Export Playlist',
      text: 'Terlampir hasil dari export playlist',
      attachments: {
        filename: 'playlist.json',
        content, 
      }
    }

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
