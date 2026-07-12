
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import sendVerificationEmail from "../services/emailService.js";


// register user start
const registerUser = async (req, res) => {

    // * register flow - 1 *
    //      -data(name,enail,password,role) from post request
    //      -if user already exist return response
    //      -hash the password
    //      -generate otp
    //      -create data in database
    //      -call sendVerificationEmail function -data will send - name,email,verificationOtp

    try {
        
    const {name, email, password,role} = req.body;
    
    // check if user already exists
    const userExist = await userModel.findOne({email});
  
    if(userExist){
       return res.status(400).json({
        success: false,
        message: "User already exists"
    });
    }
    
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const userRole = role ||"user";
   
      
    //to generate 6-digit otp
        const verificationOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationOtpExpiry = Date.now() + 10 * 60 * 1000; 
       
        const user = await userModel.create({
            name,
            email,
            password: hashPassword,
            role: userRole,
            verificationOtp: verificationOtp,
            verificationOtpExpiry: verificationOtpExpiry,
            isVerified:false
        })

        
        //  * register flow-2 start*
        //  -we will call sendVerificationEmail() function and will pass data on it -name,email,Option
        //  -now it will  got to sendVerificationEmail() function in emailService.js
        //  -sendVerificationEmail() returns sendEmail() function, and pass data (name,email,otp)
        //  -then sendEmail() function calls otpTemplate() function gets htmlContent then
        //  -now sendEmail() functions pass the data -email,subject,htmlContent 
        //  - and finally Brevo  gets post request and verify all data then send otp to user email
         
         //to send verification email 
        try {
            await sendVerificationEmail(email,name,verificationOtp);

        } 
        catch (error) {
            console.error("failed to send verification email:",error);
        }

        res.status(201).json({
            success:true,
            message:"Account created successfully! Please check your email for 6-digit verification code",
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                isVerified:false

            }
        });

        // * register flow-2 start*
      }

    catch (error) {
        return res.status(500).json({
         success:false,
        message:error.message
        })
      }

  }
  
// register user end

export default {registerUser};  