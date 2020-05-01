/**
 * @Developed by @Jiahong
 */
import moment from 'moment';

export default (content) =>
  `<body alink="#999999" bgcolor="#f8f8f8" link="#999999" style="background:#f8f8f8; min-height:1000px; color:#cdcbcb;font-family:Arial, Helvetica, sans-serif; font-size:12px" text="#cdcbcb" yahoo="fix">
    <div leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="height:auto !important;width:100% !important; font-family: Helvetica,Arial,sans-serif !important; margin-bottom: 40px;">
      <center>
        <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff;border:1px solid #e4e2e2;border-collapse:separate !important; border-radius:4px;border-spacing:0;color:#242128; margin:0;padding:40px;" heigth="auto">
          <tbody>
            <tr>
              <td align="left" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                <img src="https://d38cm9ok81ymav.cloudfront.net/aac-logo.png" />
              </td>
              <td align="right" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                <span style="color: #8f8f8f; font-weight: normal; line-height: 2; font-size: 14px;">
                  ${moment().format('MM.DD.YYYY')}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style="padding-top:10px;border-top:1px solid #e4e2e2">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse;">
                  <tbody>
                    ${content}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table style="margin-top:30px; padding-bottom:20px; margin-bottom: 40px;">
          <tbody>
            <tr>
              <td align="center" valign="center">
                <p style="font-size: 12px; text-decoration: none;line-height: 1; color:#909090; margin-top:0px; margin-bottom:5px; "> Alpha Apparel Co. LLC, 35 Little Russell St. Hoston,TX </p>
                <p style="font-size: 12px; line-height:1; color:#909090;  margin-top:5px; margin-bottom:5px;">
                  <a href="https://www.alphaapparelco.com/policy" style="color: #922c88; text-decoration:none;">Privacy Policy</a> | <a href="#" style="color: #922c88; text-decoration:none;">Unscubscribe</a>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  </body>`;
