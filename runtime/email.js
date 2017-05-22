/**
 * 邮件发送
 */

var config = require('./App/AppConfig')
var nodemailer = require('nodemailer')
var log = require('./App/log').helper
var transporter = nodemailer.createTransport(config.runtime.email)
module.exports.send = function (subject, text, html) {
  var mailOptions = {
    from: '348380264@qq.com', // 发件地址
    to: '348380264@qq.com', // 收件列表
    subject: subject, // 标题
    // text和html两者只支持一种
    text: text, // 标题
    html: html // html 内容
  }

// send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return log.error('邮件发送发送错误: ' + error)
    }
    log.info('邮件已发送: ' + info.response)
  })
}
