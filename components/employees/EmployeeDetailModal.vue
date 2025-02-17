<template>
    <BaseModal ref="modalRef" 
    title="Chi tiết tài xế" 
    buttonSaveText="Chi tiết" 
    size="lg"
    @save="handleSave"
    @close="handleClose">
        <template #body>
            <div v-if="partnerStore.state.isLoading">Đang tải...</div>
            <div v-else-if="partnerStore.state.partnerDetail">
                <p>Id: {{ partnerStore.state.partnerDetail.id }}</p>
                <p>Full name: {{ partnerStore.state.partnerDetail.full_name }}</p>
                <p>Phone: {{ partnerStore.state.partnerDetail.phone }}</p>
                <p>Password: {{ partnerStore.state.partnerDetail.password }}</p>
                <p>Transport: {{ partnerStore.state.partnerDetail.transport }}</p>
                <p>Status: {{ partnerStore.state.partnerDetail.status_name }}</p>
            </div>
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
const partnerDetail = ref<IPartner | null>(null);

const partnerStore = usePartner();
const { $showToast } = useNuxtApp();

const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const fetchDetail = async (id: string) => {
    isLoading.value = true;
    try {
        await partnerStore.getDetail(id);
        partnerDetail.value = partnerStore.state.partnerDetail;
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
