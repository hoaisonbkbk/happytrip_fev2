<template>
    <div class="modal fade" :id="modalId" tabindex="-1" ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" @click="hide"></button>
                </div>
                
                <div class="modal-body">
                    <div v-if="isLoading">Đang tải...</div>
                    <div v-else>
                        <!-- Slot cho nội dung -->
                        <slot name="content"></slot>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hide">Đóng</button>
                    <button type="button" class="btn btn-primary" @click="handleSave">
                        {{ saveButtonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';

const props = defineProps<{
    modalId: string;
    title: string;
    isLoading?: boolean;
    saveButtonText?: string;
}>();

const emit = defineEmits<{
    save: []
}>();

const modal = ref<any>(null);
const modalElement = ref<HTMLElement | null>(null);

onMounted(() => {
    nextTick(() => {
        if (modalElement.value) {
            modal.value = new bootstrap.Modal(modalElement.value);
        }
    });
});

const handleSave = () => {
    emit('save');
};

const show = () => {
    modal.value?.show();
};

const hide = () => {
    modal.value?.hide();
};

defineExpose({
    show,
    hide
});
</script>