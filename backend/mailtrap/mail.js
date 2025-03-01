import { client,sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./mailTemplate.js";

export const sendVerificationCode = (email,verificationCode)=>{
    const recipients = [
        {
          email: email
        }
      ];

    client.send({
    from: sender,
    to: recipients,
    subject: "Email Verification",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationCode),
    category: "Email Verification",
  })
  .then(console.log, console.error);
}


