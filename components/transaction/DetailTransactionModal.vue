<template>
    <BaseModal ref="modalRef" 
    title="Chi tiết giao dịch" 
    buttonSaveText="Chi tiết" 
    size="lg"
    @save="handleSave"
    @close="handleClose">
        <template #body>
            <p>Id: {{  transactionDetail?.id }}</p>
            <p>Code: <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">{{ transactionDetail?.code }}</span> </p>
            <p>Creator: {{ transactionDetail?.creator }}</p>
            <p>Wallet Id: {{ transactionDetail?.wallet_id }}</p>
            <p>Recerving: {{ transactionDetail?.user_receiving }}</p>
            <p>Amount: {{ formatCurrency(transactionDetail?.amount || 0) }}</p>
            <p>Name: {{ transactionDetail?.name }}</p>
            <p>Description: {{ transactionDetail?.desciption }}</p>
            <p>Status: <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{{ transactionDetail?.status_value }}</span></p>
            <p>Method: <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">{{ transactionDetail?.method }}</span></p>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import type { IPartner } from '~/types/Partner';

const props = defineProps<{
    itemId: string | null;
}>();

const isLoading = ref(false);
const transactionDetail = ref<IPartner | null>(null);

const transactionStore = useTransaction();
const { $showToast } = useNuxtApp();

const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const fetchDetail = async (id: string) => {
    isLoading.value = true;
    try {
        await transactionStore.GetDetail(id);
        transactionDetail.value = transactionStore.state.transactionDetail;
    } catch (error: any) {
        $showToast(error.message, 'error');
    }
}

watch(() => props.itemId, async (newId) => {
    if (newId) {
        await fetchDetail(newId);
        modalRef.value?.show();
    }
});

const handleSave = () => {
    console.log('Lưu dữ liệu');
    handleClose();
};

const handleClose = () => {
    modalRef.value?.hide();
    partnerDetail.value = null;
};





</script>
