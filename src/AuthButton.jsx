    import useUserStore from "@/store.jsx";

const AuthButton = () => {
    const { isAuthenticated,username, login, logout } = useUserStore();

    return (
        <div className="">
            <h1>
                {isAuthenticated ? (`Welcome ${username}  ✅`) : "Please Login 👤"}
            </h1>
            {isAuthenticated ? (
                <button onClick={logout} className="p-8 m-8 py-2 bg-red-500 text-white rounded">
                    Logout
                </button>
            ) : (
                <button onClick={() => login('Alan')} className="p-8 m-8 py-2 bg-green-500 text-white rounded">
                    Login
                </button>
            )}
        </div>
    );
};

export default AuthButton;
