<template>
    <div class="p-4">
        <div class="md-4">
            <h3 class="text-2xl font-bold">Danh sách chuyến đi</h3>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý chyến đi</div>
            </div>
            <div class="card-body">

                <div class="relative overflow-x-auto">
                    <div class="flex justify-end mb-4">

                        <button @click="openAddModal" class="btn-sm bg-blue-500 text-white px-4 py-2 rounded">Thêm
                            mới</button>
                    </div>
                </div>

                <!-- Load filter -->
                <FilterModal :cities="cityStore.state.cities" :districtsDepature="districtsDepature"
                    :districtsDestination="districtsDestination" :filter="filter"
                    :services="serviceStore.state.services" @update:filter="handleFilterChange" />
                <div class="py-2"></div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left table table-bordered table-striped">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Mã chuyến</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Ngày</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Tỉnh đón</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Tỉnh trả</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Dịch vụ</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Thu khách</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Trả t.xế</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Hoa hồng</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Phí sàn</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Tài xế</th>
                                <th class="px-4 py-2 font-medium whitespace-nowrap">Người tạo</th>
                                <th class="px-4 py-2 font-medium">Trạng thái</th>
                                <th class="px-4 py-2 font-medium">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <tr class="hover:bg-gray-100" v-for="order in orderStore.state.orders" :key="order.id">
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    order.short_id }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    formatDate(order.date_of_destination) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    order.departure?.city }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    order.destination?.city }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    order.name_service }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    formatCurrency(order.price_guest_after || order.price_guest || 0) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    formatCurrency(order.price_guest_after || order.price_guest || 0) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    formatCurrency(order.net_profit || 0) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    formatCurrency(order.price_system || 0) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    order.partner?.full_name || "" }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">{{
                                    order.creator?.user_name || "" }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 whitespace-nowrap">
                                    <span class="px-2 py-1 rounded-md" :class="{
                                        'badge bg-yellow-500': order.status_name === 'Chờ tài xế',
                                        'badge bg-green-500': order.status_name === 'Đã nhận đơn',
                                        'badge bg-red-500': order.status_name === 'Hủy đơn',
                                        'badge bg-blue-500': order.status_name === 'Hoàn thành'

                                    }">{{ order.status_name }}</span>
                                </td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 whitespace-nowrap">
                                    <UiButtonDropdown :id="order.id" @viewDetails="viewDetails"
                                        @deleteItem="deleteItem" />
                                </td>
                            </tr>



                        </tbody>
                    </table>
                    <DetailModal :itemId="selectedItemId" />
                    <OrderAddModal ref="addModalRef" 
                        :cities="cities"  
                        :services = "serviceStore.state.services"
                    />
                    <BasePagination @update:page="handlePageChange" @update:limit="handleLimitChange"
                        v-model:limit="limit" v-model:currentPage="page" :totalPages="orderStore.state.totalPages"
                        :totalArrayLength="orderStore.state.orders.length" :totalRows="orderStore.state.totalRows" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IOrderFilter } from '~/types/Order';
import { useOrder } from '~/composables/useOrder';
import { useService } from '~/composables/useService';

import DetailModal from '@/components/order/DetailModal.vue';
import OrderAddModal from '@/components/order/AddModal.vue';

// Import cityService
import { useCity } from '~/composables/useCity';
import FilterModal from '~/components/order/FilterModal.vue';
import type { IDistrict } from '~/types/District';
import type { ICity } from '~/types/City';

definePageMeta({
    layout: "dashboard"
});
const limit = ref(10);
const page = ref(1);
const { $showToast } = useNuxtApp();
const orderStore = useOrder();
const serviceStore = useService();
const filter = ref({
    order_status: 0,
    city_diemdon: "",
    service_type: "",
    city_diemden: "",
    district_depature: "",
    district_destination: ""
} as IOrderFilter);


const selectedItemId = ref<string | null>(null);
const districtsDepature = ref<IDistrict[]>([]);
const districtsDestination = ref<IDistrict[]>([]);
const addModalRef = ref<InstanceType<typeof OrderAddModal> | null>(null);
const cities = ref<ICity[]>([]);
// Declare city lists and city service
const cityStore = useCity();
const handlePageChange = (newPage: number) => {
    page.value = newPage;
    fetchData();
}

const handleFilterChange = async () => {
    await fetchData();
}
const viewDetails = (id: string) => {
    selectedItemId.value = id;
}
const deleteItem = (id: string) => {
    console.log(id);
}
const handleLimitChange = (newLimit: number) => {
    limit.value = newLimit;
    fetchData();
}
const openAddModal = () => {
    if (addModalRef.value && cities.value.length > 0) {
        addModalRef.value.open();
        console.log('cities', cities.value);
    }
}



// Function to get city list
const getCityList = async () => {
    try {
        await cityStore.GetList(1, 100, "id,name,status", { status: true, id: null });
        cities.value = cityStore.state.cities;
    } catch (error: any) {
        console.error('Error fetching cities:', error);
        $showToast(error.message, 'error');
    }
}

// Lấy thông tin chi tiết của thành phố
async function getDistrictsByCity(cityId: string, targetType: string) {
    try {
        // Lấy chi tiết của thành phố
        await cityStore.GetDetail(cityId);
        if (targetType === 'depature') {
            districtsDepature.value = cityStore.state.cityDetail?.districts || [];
        } else {
            districtsDestination.value = cityStore.state.cityDetail?.districts || [];
        }
    } catch (error: any) {
        console.error('Error fetching districts:', error);
        $showToast(error.message, 'error');
    }
}

watch([
    () => filter.value.city_diemdon,
    () => filter.value.city_diemden
], ([newCityDiemdon, newCityDiemden], [oldCityDiemdon, oldCityDiemden]) => {
    // Check which city changed and fetch districts accordingly
    if (newCityDiemdon !== oldCityDiemdon) {
        if (newCityDiemdon) {
            getDistrictsByCity(newCityDiemdon, 'depature');
        } else {
            districtsDepature.value = [];
        }
    }

    if (newCityDiemden !== oldCityDiemden) {
        if (newCityDiemden) {
            getDistrictsByCity(newCityDiemden, 'destination');
        } else {
            districtsDestination.value = [];
        }
    }
});

// Call getCityList on component mount
onMounted(() => {
    getCityList();
    fetchData();
    fetchService();
});
// Sự thay đổi của filter
watch(filter, () => {
    page.value = 1;
    fetchData();
}, { deep: true });

// 
const fetchService = async () => {
    try {
        await serviceStore.GetList(1, 100, "", { id: null });
    } catch (error: any) {
        $showToast(error.message || 'An error occurred while fetching service', 'error');
    }
}
// Hàm xử lý lấy dữ liệu
const fetchData = async () => {
    try {
        await orderStore.GetList(page.value, limit.value, 'id,name,status', filter.value);
    } catch (error: any) {
        $showToast(error.message, 'error');
    }
}

</script>