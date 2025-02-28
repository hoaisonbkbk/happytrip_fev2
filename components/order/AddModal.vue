<template>
    <BaseModal ref="modalRef" 
    title="Thêm mới chuyến đi" 
    buttonSaveText="Chi tiết" size="lg" 
    @save="handleSave" @close="handleClose">
        <template #body>
            <div>ahihhihi</div>
            
            
        </template>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
// Lấy ref của modal. Gần như gọi thuộc tính của 
const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);


defineExpose({
  open: () => modalRef.value?.show(),
  close: () => modalRef.value?.hide()
});


const handleSave = () => {

  console.log('Save operation performed');
};

const handleClose = () => {
    modalRef.value?.hide();
    console.log('1close','close');
}

</script>