// "use client";

// import { useState } from "react";
import SignIn from "@/components/SignIn";
// import SignUp from "@/components/SignUp";

function Login() {
  // const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      <div id="sphere" className={`hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gradient-to-r from-white to-gray-200 lg:transition-transform lg:duration-500`}>
        <div className="w-60 h-60 bg-gradient-to-tr from-orange-500 to-yellow-300 rounded-full animate-spin"/>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
      </div>
      <div className={`w-full flex items-center justify-center lg:w-1/2 bg-gray-100`}>
        <SignIn />
      </div>
    </div>
  //   <div className="flex w-full h-[calc(100vh-64px)]">
  //   <div className={`w-full flex items-center justify-center lg:w-1/2 ${isSignUp ? 'lg:translate-x-full' : ''}`}>
  //     {isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <SignIn setIsSignUp={setIsSignUp} />}
  //   </div>
  //   <div id="sphere" className={`hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200 lg:transition-transform lg:duration-500 ${isSignUp ? 'lg:-translate-x-full' : ''}`}>
  //     <div className="w-60 h-60 bg-gradient-to-tr from-orange-500 to-yellow-300 rounded-full animate-spin"/>
  //     <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
  //   </div>
  // </div>
  );
}

export default Login;
