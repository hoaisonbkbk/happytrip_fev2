<template>
    <BaseModal ref="modalRef" 
    title="Chi tiết chuyến" 
    buttonSaveText="Chi tiết" size="lg" 
    @save="handleSave" @close="handleClose">
        <template #body>
            <div>ahihhihi</div>
        </template>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';

const props = defineProps<{
    itemId: string | null;
}>();

// Lấy ref của modal. Gần như gọi thuộc tính của 
const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const handleSave = () => {
    console.log('save');
}

watch(() => props.itemId, async (newId) => {
    if (newId) {
        //await fetchDetail(newId);
        modalRef.value?.show();
    }
});

const handleClose = () => {
    modalRef.value?.hide();
    console.log('close');
}
</script>
