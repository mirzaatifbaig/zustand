import {create} from "zustand";


const useUserStore = create((set,get) => ({
        users: [],
        loading: false,

        fetchUsers: async () => {
            set({loading: true})

            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            set({users: data, loading: false});
        },
         totalUsers: () => get().users.length,
        removeUser: (userId) => {
            const filteredUserList = get().users.filter((user) => user.id !== userId);
            set({users: filteredUserList});
        }
    })
);
export default useUserStore