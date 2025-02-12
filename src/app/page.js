"use client";

import { useState } from 'react';
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className={`w-full flex items-center justify-center lg:w-1/2 lg:transition-transform lg:duration-500 ${isSignUp ? 'lg:translate-x-full' : ''}`}>
        {isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <SignIn setIsSignUp={setIsSignUp} />}
      </div>
      <div id="sphere" className={`hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200 lg:transition-transform lg:duration-500 ${isSignUp ? 'lg:-translate-x-full' : ''}`}>
        <div className="w-60 h-60 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-full animate-spin"/>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
      </div>
    </div>
  );
}

export default App;