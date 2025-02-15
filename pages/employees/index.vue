<template>
    <div class="p-4">
        <div class="mb-4">
            <h3 class="text-2xl font-bold">Danh sách tài xế</h3>
        </div>
        <div class="card-header">
            <div class="flex justify-between items-center">Quản lý tài xế</div>
        </div>
        <div class="card-body">
            <div class="relative overflow-x-auto">
                <div class="table-responsive">
                    <table class="w-full text-sm text-left table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th class="px-4 py-2">Tên</th>
                                    <th class="px-4 py-2">Số điện thoại</th>
                                    <th class="px-4 py-2">Loại phương tiện</th>
                                    <th class="px-4 py-2">Biển số</th>
                                    <th class="px-4 py-2">Ngày đăng ký</th>
                                    <th class="px-4 py-2">Trạng thái</th>
                                    <th class="px-4 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{ state.partners }}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'dashboard'
})
import {usePartner} from "~/composables/usePartner";
const {$showToast} = useNuxtApp();
const {state,getPartner} = usePartner();

const limit = ref(12);
const page = ref(1);
const fetchData = async () => {
    try {
        await getPartner(page.value,limit.value);

    } catch (error : any) {
        $showToast(error.message, 'error');
    }
}
onMounted(() => {
    fetchData();
})
</script>