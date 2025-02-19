<template>
     <div class="p-4">
        <div class="md-4">
            <h3 class="text-2xl font-bold">Danh sách chyến đi</h3>
        </div>
       
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">Quản lý chyến đi</div>
            </div>
            <div class="card-body">
                <div class="relative overflow-x-auto">
                     
                </div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left table table-bordered table-striped">

                    </table>
                </div>
            </div>
        </div>
     </div>
</template>
<script setup lang="ts">
    definePageMeta({
        layout: "dashboard"
    })
</script>