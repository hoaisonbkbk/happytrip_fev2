<template>
    <!-- Thêm các nút thao tác nếu cần -->
    <div class="dropdown">
        <button class="btn btn-outline-primary btn-sm dropdown-toggle" type="button" 
            @click="toggleDropdown(id)"
            :aria-expanded="isOpen">
            Hành động
        </button>
        <ul class="dropdown-menu show" v-if="isOpen">
            <li>
                <a class="dropdown-item" href="#" @click.prevent="viewDetails(id)">
                    Xem chi tiết
                </a>
            </li>

            <li>
                <a class="dropdown-item text-danger" href="#" 
                    @click.prevent="deleteItem(id)">
                    Xóa
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
const props = defineProps({
    id: String,
});
const openDropdown = ref(null);
const emit = defineEmits(['viewDetails', 'deleteItem']);
const isOpen = ref(openDropdown.value === props.id);
console.log(isOpen.value);
const toggleDropdown = (id) => {
   isOpen.value = !isOpen.value;
};

const viewDetails = (id) => {
    emit('viewDetails', id);
};

const deleteItem = (id) => {
    emit('deleteItem', id);
    openDropdown.value = null;
};
</script>