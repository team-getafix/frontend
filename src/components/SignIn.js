export default function SignIn({ setIsSignUp }) {
    return (
        <div className="lg:bg-white duration-300 px-10 py-10  rounded-2xl lg:border-2 border-gray-200">
            <h1 className="text-5xl font-semibold"> Welcome Back!</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Welcome user! Please enter your details.</p>
            <div className="mt-8">
                <div>
                    <label className="text-lg font-medium">Email</label>
                    <input className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent" placeholder="getafix@example.com"></input>
                </div>
                <div>
                    <label className="text-lg font-medium">Password</label>
                    <input className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your password" type='password'></input>
                </div>
                <div className="flex mt-8 justify-between items-center">
                    <div>
                        <input type="checkbox" id='remember'></input>
                        <label htmlFor='remember' className="ml-2 font-medium text-base">Remember me</label>
                    </div>
                    <button className="font-medium text-base text-orange-800">Forgot password</button>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 ease-in-out transition-all bg-orange-500 text-white text-lg rounded-xl py-3 font-bold">Sign in</button>
                </div>
                {/* <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Don't have an account?</p>
                    <button className="text-orange-500 text-base font-medium ml-2" onClick={() => setIsSignUp(true)}>Sign up</button>
                </div> */}
            </div>
        </div>
    );
}