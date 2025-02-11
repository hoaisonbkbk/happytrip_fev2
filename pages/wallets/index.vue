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
                            <tr v-for="wallet in walletStore.state.wallets" :key="wallet.id">
                                <td class="px-4 py-2">{{ wallet.short_id }}</td>
                                <td class="px-4 py-2">{{ wallet.partner?.full_name }}</td>
                                <td class="px-4 py-2">{{ wallet.partner?.phone }}</td>
                                <td class="px-4 py-2">{{ formatCurrency(wallet.balance ?? 0) }}</td>
                                <td class="px-4 py-2">{{ formatCurrency(wallet.limit_debit ?? 0) }}</td>
                                <td class="px-4 py-2">{{ formatCurrency(wallet.wallet_deposit ?? 0) }}</td>
                                <td class="px-4 py-2">{{ wallet.partner_id != '' ? 'Ví đại lý' : 'Ví cá nhân' }}</td>
                                <td class="px-4 py-2">{{ formatDate(wallet.created_at) }}</td>
                                <td class="px-4 py-2">
                                    <div class="dropdown">
                                            <button class="btn btn-outline-primary btn-sm dropdown-toggle" type="button"
                                                @click="toggleDropdown(wallet.id)"
                                                :aria-expanded="openDropdown === wallet.id">
                                                Hành động
                                            </button>
                                            <ul class="dropdown-menu show" v-if="openDropdown === wallet.id">
                                                <li>
                                                    <a class="dropdown-item" href="#"
                                                        @click.prevent="viewDetails(wallet.id)">
                                                        Xem chi tiết
                                                    </a>
                                                </li>

                                                <li>
                                                    <a class="dropdown-item text-danger" href="#"
                                                        @click.prevent="deleteItem(wallet.id)">
                                                        Xóa
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <DetailModal :itemId="selectedItemId" />
                    <BasePagination @update:page="handlePageChange" @update:limit="handleLimitChange"
                            v-model:limit="limitSelected" v-model:currentPage="currentPage" :totalPages="walletStore.state.totalPages"
                            :totalArrayLength="walletStore.state.wallets.length" :totalRows="walletStore.state.totalRows" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { WalletFilter } from '~/models/Wallet';
import { useWallet } from '~/composables/useWallet';
import DetailModal from '@/components/wallet/DetailModal.vue';
definePageMeta({
    layout: 'dashboard'
})
const walletStore = useWallet();
const currentPage = ref(1);
const limitSelected = ref(10);

const filter = reactive(new WalletFilter({ isSeller: true }));
const openDropdown = ref(null);
const selectedItemId = ref<string | null>(null);
const { $showToast } = useNuxtApp();
const fetchData = async () => {
    try {
        await walletStore.GetList(currentPage.value, limitSelected.value, '', filter);
        $showToast('Lấy dữ liệu thành công', 'success');
    } catch (error: any) {
        $showToast(error.message, 'error');
    }
}
onMounted(async () => {
    await fetchData();
})

// Trường hợp filter thay đổi thì sẽ dữ liệu sẽ thay đổi theo filter
watch(filter, () => {
    currentPage.value = 1;
    fetchData();
}, { deep: true });
const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchData();
}
const handleLimitChange = (limit: number) => {
    limitSelected.value = limit;
    fetchData();
}
const viewDetails = (id: string) => {
    console.log(id);
    selectedItemId.value = id;
}
const deleteItem = (id: string) => {
    console.log(id);
}
// Toggle dropdown menu
const toggleDropdown = (id: string) => {
    if (openDropdown.value === id) {
        openDropdown.value = null; // Đóng dropdown
    } else {
        openDropdown.value = id; // Mở dropdown
    }
};
</script>
