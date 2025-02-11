import type { IPartner } from '~/types/Partner';
import { type ITokenInfo } from '~/types/TokenInfo';
import AuthService from '~/services/AuthService';
import { useAuthStore } from '~/stores/auth';
import { useNuxtApp } from '#app';
// Viết composables useAuth
// Kiểm tra code composable useAuth
// 1. Code có thiếu gì không?
// 2. Code có lỗi gì không?
// 3. Code có thể tối ưu được không?
// 4. Code có thể dễ hiểu hơn không?
// 5. Code có thể test được không?

export const useAuth = () => {

    const authStore = useAuthStore();
    const { $showToast } = useNuxtApp();
    // Function đăng nhập
    const login = async (partner: IPartner) => {
        // Kiểm tra thông tin đăng nhập
        if (!partner.phone || !partner.password) {
            $showToast("Vui lòng nhập số điện thoại và mật khẩu", "error");
            return;
        }
        // Trường hợp đầy đủ thông tin thì gọi đến API
        try {

            const data = await AuthService.Login(partner);
            if (!data || !data.accessToken) {
                $showToast("Dữ liệu không hợp lệ", "error");
                return;
            }
            // Lưu vào stores để sử dụng lâu dài
            $showToast("Đăng nhập thành công. Chờ chuyển hướng..", "success");
            authStore.setAuthData(data, data.accessToken || "");
        } catch (error: any) {
            
            $showToast(error.message, "error");
            return;
        }
    }

    return {
        login
    }
}

