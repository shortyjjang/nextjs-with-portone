import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

const initialState: User = {
  id: "kmr",
  email: "kmr@gmail.com",
  name: "kmr",
  token: "1234567890",
};

const useUser = create<{
  user: User;
  setUser: (user: User) => void;
}>((set) => ({
  user: initialState,
  setUser: (user) => set({ user }),
}));

export default useUser;
