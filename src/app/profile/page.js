"use client";

export default function ProfileView() {

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = "/login";
        });
        
    }

    return (
        <form onSubmit={ (e) => { handleSignOut() }}>
            <button type="submit">
                Sign out
                
            </button>
        </form>
    )
}