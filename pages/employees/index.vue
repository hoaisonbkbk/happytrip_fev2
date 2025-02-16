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
                <div v-if="loading" class="text-center py-4">
                    Đang tải...
                </div>
                <div v-else class="table-responsive">
                    <table class="w-full text-sm text-left table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th class="px-4 py-2">Tên</th>
                                <th class="px-4 py-2">Số điện thoại</th>

                                <th class="px-4 py-2">Biển số</th>
                                <th class="px-4 py-2">Ngày đăng ký</th>
                                <th class="px-4 py-2">Trạng thái</th>
                                <th class="px-4 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="partner in partners" :key="partner.id">
                                <td class="px-4 py-2">{{ partner.full_name }}</td>
                                <td class="px-4 py-2">{{ partner.phone }}</td>
                                <td class="px-4 py-2">{{ partner.transport.license_plate }}</td>
                                <td class="px-4 py-2">{{ partner.transport.created_year }}</td>
                                <td class="px-4 py-2">Kích hoạt</td>
                                <td class="px-4 py-2">
                                    <ButtonDropdown :id="partner.id" @viewDetails="viewDetails"
                                        @deleteItem="deleteItem" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <EmployeeDetailModal :itemId="selectedItemId" />
            <BasePagination @update:page="handlePageChange" @update:limit="handleLimitChange"
                v-model:limit="limitSelected" v-model:currentPage="currentPage" :totalPages="totalPages"
                :totalArrayLength="state.partners.length" :totalRows="totalRows" />
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'dashboard'
})
import { usePartner } from '~/composables/usePartner'
import { PartnerFilter } from '~/models/Partner';
import ButtonDropdown from '~/components/ui/ButtonDropdown.vue';
import EmployeeDetailModal from '~/components/employees/EmployeeDetailModal.vue';
const { $showToast } = useNuxtApp();
const limitSelected = ref(10);
const currentPage = ref(1);
const { state, getPartner } = usePartner();
const { partners, totalRows, totalPages, loading } = toRefs(state);
const filter = reactive(new PartnerFilter({ id: null }));
const selectedItemId = ref();

const fetchData = async () => {
    try {
        await getPartner(currentPage.value, limitSelected.value, filter);
    } catch (error) {
        $showToast(error.message, 'error');
    }

}
onMounted(() => {
    fetchData();
});
const handlePageChange = (page) => {
    currentPage.value = page;
    fetchData();
}

const handleLimitChange = (limit) => {
    limitSelected.value = limit;
    fetchData();
}
const viewDetails = (id) => {
    selectedItemId.value = id;

};
const deleteItem = (id) => {
    console.log(id);
    $showToast("Chức năng đang phát triển", "info");
}; 
</script>