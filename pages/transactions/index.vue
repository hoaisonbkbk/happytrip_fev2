<template>
    <div class="p-4">
        <div class="md-4">
            <h3 class="text-2xl font-bold">Danh sách giao dịch</h3>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý giao dịch</div>
            </div>
            <div class="card-body">
                <div v-if="transactionStore.state.isLoading" class="md-4">
                    Đang tải...
                </div>
                <div v-else class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th class="px-4 py-2">Số tiền</th>
                                <th class="px-4 py-2">Mã giao dịch</th>
                                <th class="px-4 py-2">Trạng thái</th>
                                <th class="px-4 py-2">Số điện thoại</th>
                                <th class="px-4 py-2">Số dư trước</th>
                                <th class="px-4 py-2">Số dư sau</th>

                                <th class="px-4 py-2">Mô tả</th>
                                <th class="px-4 py-2">Khởi tạo</th>
                                <th class="px-4 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="transaction in transactionStore.state.transactions" :key="transaction.id">
                                <td>{{ formatCurrency(transaction.amount || 0) }}</td>
                                <td>{{ transaction.code }}</td>
                                <td>{{ transaction.status_value }}</td>
                                <td>{{ transaction.user_receiving.user_phone }}</td>
                                <td>{{ formatCurrency(transaction.balance_before || 0) }}</td>
                                <td>{{ formatCurrency(transaction.balance_after || 0) }}</td>
                                <td>{{ transaction.desciption || "" }}</td>
                                <td>{{ formatDate(transaction.created_at || new Date()) }}</td>
                                <td>
                                    <UiButtonDropdown :id="transaction.id" @viewDetails="viewDetails"
                                        @deleteItem="deleteItem" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <DetailTransactionModal :itemId="selectedItemId" />
                    <BasePagination @update:page="handlePageChange" @update:limit="handleLimitChange"
                        v-model:limit="limitSelected" v-model:currentPage="currentPage"
                        :totalPages="transactionStore.state.totalPages"
                        :totalArrayLength="transactionStore.state.transactions.length"
                        :totalRows="transactionStore.state.totalRows" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { TransactionFilter } from '~/models/Transaction';
import { useTransaction } from '~/composables/useTransaction';
import DetailTransactionModal from '~/components/transaction/DetailTransactionModal.vue';
definePageMeta({
    layout: 'dashboard'
})
const limitSelected = ref(10);
const currentPage = ref(1);
const { $showToast } = useNuxtApp();
const transactionStore = useTransaction();
const selectedItemId = ref<string | null>(null);
const filter = reactive(new TransactionFilter({ id: null }));
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