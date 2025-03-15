import {create,} from "zustand";
import {toast} from 'sonner'
const useUserStore = create((setState) => ({

        count: 0,
        username: 'Guest',
        users: [],
        page: 0,
        hasMore: false,
        loading: false,


        isAuthenticated: false,
        login: (username) => {
            setState({isAuthenticated: true, username: username})
            toast.success(`✅ Logged in as ${username}`)
        },
        logout: () => {
            setState({isAuthenticated: false, username: 'Guest'})
            toast.error('❌ Logged Out')
        },

        increase: () => setState((state) => ({count: state.count + 1})),
        decrease: () => setState((state) => ({count: state.count - 1})),
        reset: () => setState({count: 0}),

        setUsername: (newUsername) => setState(() => ({username: newUsername || 'Guest'})),
    fetchUsers: async () => {
        if (useUserStore.getState().loading) return; // ✅ Prevent double fetch

        setState({ loading: true }); // ✅ Zustand's setState function

        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${useUserStore.getState().page}&_limit=20`);
        const data = await response.json();

        const currentUsers = useUserStore.getState().users || []; // ✅ Fix for undefined

        // ✅ Remove duplicates by filtering unique IDs
        const mergedUsers = [...currentUsers, ...data].filter(
            (user, index, self) =>
                index === self.findIndex((u) => u.id === user.id) // ✅ Filter by unique user.id
        );

        if (data.length === 0) {
            setState({ hasMore: false }); // ✅ No more data
        } else {
            setState({
                users: mergedUsers, // ✅ No duplicates now
                page: useUserStore.getState().page + 1,
                loading: false,
            });
        }
    },

        isModalOpen: false,
        openModal: () => setState({isModalOpen: true}),
        closeModal: () => setState({isModalOpen: false}),
        isDarkMode: false,
        toggleDarkMode: () => setState((state) => ({isDarkMode: !state.isDarkMode})),
    })
)
export default useUserStore;