import type { IPartner } from '~/types/Partner';
import { type ITokenInfo } from './../types/TokenInfo';

// Viết composables useAuth
// Kiểm tra code composable useAuth
// 1. Code có thiếu gì không?
// 2. Code có lỗi gì không?
// 3. Code có thể tối ưu được không?
// 4. Code có thể dễ hiểu hơn không?
// 5. Code có thể test được không?

export const useAuth = () => {
    const stateAuth = reactive({
        isAuthenticated: false,
        TokenInfo: {} as ITokenInfo
    });
    const { restApi } = useApi();
    // Function đăng nhập
    const login = async (partner: IPartner) => {
        // Kiểm tra thông tin đăng nhập
        if (!partner.phone || !partner.password) {
            throw new Error('Vui lòng nhập đầy đủ thông tin đăng nhập.');
        }
        // Trường hợp đầy đủ thông tin thì gọi đến API

        try {
            const data = await restApi<ITokenInfo>('/partner/login', 'POST', {
                body: partner,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(data);
            if (data.error) {
                throw new Error(data.error);
            }
            // Giá trị stateAuth dùng cho phep truy cập
            stateAuth.isAuthenticated = true
            stateAuth.TokenInfo = data.value || {}
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Đăng nhập thất bại.');
        }
    }
    
    return {
        stateAuth,
        login
        
    }
}

