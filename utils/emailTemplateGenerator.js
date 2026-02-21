const verificationEmailTemplate = (name, verificationLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:12px; padding:40px; box-shadow:0 8px 20px rgba(0,0,0,0.08);">
            
            <tr>
              <td align="center">
                <h1 style="color:#1a73e8; margin-bottom:10px;">Verify Your Email</h1>
                <p style="color:#555; font-size:16px; margin-top:0;">
                  Hello <strong>${name}</strong>,
                </p>
              </td>
            </tr>

            <tr>
              <td align="center">
                <p style="color:#666; font-size:15px; line-height:1.6;">
                  Thank you for registering. Please verify your email address by clicking the button below.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:30px 0;">
                <a href="${verificationLink}" 
                  style="
                    background-color:#1a73e8;
                    color:#ffffff;
                    padding:14px 28px;
                    text-decoration:none;
                    font-size:16px;
                    border-radius:8px;
                    display:inline-block;
                    font-weight:bold;
                  ">
                  Verify Email
                </a>
              </td>
            </tr>

            <tr>
              <td align="center">
                <p style="color:#999; font-size:13px;">
                  If you did not create an account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:30px;">
                <p style="font-size:12px; color:#bbb;">
                  © ${new Date().getFullYear()} Your Company Name. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
export default verificationEmailTemplate;