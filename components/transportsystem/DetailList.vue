<template>
    <div>
        <h1>Detail List</h1>
        {{ ten_xe }}
    </div>
</template>

<script setup lang="ts">
defineProps({
    ten_xe: {
        type: Array as PropType<string[]>,
        required: true
    }
})

</script>
