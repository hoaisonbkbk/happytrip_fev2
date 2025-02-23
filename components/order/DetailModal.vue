<template>
    <BaseModal ref="modalRef" 
    title="Chi tiết chuyến" 
    buttonSaveText="Chi tiết" size="lg" 
    @save="handleSave" @close="handleClose">
        <template #body>
            <div>ahihhihi</div>
            <div v-if="orderStore.state.isLoading">Đang tải...</div>
            <div v-else-if="orderStore.state.orderDetail">
                {{ orderStore.state.orderDetail }}
            </div>
            
        </template>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import { useOrder } from '~/composables/useOrder';

const props = defineProps<{
    itemId: string | null;
}>();

// Lấy ref của modal. Gần như gọi thuộc tính của 
const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);
const orderStore = useOrder();
const { $showToast } = useNuxtApp();
const handleSave = () => {
    console.log('save');
}

watch(() => props.itemId, async (newId) => {
    if (newId) {
        await fetchDetail(newId);
        modalRef.value?.show();
    }
});

const fetchDetail = async (id: string) => {
    try{
        await orderStore.GetDetail(id);
    }catch(error:any){
        $showToast(error.message || "Lỗi không xác định!", "error");
    }
    
}
const handleClose = () => {
    modalRef.value?.hide();
    console.log('close');
}
</script>
