<template>
    <div class="modal fade" id="detailModal" tabindex="-1" ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chi tiết hãng xe</h5>
                    <button type="button" class="btn-close" @click="hide"></button>
                </div>
                <div class="modal-body">
                    <div v-if="isLoading">Đang tải...</div>
                    <div v-else-if="transportDetail">
                        {{ transportDetail }}
                        <!-- <div class="mb-3">
                            <label class="fw-bold">Mã hãng:</label>
                            <div>{{ transportDetail.short_id }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="fw-bold">Tên hãng:</label>
                            <div>{{ transportDetail.hang_xe }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="fw-bold">Danh sách xe:</label>
                            <div>{{ transportDetail.ten_xe }}</div>
                        </div> -->
                        <!-- Thêm các thông tin khác nếu cần -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hide">Đóng</button>
                    <button type="button" class="btn btn-primary" @click="handleSave">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import type { ITransportSystem } from '~/types/TransportSystem';

const props = defineProps<{
    itemId: string | null;
}>();

const modal = ref<any>(null);
const modalElement = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const transportDetail = ref<ITransportSystem | null>(null);

onMounted(() => {
    // Đảm bảo modalElement đã được mount
    nextTick(() => {
        if (modalElement.value) {
            modal.value = new bootstrap.Modal(modalElement.value);
        }
    });
});

const handleSave = () => {
    console.log('save');
}

// Theo dõi khi itemId thay đổi

watch(() => props.itemId, async (newId) => {
    if (newId) {
        await fetchDetail(newId);
    }
});
const transportStore = useTransportSystem();
const {$showToast} = useNuxtApp();
// Lấy chi tiết hãng xe

const fetchDetail = async (id: string) => {
    isLoading.value = true;
    try {
        // Gọi API lấy chi tiết
        // Thay thế bằng API thực tế của bạn
        await transportStore.getDetail(id);
        console.log('detail',transportStore.state.transportDetail);
        transportDetail.value = transportStore.state.transportDetail;
    } catch (error:any) {
        $showToast(error.message || "Lỗi không xác định!", "error");
    } finally {
        isLoading.value = false;
    }

};

// Methods để show/hide modal
const show = () => {
    modal.value?.show();
};

const hide = () => {
    modal.value?.hide();
    transportDetail.value = null;
};

// Expose methods
defineExpose({
    show,
    hide
});
</script>
