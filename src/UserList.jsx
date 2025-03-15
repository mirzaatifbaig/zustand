import useUserStore from "@/store.jsx";
import { useEffect, useRef, useCallback } from "react";

function UserList() {
    const { users, fetchUsers, loading, hasMore } = useUserStore();

    // ✅ Infinite Scroll Observer
    const observer = useRef();

    const lastUserRef = useCallback(
        (node) => {
            if (loading) return; // ✅ Prevent fetching during loading

            if (observer.current) observer.current.disconnect(); // ✅ Disconnect old observer

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchUsers(); // ✅ Fetch next page when last element is visible
                }
            });

            if (node) observer.current.observe(node); // ✅ Observe the last element
        },
        [loading, hasMore] // ✅ Dependency Array
    );

    useEffect(() => {
        fetchUsers(); // ✅ Fetch first page on mount
    }, []);

    return (
        <div className=" dark:text-white border-white dark:border-white p-4">
            {users.map((user, index) => (
                <div
                    key={user.id}
                    ref={index === users.length - 1 ? lastUserRef : null} // ✅ Observe Last Element
                    className="p-4 dark:bg-black dark:border-[0.1px] dark:text-gray-500  dark:border-gray-600 bg-white shadow rounded mb-4"
                >
                    <h2 className="text-xl dark:text-white dark:border-white font-semibold">{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
            {loading && (
                <div className="animate-pulse space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    ))}
                </div>
            )}
            {!hasMore && <p className="text-center mt-4 text-gray-500">✅ No More Users</p>}

        </div>
    );
}

export default UserList;
