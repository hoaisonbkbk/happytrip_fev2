import { type ITokenInfo } from "~/types/TokenInfo"
import { defineStore } from "pinia";
import type { IPartner } from "~/types/Partner";
import { RestApi } from "~/services/RestAPIService";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        tokenInfo: {} as ITokenInfo,
        accessToken: "",
    }),
    getters: {
        isAuthenticated: (state) => !!state.accessToken
    },
    actions: {
        async Login(partner: IPartner) {
            try {
                const data = await RestApi<ITokenInfo>('/api/partner/login', 'POST', {
                    body: partner,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if(data?.error) {
                    throw new Error(data?.error);
                }
                this.tokenInfo = data || {};
                this.accessToken = this.tokenInfo.AccessToken || "";
                // Lưu thông tin vào cookie để sử dụng
                useCookie("auth_token").value = this.accessToken;
                useCookie("account").value = JSON.stringify(this.tokenInfo);

            } catch (error) {
                console.error(error);
            }
        }
    },
    persist: true, // Tự động lưu vào localStorage
});