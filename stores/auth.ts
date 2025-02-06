import { type ITokenInfo } from "~/types/TokenInfo"
import { defineStore } from "pinia";
import login from "~/server/api/partner/login";

export const useAuthStore = defineStore('auth', () => {
    state: () => ({
        tokenInfo: {} as ITokenInfo,
        token: "",
    }),
        getters: {
        isAuthenticated: (state) => !!state.accessToken
    },
    actions: {
        async login(partner: IPartner) {
            try {
                const data = await login(partner);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    },
    persist: true, // Tự động lưu vào localStorage
});