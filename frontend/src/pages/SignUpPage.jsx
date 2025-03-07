// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import Input from "../components/Input";
import {Lock, Mail, User} from "lucide-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useSignupMutation } from "../redux/features/authApi";

function SignUpPage() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errors,setErrors] = useState("")
    const navigate = useNavigate()
    const [signup] = useSignupMutation();

    const handleSignUp = async (e) => {
      e.preventDefault();
      const newUser = { name, email, password };
      const result = await signup(newUser);
    
      if (result.error) {
        setErrors(result.error.data.error);
        return; 
      }
      
      console.log(result.data);
      navigate("/verify-email");
    };

    return (
        <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.5}}
        className={`max-w-md w-full bg-gray-800 bg-opacity-50 backrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden`}
        >
            <div className="p-8">
                <h2
                className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text"
                >
                    Create Account 
                </h2>
                <form onSubmit={handleSignUp}>
                    <Input 
                    type="text" 
                    icon={User}
                    placeholder="Full Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />
                    <Input 
                    type="email" 
                    icon={Mail}
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    <Input 
                    type="password" 
                    icon={Lock}
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />

                    {errors && <p className="text-red-500 font-bold">{errors}</p> }

                    {/* Password strength meter */}
                    <PasswordStrengthMeter password={password}/>

                    <motion.button
                    className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    >
                    Sign Up
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
                Already have an account?{" "}
                <Link to={"/login"} className='text-green-400 hover:underline'>
                Login
                </Link>
            </p>
            </div>

        </motion.div>
    )
}

export default SignUpPage
