import { create } from "zustand";
const api = 'https://67d862da00348dd3e2a74f5e.mockapi.io/users/user';

const useUserStore = create((set, get) => ({
    users: [],
    loading: false,
    page: 1,
    totalPages: 1,
    limit: 10,

    fetchUsers: async () => {
        const {page, limit} = get();
        set({loading: true})
        try
        {
            const response = await fetch(`${api}?page=${page}&limit=${limit}`);
            const data = await response.json()
            set({
                users: data,
                loading: false,
                totalPages: 5,
            })
        }
        catch (e) {
            console.error(e)
            set({loading: false})
        }
    },
    nextPage: () => {
            if(get().page < get().totalPages) {
                set({page: get().page + 1})
                get().fetchUsers();
            }
    },
    previousPage: () => {
        if(get().page > 1) {
            set({page: get().page - 1})
            get().fetchUsers();
        }
    }
}));

export default useUserStore;
