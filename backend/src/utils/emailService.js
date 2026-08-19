
//reusable email sender function 

const sendEmail =  async ({to,subject,htmlContent}) =>{

    const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();
    const senderEmail = process.env.SENDER_EMAIL;

    try {
      
        if(!BREVO_API_KEY || !senderEmail){
            throw new Error("Email/Brevo Api key missing")
        }
      
        //send request to brevo server
        const response = await fetch("https://api.brevo.com/v3/smtp/email",{
            method:"POST",
            headers:{
                "api-key":BREVO_API_KEY,
                "content-type":"application/json",
                "accept": "application/json"
            },
            body:JSON.stringify({
                sender:{name:"Job Stack",email:senderEmail},
                to,
                subject,
                htmlContent
            })
        });
       
        const result = await response.json();
        if(!response.ok){
            throw new Error(result.message || "Brevo Api error");
        }
        return result;
        
    } 
    catch (error) {
        console.error(`Email error [${subject}]:`,error.message)
        throw error;
    }
}
 


//   * register user flow-2 start*

// verification otp send start

//this is how the UI will look,to send otp 
     const otpTemplate = (title, name, otp, message) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; text-align: center;">
        <h2 style="color: #4f46e5;">${title}</h2>
        <p>Hi ${name},</p>
        <p>${message}</p>
        <div style="margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #4f46e5; letter-spacing: 5px; background: #f3f4f6; padding: 10px 20px; border-radius: 8px;">${otp}</span>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888888;">&copy; 2026 JobStack. All rights reserved.</p>
    </div>
    `;

    
    // To send verification email
  export  const sendVerificationEmail = async (email, name, otp) => {
      return sendEmail({
        to:[{email,name}],
        subject:"Your verification code -Job Stack",
        htmlContent:otpTemplate("Verify your email",name,otp,
            "Thank you for signing up.please enter your 6-digit code to verify your email address")
      })
   };

//   * register user flow-2 end *


// to send forgot password email otp
 export const forgotpasswordEmail = async (email,name,otp) =>{
    return sendEmail({
        to:[{email,name}],
        subject:"Reset your password - Job Stack",
        htmlContent:otpTemplate("Reset your password",name,otp,
            "You requested to reset your password.Please use the following 6-digit code to proceed"
        )
    })
}

 
