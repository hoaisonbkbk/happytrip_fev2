<template>
    <BaseModal ref="modalRef" 
    title="Chi tiết thành phố" 
    buttonSaveText="Chi tiết" 
    size="lg"
    @save="handleSave"
    @close="handleClose">
        <template #body>
            <div v-if="isLoading">Đang tải...</div>
            <div v-else-if="cityDetail">

                {{ cityDetail }}
            </div>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import type { ICity } from '~/types/City';

const props = defineProps<{
    itemId: string | null;
}>();

const isLoading = ref(false);
const cityDetail = ref<ICity | null>(null);

const cityStore = useCity();
const { $showToast } = useNuxtApp();

const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const fetchDetail = async (id: string) => {
    isLoading.value = true;
    try {
        await cityStore.GetDetail(id);
        cityDetail.value = cityStore.state.cityDetail;
    } catch (error: any) {
        $showToast(error.message, 'error');
    } finally {
        isLoading.value = false;
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
    cityDetail.value = null;
};





</script>
