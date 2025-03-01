import type { ICity, ICityFilter, IListCity } from "~/types/City";
import type { IDistrict } from "~/types/District";

export const useCity = () => {
    const state = reactive({
        cities: [] as ICity[],
        isLoading: false,
        totalRows: 0,
        page: 1,
        limit: 10,
        cityDetail: {} as ICity,
        districtsDepature: [] as IDistrict[],
        districtsDestination: [] as IDistrict[]
    });
    const GetList = async (page: number, limit: number, fields: string, filter: Partial<ICityFilter>) => {
        state.isLoading = true

        try {
            // Đọc thông tin access token từ cookies
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            // Gọi qua service/api 
            const response = await $fetch<IListCity>('/api/city', {
                method: 'POST',
                body: filter,
                query: {
                    page: page,
                    limit: limit,
                    sort_by: 'name_desc',
                    fields: "id,name,status,districts"
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response) {
                throw {
                    status: 400,

                    message: "Không tìm thấy dữ liệu"
                }
            }

            // Lấy được dữ liệu
            state.cities = response || [];
            state.totalRows = response.pagination?.count || 1;
            state.isLoading = false;
            state.page = page;
            state.limit = limit;

        } catch (error: any) {
            state.isLoading = false
            throw {
                status: error.status || 500,
                message: error.message || "Lỗi không xác định!"
            };
        }
    }
    const FixDistrict = (city: ICity) => {
        if (!city.districts || city.districts.length === 0) {
            return {
                count: 0,
                name: ''
            }
        }
        return {
            count: city.districts.length,
            name: city.districts.map(district => district.name).join(', ')
        }
    }
    // Hàm xử lý trạng thái
    const FixStatus = (status: boolean) => {
        if (status === null) return 'Không xác định';
        if (status) return 'Hoạt động';
        return 'Không hoạt động';
    }

    const GetDetail = async (id: string) => {
        state.isLoading = true;
        try {
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            const response = await $fetch<ICity>('/api/city/detail', {
                method: 'GET',
                query: {
                    id: id
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }

            });
            if (!response) {
                throw {
                    status: 400,
                    message: "Không tìm thấy dữ liệu"
                }
            }
            state.cityDetail = response;
            state.isLoading = false;
        } catch (error: any) {
            state.isLoading = false;
            
            throw {
                status: error.status || 500,
                message: error.message || "Lỗi không xác định!"
            }
        }
    }

    
    return { state, GetList, FixDistrict, FixStatus, GetDetail }

}