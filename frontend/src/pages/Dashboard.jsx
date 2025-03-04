// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import { useGetUserQuery, useLogoutMutation } from "../redux/features/authApi"
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const {data}=useGetUserQuery();
    const user = data.user;
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logout().unwrap(); // .unwrap() will throw an error if request fails
        navigate("/login",{replace: true});
      };
      
    return (
        <div>
            {user.email}
            <motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='mt-4'
			>
                <form onSubmit={handleLogout}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                        font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                        >
                        Logout
                    </motion.button>
                    <Link className='mt-6 block text-center w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                        font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900' to="/forgot-password">Forgot password</Link>
                </form>
			</motion.div>

        </div>
    )
}

export default Dashboard
