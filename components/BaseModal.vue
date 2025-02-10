<template>
    <div class="modal fade" ref="modalElement" tabindex="-1">
        <div class="modal-dialog" :class="modalSize">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" @click="handleClose"></button>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        Nội dung mặc định (nếu không có nội dung nào được truyền vào).
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <!-- Mặc định không có -->
                        <button type="button" class="btn btn-secondary"
                            @click="handleClose">Đóng</button>
                        <button type="button" class="btn btn-primary"
                            @click="handleSave">{{ buttonSaveText || 'Lưu' }}</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';

const props = defineProps<{
    title: string;
    buttonSaveText:string;
    size?: 'sm' | 'lg' | 'xl';
    onConfirm?: () => void;
}>();
const emit = defineEmits(['save','close']);

const modal = ref<any>(null);
const modalElement = ref<HTMLElement | null>(null);


const modalSize = computed(() => {
    return props.size ? `modal-${props.size}` : '';
});


// Gọi sự kiện
const handleSave = () => {
    emit('save');
}
const handleClose = () => {
    emit('close');
}

onMounted(() => {
    // Trì hoãn việc thực thi 1 đoạn code cho đến khi dom được cập nhật hoàn toãn
    nextTick(() => {
        if (modalElement.value) {
            modal.value = new bootstrap.Modal(modalElement.value);
        }
    });
});

const show = () => {
    modal.value?.show();
};

const hide = () => {
    modal.value?.hide();
};

const handleConfirm = () => {
    if (props.onConfirm) props.onConfirm();
    hide();
};

// Expose để có thể gọi từ bên ngoài
defineExpose({
    show,
    hide
});
</script>
