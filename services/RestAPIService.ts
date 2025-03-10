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
    const timeout = 30000; // 30 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

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
        const response = await $fetch<T>(url, {
            method,
            headers: headersDefault,
            body: ["POST", "PUT", "PATCH"].includes(method) ? JSON.stringify(options.body) : undefined,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw createError({
                statusCode: 408,
                statusMessage: 'Request timeout'
            });
        }

        // ✅ Kiểm tra lỗi trả về từ API
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response._data || "Lỗi từ máy chủ!",
            }
        }
        // Xử lý lỗi mạng không có response
        throw {
            status: 500,
            message: "Lỗi máy chủ, vui lòng thử lại!"
        }
    }
}