<template>
    <div class="p-4">
        <div class="md-4">
            <h3 class="text-2xl font-bold">Danh sách thành phố</h3>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý thành phố</div>
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

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { WalletFilter } from '~/models/Wallet';
import type { IWalletFilter } from '~/types/Wallet';

definePageMeta({
    layout: 'dashboard'
})
const walletStore = useWallet();
const currentPage = ref(1);
const limitSelected = ref(10);

const filter = reactive(new WalletFilter({isSeller:true}));
const openDropdown = ref(null);
const selectedItemId = ref<string | null>(null);
const {$showToast} = useNuxtApp();
const fetchData = async () => {
    try {
        await walletStore.GetList(currentPage.value, limitSelected.value, '', filter);
        
    } catch (error:any) {
        $showToast(error.message, 'error');
    }
}
onMounted(async () => {
    await fetchData();
})
</script>
