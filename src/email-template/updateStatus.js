const templateGenerator = (userFullName, complaint, remarks) => {
  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Status Update</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
  
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:20px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <tr>
      <td style="background:#1e293b; padding:20px; text-align:center;">
        <h2 style="color:#ffffff; margin:0;">Complaint Status Updated</h2>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:30px;">
        
        <p style="font-size:16px; color:#333;">
          Hello <strong>${userFullName}}</strong>,
        </p>

        <p style="font-size:15px; color:#555;">
          The status of your complaint has been updated. Please find the details below:
        </p>

        <!-- Details Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px; border-collapse:collapse;">
          
          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold; width:40%;">Complaint ID</td>
            <td style="padding:10px; background:#f8fafc;">${complaint._id}</td>
          </tr>

          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Current Status</td>
            <td style="padding:10px; background:#f8fafc; color:#16a34a; font-weight:bold;">
              ${complaint.status}
            </td>
          </tr>

          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Remarks</td>
            <td style="padding:10px; background:#f8fafc;">
              ${remarks}
            </td>forgotPassword
          </tr>

          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Updated On</td>
            <td style="padding:10px; background:#f8fafc;">
              ${complaint.updatedAt}
            </td>
          </tr>

        </table>

        <p style="margin-top:25px; font-size:14px; color:#666;">
          If you have any further questions, please contact the administration.
        </p>

        <p style="margin-top:20px; font-size:14px; color:#999;">
          Regards,<br/>
          <strong>College Complaint Management System</strong>
        </p>

      </td>
    </tr>

   
    <tr>
      <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#888;">
        © 2026 College CMS. All rights reserved.
      </td>
    </tr>

  </table>

</body>
</html>
  `;
}


export { templateGenerator };