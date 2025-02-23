<template>
    <div class="p-4">
        <div class="md-4">
            <h3 class="text-2xl font-bold">Danh sách chyến đi</h3>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý chyến đi</div>
            </div>
            <div class="card-body">


                <div class="relative overflow-x-auto">
                    <div class="flex flex-row justify-between items-center gap-x-2">
                        <div class="flex flex-row gap-x-2 items-center">
                            <span class="text-sm font-medium">Điểm đón</span>
                            <select name="" id="" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                                <option>Lựa chọn</option>
                            </select>
                        </div>
                        <div class="flex flex-row gap-x-2 items-center">
                            <span class="text-sm font-medium">Quận/Huyện đón</span>
                            <select name="" id="" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                                <option>Lựa chọn</option>
                            </select>
                        </div>
                        <div class="flex flex-row gap-x-2 items-center">
                            <span class="text-sm font-medium">Điểm trả</span>
                            <select name="" id="" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                                <option>Lựa chọn</option>
                            </select>
                        </div>
                        <div class="flex flex-row gap-x-2 items-center">
                            <span class="text-sm font-medium">Quận/Huyện trả</span>
                            <select name="" id="" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                                <option>Lựa chọn</option>
                            </select>
                        </div>
                        <div class="flex flex-row gap-x-2 items-center">
                            <span class="text-sm font-medium">Thời gian</span>
                            <input type="date" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm" />
                        </div>
                        <div class="flex flex-row gap-x-2 items-center">
                            <span class="text-sm font-medium">Từ khóa</span>
                            <input type="text" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm" />
                        </div>


                    </div>

                </div>
                <div class="py-2"></div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left table table-bordered table-striped">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-4 py-2 font-medium">Mã chuyến</th>
                                <th class="px-4 py-2 font-medium">Ngày</th>
                                <th class="px-4 py-2 font-medium">Tỉnh đón</th>
                                <th class="px-4 py-2 font-medium">Tỉnh trả</th>
                                <th class="px-4 py-2 font-medium">Dịch vụ</th>
                                <th class="px-4 py-2 font-medium">Thu khách</th>
                                <th class="px-4 py-2 font-medium">Trả t.xế</th>
                                <th class="px-4 py-2 font-medium">Hoa hồng</th>
                                <th class="px-4 py-2 font-medium">Phí sàn</th>
                                <th class="px-4 py-2 font-medium">Tài xế</th>
                                <th class="px-4 py-2 font-medium">Người tạo</th>
                                <th class="px-4 py-2 font-medium">Trạng thái</th>
                                <th class="px-4 py-2 font-medium">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">

                            <tr class="hover:bg-gray-100" v-for="order in orderStore.state.orders" :key="order.id">
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ order.short_id }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ formatDate(order.date_of_destination) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ order.departure?.city }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ order.destination?.city }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ order.name_service }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ formatCurrency(order.price_guest_after || order.price_guest || 0) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ formatCurrency(order.price_guest_after || order.price_guest || 0) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ formatCurrency(order.net_profit || 0) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12">{{ formatCurrency(order.price_system || 0) }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 ">{{ order.partner?.full_name || "" }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 ">{{ order.creator?.user_name || "" }}</td>
                                <td class="px-4 py-2 border-t border-b border-gray-300 w-1/12 ">
                                    <span class="px-2 py-1 rounded-md" :class="{
                                        'badge bg-yellow-500': order.status_name === 'Chờ tài xế',
                                        'badge bg-green-500': order.status_name === 'Đã nhận đơn',
                                        'badge bg-red-500': order.status_name === 'Hủy đơn',
                                        'badge bg-blue-500': order.status_name === 'Hoàn thành',
                                        'badge bg-gray-500': order.status_name === 5,
                                    }">{{ order.status_name }}</span>
                                </td>

                                <td class="px-4 py-2 border-t border-b border-gray-300">
                                    <UiButtonDropdown :id="order.id" @viewDetails="viewDetails"
                                    @deleteItem="deleteItem" />
                                </td>
                            </tr>

                            
                        </tbody>
                    </table>
                    <DetailModal :itemId="selectedItemId" />
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
import DetailModal from '@/components/order/DetailModal.vue';
definePageMeta({
    layout: "dashboard"
});
const limit = ref(10);
const page = ref(1);
const { $showToast } = useNuxtApp();
const orderStore = useOrder();
const filter = ref({} as IOrderFilter);
const selectedItemId = ref<string | null>(null);
console.log(orderStore.state.orders);
const handlePageChange = (newPage: number) => {
    page.value = newPage;
    fetchData();
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
// Hàm xử lý lấy dữ liệu
const fetchData = async () => {
    try {
        await orderStore.GetList(page.value, limit.value, '', filter.value);
    } catch (error:any) {
        $showToast(error.message, 'error');
    }
}
onMounted(() => {
    fetchData();
});
</script>