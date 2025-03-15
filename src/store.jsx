import {create} from "zustand";
import {toast} from 'sonner' // ✅ Shadcn Toast Import

const useUserStore = create((setState, getState) => ({

    // ✅ Initial State
    count: 0,
    username: 'Guest',
    users: [],
    page: 1, // ✅ Start from page 1
    hasMore: true, // ✅ Fixed: Infinite Scroll Works
    loading: false,
    isAuthenticated: false,

    // ✅ Authentication
    login: (username) => {
        setState({isAuthenticated: true, username});
        toast.success(`✅ Logged in as ${username}`);
    },
    logout: () => {
        setState({isAuthenticated: false, username: 'Guest'});
        toast.error('❌ Logged Out');
    },

    // ✅ Counter
    increase: () => setState((state) => ({count: state.count + 1})),
    decrease: () => setState((state) => ({count: state.count - 1})),
    reset: () => setState({count: 0}),

    // ✅ Set Username
    setUsername: (newUsername) => {
        setState(() => ({username: newUsername || 'Guest'}));
    },

    // ✅ Fetch Users (with Infinite Scroll and No Duplicate Fetch)
    fetchUsers: async () => {
        if (useUserStore.getState().loading) return;

        setState({ loading: true });

        const page = useUserStore.getState().page;
        const response = await fetch(`https://randomuser.me/api/?results=20&page=${page}`);
        const data = await response.json();

        const currentUsers = useUserStore.getState().users || [];

        const newUsers = data.results.map((user) => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            avatar: user.picture.thumbnail,
        }));

        setState({
            users: [...currentUsers, ...newUsers],
            page: page + 1,
            hasMore: data.results.length > 0,
            loading: false,
        });
    },

    // ✅ Modal Handling
    isModalOpen: false,
    openModal: () => setState({isModalOpen: true}),
    closeModal: () => setState({isModalOpen: false}),

    // ✅ Dark Mode Handling
    isDarkMode: false,
    toggleDarkMode: () => setState((state) => ({isDarkMode: !state.isDarkMode})),
}));

export default useUserStore;
