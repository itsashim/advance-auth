import { Routes,Route } from "react-router-dom"
import FloatingShape from "./components/FloatingShape"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerification from "./pages/EmailVerification"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import RedirectIfLogin from "./components/RedirectIfLogin"


function App() {


  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center relative overflow-hidden">
        <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delfay={0}/>
        <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delfay={0}/>
        <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delfay={0}/>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/signup" element={<RedirectIfLogin><SignUpPage/></RedirectIfLogin>}/>
          <Route path="/login" element={<RedirectIfLogin><LoginPage/></RedirectIfLogin>}/>
          <Route path="/verify-email" element={<EmailVerification/>}/>
        </Routes>
      </div>
    
  )
}

export default App
