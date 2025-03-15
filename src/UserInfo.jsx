import useUserStore from "./store.jsx";

function UserInfo() {
    const {username} = useUserStore();
    return(
        <div className="mt-8 ">
            <h2 className="text-2xl font-semibold">Current User: {username}</h2>
        </div>
    )
}
export default UserInfo;