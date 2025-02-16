<template>
    <div class="p-4">
        <div class="mb-4">
            <h3 class="text-2xl font-bold">Danh sách tài xế</h3>
        </div>
        <div class="card-header">
            <div class="flex justify-between items-center">Quản lý thành phố</div>
        </div>
        <div class="card-body">
            <div class="relative overflow-x-auto">
                <div class="table-responsive">
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
                                    <ButtonDropdown :id="partner.id" 
                                        @viewDetails="viewDetails"
                                        @deleteItem="deleteItem" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <EmployeeDetailModal 
                :itemId="selectedItemId"
            />
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
const limit = ref(12);
const page = ref(1);
const { state, getPartner } = usePartner();
const { partners, totalRows, totalPages, loading } = toRefs(state);
const filter = reactive(new PartnerFilter({ id: null }));
const selectedItemId = ref();

const fetchData = async () => {
    try {

    } catch (error) {
        $showToast(error.message, 'error');
    }
    await getPartner(page.value, limit.value, filter);
}
onMounted(() => {
    fetchData();
});

const viewDetails = (id) => {
    selectedItemId.value = id;
    
};
const deleteItem = (id) => {
    console.log(id);
    $showToast("Chức năng đang phát triển", "info");
}; 
</script>