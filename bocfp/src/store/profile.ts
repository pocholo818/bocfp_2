import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
    state: () => ({ user_id: "0", fname: "" }),
    actions: {
        setProfile(user_id: string, fname: string) {
            this.user_id = user_id;
            this.fname = fname;
        },
    },
})