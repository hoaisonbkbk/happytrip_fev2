import { type ITokenInfo } from "~/types/TokenInfo"
import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        tokenInfo: {} as ITokenInfo,
        token: useCookie("auth_partner_token").value || "",
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        setAuthData(tokenInfo: ITokenInfo, token: string) {
            this.tokenInfo = tokenInfo;
            this.token = token;
            useCookie("auth_partner_token").value = token;
            useCookie("auth_partner_account").value = JSON.stringify(tokenInfo);
        }
    },
    persist: true, //  Giữ state sau khi reload trang
});