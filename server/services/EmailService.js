import nodemailer from 'nodemailer';
import { template, accountActivation, resetPassword } from '../emails';

// The credentials for the email account you want to send mail from.
// We have to enable the Gmail service to use it in third-party apps. In case we miss to do so, we may face such error.
// To resolve this error just login in Gmail account and enable less secure apps using this link https://myaccount.google.com/lesssecureapps
const credentials = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

// Getting Nodemailer all setup with the credentials for when the 'sendEmail()'
// function is called.
const transporter = nodemailer.createTransport(credentials);

class EmailService {
  static sendActivationEmail({ to, username, code }) {
    const { subject, body } = accountActivation;
    this.send({
      from: process.env.MAIL_USER,
      to,
      subject,
      message: template(
        body(username, `${process.env.REACT_APP_URL}/activate/${code}`),
      ),
    });
  }

  static sendResetPasswordEmail({ to, username, token }) {
    const { subject, body } = resetPassword;
    this.send({
      from: process.env.MAIL_USER,
      to,
      subject,
      message: template(
        body(username, `${process.env.REACT_APP_URL}/reset-password/${token}`),
      ),
    });
  }

  static async send({ from, to, subject, message }) {
    const email = {
      from,
      to,
      subject,
      html: message,
    };
    // This file is imported into the controller as 'sendEmail'. Because
    // 'transporter.sendMail()' below returns a promise we can write code like this
    // in the contoller when we are using the sendEmail() function.
    //
    //  sendEmail()
    //   .then(() => doSomethingElse())
    //
    // If you are running into errors getting Nodemailer working, wrap the following
    // line in a try/catch. Most likely is not loading the credentials properly in
    // the .env file or failing to allow unsafe apps in your gmail settings.
    await transporter.sendMail(email);
  }
}

export default EmailService;
