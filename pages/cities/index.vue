<template>
    <div class="p-4">
        <div class="mb-4">
            <h3 class="text-2xl font-bold">Danh sách thành phố</h3>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý thành phố</div>
            </div>
            <div class="card-body">
                <!-- Bảng dữ liệu -->
                <div class="relative overflow-x-auto">
                    <!-- Loading -->
                    <div v-if="cityStore.state.isLoading" class="text-center py-4">
                        Đang tải...
                    </div>
                    <div v-else class="table-responsive">
                        <table class="w-full text-sm text-left table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2" style="width:200px">Tên thành phố</th>
                                    <th class="px-4 py-2" style="width:70px">S/lượng</th>
                                    <th class="px-4 py-2">Danh sách huyện</th>
                                    <th class="px-4 py-2" style="width:150px">Trạng thái</th>

                                    <th class="px-4 py-2" style="width:150px">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="city in cityStore.state.cities" :key="city.id">
                                    <td class="px-4 py-2">{{ city.name }}</td>
                                    <td class="px-4 py-2">{{ cityStore.FixDistrict(city).count }}</td>
                                    <td class="px-4 py-2">{{ cityStore.FixDistrict(city).name }}</td>
                                    <td class="px-4 py-2">{{ cityStore.FixStatus(city.status) }}</td>
                                    <td class="px-4 py-2">
                                      <!-- Slot button dropdown-->
                                        <ButtonDropdown 
                                            :id="city.id" 
                                            @viewDetails="viewDetails" 
                                            @deleteItem="deleteItem" />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <DetailModal :item-id="selectedItemId" />
                        <BasePagination @update:page="handlePageChange" @update:limit="handleLimitChange"
                            v-model:limit="limitSelected" v-model:currentPage="currentPage" :totalPages="totalPages"
                            :totalArrayLength="cityStore.state.cities.length" :totalRows="cityStore.state.totalRows" />
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import type { ICityFilter } from "~/types/City";
import DetailModal from "~/components/city/DetailModal.vue";
import ButtonDropdown from "~/components/ui/ButtonDropdown.vue";
const cityStore = useCity();
const currentPage = ref(1);
const limitSelected = ref(10);
const filter = ref({} as ICityFilter);
const selectedItemId = ref<string | null>(null);

// Sử dụng layout dashboard
definePageMeta({
    layout: "dashboard"
});

const {$showToat} = useNuxtApp();
// Tính tổng số trang
const totalPages = computed(() => {
    return Math.ceil(cityStore.state.totalRows / limitSelected.value);
});

// Hàm xử lý khi chọn số lượng hiển thị
const handleLimitChange = async (limit: number) => {
    if (limit < 1 || limit > 100) limit = 100;
    limitSelected.value = limit;
    await fetchData();
}

// Hàm xử lý khi chuyển trang
const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    await fetchData();
};

// Hàm lấy dữ liệu
const fetchData = async () => {
    try {
        await cityStore.GetList(
            currentPage.value,
            limitSelected.value,
            'id,name,code,districts,status', // Các trường cần lấy
            filter.value
        );
    } catch (error: any) {
        // Xử lý lỗi (có thể dùng toast hoặc alert)
        console.error('Lỗi:', error.message);
        $showToast(error.message, 'error');
    }
};

// Watch để theo dõi thay đổi của filter
watch(filter, () => {
    currentPage.value = 1; // Reset về trang 1 khi filter thay đổi
    fetchData();
}, { deep: true });

// Lấy dữ liệu lần đầu khi component được mount
onMounted(() => {
    fetchData();
});


// Xử lý khi chọn "Xem chi tiết"
const viewDetails = (id: string) => {
    selectedItemId.value = id;
    
};


// Xử lý khi chọn "Xóa"
const deleteItem = (id: string) => {
    console.log(id);
};
</script>