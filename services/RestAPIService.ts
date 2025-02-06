export const RestApi = async <T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
    options: {
        body?: any;
        params?: Record<string, string | number>;
        query?: Record<string, any>;
        headers?: Record<string, string>;
    } = {}
): Promise<T> => {
    try {
        // Lấy URL base từ config runtime (nuxt.config.js)
        const config = useRuntimeConfig();
        // Kiểm tra và thêm header Content-Type nếu cần
        const headersDefault = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // Xử lý đường dẫn có tham số (/:id, /:userId)
        let url = `${config.public.apiBase}${endpoint}`;
        if (options.params) {
            Object.keys(options.params).forEach((key) => {
                url = url.replace(`:${key}`, String(options.params?.[key]));
            });
        }

        // Thêm query params (nếu có)
        const queryString = options.query
            ? "?" + new URLSearchParams(options.query).toString()
            : "";
        url += queryString;

        // Thực hiện gọi API
        return await $fetch<T>(url, {
            method,
            headers: headersDefault,
            body: ["POST", "PUT", "PATCH"].includes(method) ? JSON.stringify(options.body) : undefined,
        });
    } catch (error: any) {
        console.error("API Error:", error);
        throw error;
    }
}