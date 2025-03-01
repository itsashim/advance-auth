import { client,sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./mailTemplate.js";

export const sendVerificationCode = async (email,verificationCode)=>{
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

export const sendWelcomeEmail = async (email)=>{
    const recipients = [
        {
          email: email
        }
    ];
    
    client.send({
        from: sender,
        to: recipients,
        template_uuid: "da688803-f2ec-44c2-925a-0c4276ad8126",
        template_variables: {
            "company_info_name": "Auth-course",
            "name": "Ashim"
        }
    }).then(console.log, console.error);
}
