export function useApi() {
    // Đọc cấu hình configuration
    const config = useRuntimeConfig();
    const authToken = useCookie('authToken'); // Token trên cookie nếu có
    // Cấu hình header mặc định
    const defaultHeaders = {
        Authorization: `Bearer ${authToken.value}`,
        'Content-Type': 'application/json'
    }

    // Function gọi API
    async function restApi<T>(
        endpoint: string,
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
        options: {
            body?: any;
            params?: Record<string, string | number>;
            query?: Record<string, any>;
            headers?: Record<string, string>;
        } = {}
    ): Promise<T> {
        try {
            // Ghép Header mặc định + Header override
            const headers = { ...defaultHeaders, ...options.headers };

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
                headers,
                body: ["POST", "PUT", "PATCH"].includes(method) ? JSON.stringify(options.body) : undefined,
            });
        } catch (error: any) {
            console.error("API Error:", error);
            throw error;
        }
    }
    return {
        restApi
    }
}