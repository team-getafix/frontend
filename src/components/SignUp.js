export default function SignUp({ setIsSignUp }) {
    return (
        <div className="lg:bg-white duration-300 px-10 py-10 rounded-2xl lg:border-2 border-gray-200">
            <h1 className="text-5xl font-semibold"> Create Account</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Please fill in the details to create an account.</p>
            <div className="mt-8">
                <div>
                    <label className="text-lg font-medium">Username</label>
                    <input className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent" placeholder="getafixUser"></input>
                </div>
                <div>
                    <label className="text-lg font-medium">Password</label>
                    <input className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your password" type='password'></input>
                </div>
                <div>
                    <label className="text-lg font-medium">Confirm Password</label>
                    <input className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent" placeholder="Confirm your password" type='password'></input>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 ease-in-out hover:scale-[1.01] transition-all bg-orange-500 text-white text-lg rounded-xl py-3 font-bold">Sign Up</button>
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Already have an account?</p>
                    <button className="text-orange-500 text-base font-medium ml-2" onClick={() => setIsSignUp(false)}>Sign in</button>
                </div>
            </div>
        </div>
    );
}