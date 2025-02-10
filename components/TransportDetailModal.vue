<template>
    <BaseModal ref="modalRef" buttonSaveText="Chi tiết" 
        title="Chi tiết hãng xe" size="lg"
        @save="handleSave"
        @close="handleClose">
        <template #body>
            <div v-if="isLoading">Đang tải...</div>
            <div v-else-if="transportDetail">




                <p><strong>Mã hãng:</strong> {{ transportDetail.short_id }}</p>
                <p><strong>Tên hãng:</strong> {{ transportDetail.hang_xe }}</p>
                <p><strong>Danh sách xe:</strong> {{ transportDetail.ten_xe }}</p>
            </div>
        </template>
        <!-- <template #footer>
            <button type="button" class="btn btn-secondary" @click="hide">Đóng</button>
            <button type="button" class="btn btn-primary" @click="handleSave">Lưu</button>
        </template> -->
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import type { ITransportSystem } from '~/types/TransportSystem';

const props = defineProps<{ itemId: string | null }>();

const isLoading = ref(false);
const transportDetail = ref<ITransportSystem | null>(null);

const transportStore = useTransportSystem();
const { $showToast } = useNuxtApp();
// Kiểu dữ liệu của modalRef là InstanceType<typeof BaseModal>. Cái này thường áp dụng cho modal bootstrap
const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);
const fetchDetail = async (id: string) => {
    isLoading.value = true;
    try {
        await transportStore.getDetail(id);
        transportDetail.value = transportStore.state.transportDetail;
    } catch (error: any) {
        $showToast(error.message || "Lỗi không xác định!", "error");
    } finally {
        isLoading.value = false;
    }
};

// Theo dõi itemId để tự động load dữ liệu khi mở modal
watch(() => props.itemId, async (newId) => {
    if (newId) {
        await fetchDetail(newId);
        modalRef.value?.show();
    }
});

// Sự kiện đóng modal
const handleClose = () => {
    modalRef.value?.hide();
    transportDetail.value = null;
};

// Sự kiện save
const handleSave = () => {
    console.log('Lưu dữ liệu');
    handleClose();
};
</script>
