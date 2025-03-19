import {create} from "zustand";
import {combine} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

const createSelectors = (store) => {
    return Object.keys(store.getState()).reduce((acc, key) => {
        acc[key] = () => store((state) => state[key]);
        return acc;
    }, {});
};

const loginStore = create(
    immer(
        combine(
            {
                user: null,
                error: null,
                users: [],
                loading: false,
            },
            (set, get) => ({
                login: (username, password) => {
                    const {users} = get();

                    if (!users.length) {
                        console.error("Users not loaded. Fetch users first.");
                        return;
                    }
                    const mockUsers = [
                        {username: 'admin', password: 'testpass'}, {username: 'user', password: 'testpass'}]
                    const foundUser = mockUsers.find(user => user.username === username && user.password === password);

                    if (foundUser) {
                        set({user: foundUser});
                        console.log("Login successful!", foundUser);
                    } else {
                        console.error("Invalid credentials");
                    }
                },

                logout: () => set((state) => {
                    state.user = null;
                }),

                fetchUsers: async () => {
                    set((state) => {
                        state.loading = true;
                    });

                    try {
                        const response = await fetch("https://67d862da00348dd3e2a74f5e.mockapi.io/users/user");
                        const data = await response.json();
                        set((state) => {
                            state.users = data;
                            state.loading = false;
                        });
                    } catch (error) {
                        console.log(error);
                        set((state) => {
                            state.loading = false;
                        });
                    }
                },
            })
        )
    )
);

export const loginSelectorStore = createSelectors(loginStore);
export default loginStore;
