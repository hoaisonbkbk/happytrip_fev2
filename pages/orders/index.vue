<template>
    <div class="p-4">
        <div class="mb-4"> <!-- Changed md-4 to mb-4 -->
            <h3 class="text-2xl font-bold">Danh sách chuyến đi</h3>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý chyến đi</div>
            </div>
            <div class="card-body">

                <div class="relative overflow-x-auto">
                    <div class="flex justify-end mb-4">
                        <button @click="openAddModal"
                            class="inline-flex items-center btn-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition duration-150 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Thêm mới
                        </button>
                    </div>
                </div>
                <!-- Load filter -->
                <FilterModal :cities="cityStore.state.cities" :districtsDepature="districtsDepature"
                    :districtsDestination="districtsDestination" :filter="filter"
                    :services="serviceStore.state.services" @update:filter="handleFilterChange" />
                <div class="py-2"></div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left table table-bordered table-striped table-auto">
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
                        <tbody>
                            <tr v-if="isLoading">
                                <td colspan="12" class="text-center py-4 border-b border-gray-200">Đang tải dữ liệu...</td>
                            </tr>
                            <tr v-else-if="!isLoading && orderStore.state.orders.length === 0">
                                <td colspan="12" class="text-center py-4 border-b border-gray-200">Không có dữ liệu chuyến đi.</td>
                            </tr>
                            <tr v-else v-for="(order, index) in orderStore.state.orders" :key="order.id"
                                class="hover:bg-gray-100"
                                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap">{{
                                    order.short_id }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap">{{
                                    formatDate(order.date_of_destination ?? '') }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap">{{
                                    order.departure?.city }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap">{{
                                    order.destination?.city }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap">{{
                                    order.name_service }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap text-right">{{
                                    formatCurrency(order.price_guest_after || order.price_guest || 0) }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap text-right">{{
                                    formatCurrency(order.price_guest_after || order.price_guest || 0) }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap text-right">{{
                                    formatCurrency(order.net_profit || 0) }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap text-right">{{
                                    formatCurrency(order.price_system || 0) }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap">{{
                                    order.partner?.full_name || "" }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap">{{
                                    order.creator?.user_name || "" }}</td>
                                <td class="px-4 py-2 border-b border-gray-200 w-1/12 whitespace-nowrap">
                                    <span class="px-2 py-1 rounded-md text-xs font-medium" :class="{
                                        'bg-yellow-100 text-yellow-800': order.status_name === 'Chờ tài xế',
                                        'bg-green-100 text-green-800': order.status_name === 'Đã nhận đơn',
                                        'bg-red-100 text-red-800': order.status_name === 'Hủy đơn',
                                        'bg-blue-100 text-blue-800': order.status_name === 'Hoàn thành'
                                    }">{{ order.status_name }}</span>
                                </td>
                                <td class="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                                    <UiButtonDropdown :id="order.id" @viewDetails="viewDetails"
                                        @deleteItem="deleteItem" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="orderStore.state.orders.length > 0">
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
const isLoading = ref(false); // Declare isLoading
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
        await cityStore.GetList(1, 100, "id,name,status", { status: true });
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
onMounted(async () => {
    isLoading.value = true; // Start loading
    try {
        await Promise.all([
            getCityList(),
            fetchService()
        ]);
        await fetchData(); // Fetch data after initial setup
    } catch (error) {
        // Error handling is already inside individual functions
        console.error("Error during component mount:", error);
    } finally {
        isLoading.value = false; // End loading
    }
});
// Sự thay đổi của filter
watch(filter, () => {
    page.value = 1;
    fetchData();
}, { deep: true });

// 
const fetchService = async () => {
    try {
        await serviceStore.GetList(1, 100, "", {}); // Pass empty filter object
    } catch (error: any) {
        $showToast(error.message || 'An error occurred while fetching service', 'error');
    }
}
// Hàm xử lý lấy dữ liệu
const fetchData = async () => {
    isLoading.value = true; // Set loading to true
    try {
        await orderStore.GetList(page.value, limit.value, 'id,name,status', filter.value);
    } catch (error: any) {
        $showToast(error.message, 'error');
    } finally {
        isLoading.value = false; // Set loading to false
    }
}

</script>