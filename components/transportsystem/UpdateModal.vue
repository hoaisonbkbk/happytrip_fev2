<template>
    <div class="modal fade" tabindex="-1" ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập nhật hãng xe</h5>
                    <button type="button" class="btn-close" @click="hide"></button>
                </div>
                <div class="modal-body">
                    <div v-if="isLoading">Đang tải...</div>
                    <form v-else @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label class="form-label">Mã hãng</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                v-model="formData.short_id"
                                required
                            >
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tên hãng</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                v-model="formData.hang_xe"
                                required
                            >
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Danh sách xe</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                v-model="formData.ten_xe"
                            >
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hide">Hủy</button>
                    <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="isSubmitting">
                        {{ isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const modal = ref<any>(null);
const modalElement = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const isSubmitting = ref(false);

const props = defineProps<{
    itemId: string | null;
}>();

const emit = defineEmits(['update:success']);

const formData = ref({
    short_id: '',
    hang_xe: '',
    ten_xe: ''
});

onMounted(() => {
    nextTick(() => {
        if (modalElement.value) {
            modal.value = new bootstrap.Modal(modalElement.value);
        }
    });
});

watch(() => props.itemId, async (newId) => {
    if (newId) {
        console.log('newId',newId);
        
    }
});


const show = () => {
    modal.value?.show();
};

const hide = () => {
    modal.value?.hide();
    formData.value = {
        short_id: '',
        hang_xe: '',
        ten_xe: ''
    };
};

defineExpose({
    show,
    hide
});
</script>
