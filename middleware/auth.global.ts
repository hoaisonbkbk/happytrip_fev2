export default defineNuxtRouteMiddleware((to, from) => {
    // Middleware áp dụng cho toàn bộ trang của hệ thống. Nó không gán được vào layout, chỉ gán được page hoặc gán tổng
    const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
    // Trường hợp không có token nào mà vào lại trang login thì chuyen huong ve trang dăng ký
    if ((!accessToken || accessToken === "" || accessToken === undefined) && to.path !== '/login') {
        return navigateTo('/login', { replace: true });
    }
    
    // Trường hợp có token mà vào lại trang login thì chuyen huong ve trang chủ
    if (accessToken && accessToken !== undefined && accessToken !== "" && to.path === '/login') {
        return navigateTo('/', { replace: true });
    }
});
