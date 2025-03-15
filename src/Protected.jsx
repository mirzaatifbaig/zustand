import useUserStore from "@/store.jsx";

function Protected() {
    const { username } = useUserStore();

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">🔥 This is a Protected Page 🔥</h1>
            <h2 className="text-xl">Welcome, {username} ✅</h2>
        </div>
    );
}

export default Protected;