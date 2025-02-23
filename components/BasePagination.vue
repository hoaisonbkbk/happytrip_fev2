<template>
    <!-- Phân trang -->
    <div class="mt-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
            <select :value="limit" class="border p-1 rounded" 
            @change="$emit('update:limit', Number($event.target?.value))">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
            </select>
            <span>Hiển thị {{totalArrayLength }} / {{ totalRows }} kết quả</span>
        </div>

        <div class="flex gap-2">
            <button @click="goToPage(1)" :disabled="currentPage === 1">First</button>
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>

            <span v-for="page in visiblePages" :key="page">
                <button @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
            </span>

            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
            <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
        </div>
    </div>
</template>
<style scoped>
button {
    @apply px-4 py-1 rounded-md shadow-sm;
}

button.active {
    @apply bg-indigo-500 text-white;
}

button:not(.active) {
    @apply bg-gray-200;
}

button:hover {
    @apply bg-gray-300;
}

button:disabled {
    @apply opacity-50 cursor-not-allowed;
}

button:focus {
    @apply outline-none ring-2 ring-indigo-500;
}
</style>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps<{
    limit: number;
    currentPage: number;
    totalRows: number;
    totalPages: number;
    totalArrayLength: number;
}>();

const emit = defineEmits(['update:page', 'update:limit']);

const visiblePages = computed(() => {
    const pages = [];
    const startPage = Math.max(1, props.currentPage - 2);
    const endPage = Math.min(props.totalPages, props.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
});

const goToPage = (page: number) => {
    if (page >= 1 && page <= props.totalPages) {
        emit('update:page', page);
    }
};
</script>

<style scoped>
.pagination {
    display: flex;
    gap: 5px;
}

button.active {
    font-weight: bold;
}
</style>