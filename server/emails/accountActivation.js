/**
 * @Developed by @Jiahong
 */

export default {
  subject: 'To Activate Your Account, Click On Activation Link',
  body: (userName, link) => `<tr>
            <td>
              <h3 style="color:#303030; font-size:20px; line-height: 1.6; font-weight:500;">
                Hi ${userName},
              </h3>
              <p style="color:#8f8f8f; font-size: 14px; padding-bottom: 20px; line-height: 1.4;">
                Thanks for getting started with Alpha Apparel Co.! We need little more information to complete your registration, including confirmation of your email address.
                Click below to confirm your email address.
              </p>
            </td>
            </tr>
            <tr>
              <td style="padding:15px 0px;" valign="top" align="center">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate !important;">
                  <tbody>
                    <tr>
                      <td align="center" valign="middle" style="padding:13px;">
                        <a href="${link}" title="Confirm Email" target="_blank" style="font-size: 14px; line-height: 1.5; font-weight: 700; letter-spacing: 1px; padding: 15px 40px; text-align:center; text-decoration:none; color:#FFFFFF; border-radius: 50px; background-color:#922c88;">Confirm Email</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <p style="color:#8f8f8f; font-size: 14px; padding-top: 20px; line-height: 1.4;">
                  If you have problems, please paste the following URL into your browser.
                </p>
                <p style="background-color:#f1f1f1; padding: 8px 15px; border-radius: 5px; width: 490px; display: inline-block; margin-bottom:20px; font-size: 14px;  line-height: 1.4; font-family: Courier New, Courier, monospace; margin-top:0">
                  <a href="${link}" style="color: #922c88;">${link}</a>
                </p>
                <p style="color:#8f8f8f; font-size: 14px; padding-top: 20px; line-height: 1;">
                  Thanks,
                </p>
                <p style="color:#8f8f8f; font-size: 14px; padding-bottom: 20px; line-height: 1;">
                  Alpha Apparel Co. Support
                </p>
            </td>
          </tr>`,
};
