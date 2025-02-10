<template>
    <div class="p-4">
        <div class="mb-4">
            <h3 class="text-2xl font-bold">Danh sách hãng xe</h3>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý hãng xe</div>
            </div>
            <div class="card-body">
                <!-- Bảng dữ liệu -->
                <div class="relative overflow-x-auto">
                    <!-- Loading -->
                    <div v-if="transportStore.state.isLoading" class="text-center py-4">
                        Đang tải...
                    </div>
                    <div v-else class="table-responsive">
                        <table class="w-full text-sm text-left table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2" style="width:200px">Mã hãng</th>
                                    <th class="px-4 py-2" style="width:70px">Tên hãng</th>
                                    <th class="px-4 py-2">Danh sách xe</th>
                                    <th class="px-4 py-2" style="width:100px">S.lượng</th>
                                    <th class="px-4 py-2">Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="transport in transportStore.state.transports || []" :key="transport.id">
                                    <td class="px-4 py-2">{{ transport.short_id }}</td>
                                    <td class="px-4 py-2">{{ transport.hang_xe }}</td>
                                    <td class="px-4 py-2">
                                        {{ transportStore.FixTenXe(transport).name }}
                                    </td>
                                    <td class="px-4 py-2">
                                        {{ transportStore.FixTenXe(transport).count }}
                                    </td>
                                    <td class="px-4 py-2">
                                        <!-- Dropdown menu -->
                                        <div class="dropdown">
                                            <button class="btn btn-outline-primary btn-sm dropdown-toggle" type="button"
                                                @click="toggleDropdown(transport.id)"
                                                :aria-expanded="openDropdown === transport.id">
                                                Hành động
                                            </button>
                                            <ul class="dropdown-menu show" v-if="openDropdown === transport.id">
                                                <li>
                                                    <a class="dropdown-item" href="#"
                                                        @click.prevent="viewDetails(transport.id)">
                                                        Xem chi tiết
                                                    </a>
                                                </li>

                                                <li>
                                                    <a class="dropdown-item text-danger" href="#"
                                                        @click.prevent="deleteItem(transport.id)">
                                                        Xóa
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Chi tiết xe -->
                                <!-- Hiển thị danh sách chi tiết ngay bên dưới -->
                                <template v-for="item in transportStore.state.transports" :key="'details-' + item.id">
                                    <tr v-if="expandedRows.includes(item.id)">
                                        <td colspan="3">
                                            <DetailList :ten_xe="item.ten_xe" />
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <!-- <DetailModal ref="modalRef" :item-id="selectedItemId" /> -->
                        <TransportDetailModal :item-id="selectedItemId" />
                        <BasePagination @update:page="handlePageChange" @update:limit="handleLimitChange"
                            v-model:limit="limitSelected" v-model:currentPage="currentPage"
                            :totalPages="transportStore.state.totalPages"
                            :totalArrayLength="transportStore.state.transports.length"
                            :totalRows="transportStore.state.totalRows" />
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { ITransportSystemFilter } from '~/types/TransportSystem';
import DetailList from '~/components/transportsystem/DetailList.vue';



// Sử dụng layout dashboard
definePageMeta({
    layout: 'dashboard'
})
// Sử dụng head
useHead({
    title: 'Quản lý hãng xe - Happytrip Admin'
})
// Khai báo trước bộ lọc
const transportStore = useTransportSystem();
const currentPage = ref(1);
const limitSelected = ref(10);
const filter = ref({} as ITransportSystemFilter);
const { $showToast } = useNuxtApp();
const expandedRows = ref<string[]>([]);

//--
const openDropdown = ref(null);
const selectedItemId = ref<string | null>(null);



// Sự kiện thay đổi limit
const handleLimitChange = (limit: number) => {
    limitSelected.value = limit;
    fetchData();
}

// Thay đổi page
const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchData();
}
// Hàm con xử lý lấy danh sách hãng xe


const fetchData = async () => {
    try {
        await transportStore.getList(
            currentPage.value,
            limitSelected.value,
            'hang_xe,id,ten_xe,short_id', filter.value);
    } catch (error: any) {
        console.error(error);
        $showToast(error.message || "Lỗi không xác định!", "error");
    }
}

// Lấy dữ liệu lần đầu khi load trang
onMounted(() => {
    currentPage.value = 1;
    limitSelected.value = 10;
    fetchData();
});

// Toggle dropdown menu
const toggleDropdown = (id: string) => {
    if (openDropdown.value === id) {
        openDropdown.value = null; // Đóng dropdown
    } else {
        openDropdown.value = id; // Mở dropdown
    }
};

// Xử lý khi chọn "Xem chi tiết"
const viewDetails = (id: string) => {
    selectedItemId.value = id;
    
};


// Xử lý khi chọn "Xóa"
const deleteItem = (id: string) => {
    console.log(id);
    openDropdown.value = null;
};


</script>
