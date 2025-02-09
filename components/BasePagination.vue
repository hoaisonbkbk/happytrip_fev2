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
            <span>Hiển thị {{totalArrayLength }} / {{ totalRows }} kết
                quả</span>
        </div>

        <div class="flex gap-2">
            <button class="px-3 py-1 border rounded" 
                :disabled="currentPage === 1"
                @click="handlePageChange(currentPage - 1)">
                Trước
            </button>


            <button v-for="page in totalPages" 
                :key="page" 
                class="px-3 py-1 border rounded"
                :class="{ 'bg-blue-500 text-white': page === currentPage }" 
                @click="handlePageChange(page)">
                {{ page }}
            </button>


            <button class="px-3 py-1 border rounded" 
                :disabled="currentPage === totalPages"
                @click="handlePageChange(currentPage + 1)">
                Sau
            </button>

        </div>
    </div>

</template>

<script setup lang="ts">
defineProps({
    limit: Number,
    currentPage: Number,
    totalRows: Number,
    totalPages: Number,
    totalArrayLength: Number
})

const emit = defineEmits(['update:page','update:limit']);
const handlePageChange = (page:number) => {
    emit('update:page',page);
}
</script>