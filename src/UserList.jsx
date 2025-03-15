import { useEffect } from 'react';
import useUserStore from '@/store';

function UserList() {
    const { users, fetchUsers, hasMore, loading } = useUserStore();

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 10) {
            fetchUsers(); // ✅ Fetch more when user reaches bottom
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // ✅ Cleanup
    }, []);

    return (
        <div className="p-4">
            {users.map((user) => (
                <div key={user.id} className="mb-4 p-4 border-b">
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}

            {loading && (
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                </div>
            )}

            {!hasMore && <p className="text-center text-gray-500">No more users.</p>}
        </div>
    );
}

export default UserList;
