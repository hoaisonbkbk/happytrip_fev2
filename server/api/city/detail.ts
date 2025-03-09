import CityService from "~/services/CityService";
import { useApiHandler } from "~/composables/useApiHandler";

export default defineEventHandler(async (event) => {
    const { getAuthHeaders, handleError } = useApiHandler();

    try {
        const { id } = getQuery(event);
        const accessToken = getHeader(event, 'Authorization');

        if (!accessToken) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized - Missing access token'
            });
        }

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing city ID'
            });
        }

        const headers = getAuthHeaders(accessToken);
        const cityDetail = await CityService.DetailById(id as string, headers);

        if (!cityDetail) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Không tìm thấy thành phố'
            });
        }

        return cityDetail;
    } catch (error: any) {
        handleError(error);
    }
});
