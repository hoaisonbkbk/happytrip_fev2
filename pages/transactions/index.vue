<template>
    <div class="p-4">
        <div class="md-4">
            <h3 class="text-2xl font-bold">Danh sách ví tiền</h3>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý ví tiền</div>
            </div>
            <div class="card-body">
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th class="px-4 py-2">ID</th>
                                <th class="px-4 py-2">Họ tên</th>
                                <th class="px-4 py-2">Sđt</th>
                                <th class="px-4 py-2">Số dư</th>
                                <th class="px-4 py-2">Giới hạn</th>
                                <th class="px-4 py-2">Ký quỹ</th>
                                <th class="px-4 py-2">Loại ví</th>
                                <th class="px-4 py-2">Ngày tạo</th>
                                <th class="px-4 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                           {{ transactionStore.state.transactions }}
                        </tbody>
                    </table>
                    <DetailModal :itemId="selectedItemId" />
                    <BasePagination @update:page="handlePageChange" @update:limit="handleLimitChange"
                        v-model:limit="limitSelected" v-model:currentPage="currentPage"
                        :totalPages="transactionStore.state.totalPages" :totalArrayLength="transactionStore.state.transactions.length"
                        :totalRows="transactionStore.state.totalRows" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { TransactionFilter } from '~/models/Transaction';
definePageMeta({
    layout: 'dashboard'
})
const limitSelected = ref(10);
const currentPage = ref(1);
const { $showToast } = useNuxtApp();
const transactionStore = useTransaction();
const selectedItemId = ref<string | null>(null);
const filter = reactive(new TransactionFilter({id:null}));
const fetchData = async () => {
    try {
        await transactionStore.GetList(currentPage.value, limitSelected.value, filter);
    } catch (error: any) {
        $showToast(error?.message || "Lỗi không xác định!", 'error');
    }
}
onMounted(async () => {
    await fetchData();
});
const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchData();
}
const handleLimitChange = (limit: number) => {
    limitSelected.value = limit;
    fetchData();
}
const viewDetails = (id: string) => {
    selectedItemId.value = id;
}
const deleteItem = (id: string) => {
    console.log(`Xóa thành công ${id}`);
    selectedItemId.value = null;
}
</script>