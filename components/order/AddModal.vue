<template>
  <BaseModal ref="modalRef" title="Thêm mới chuyến đi" buttonSaveText="Chi tiết" size="lg" @save="handleSave"
    @close="handleClose">
    <template #body>

      <!-- Điểm đón -->
      <div class="flex flex-wrap -mx-2">
        <div class="form-group w-full md:w-1/3 px-2">
          <!-- Tỉnh đón -->
          <select class="form-control" id="add_departure_city" v-model="orderCTO.departure_city_id">
            <option value="">Thành phố đón</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
          </select>
        </div>
        <!-- Quận / Huyện đón -->
      <div class="form-group w-full md:w-1/3 px-2">
        <select class="form-control" v-model="orderCTO.departure_district">
          <option value="">Quận/huyện đón</option>
          <option v-for="district in districtsDepature" :key="district.name" :value="district.name">
            {{ district.name }}</option>
          </select>
        </div>
        <div class="form-group w-full md:w-1/3 px-2">
          <input class="form-control" placeholder="Địa chỉ đón" v-model="orderCTO.departure_address_1" type="text" />
        </div>
      </div>

      <!-- Điểm đến -->
      <div class="flex flex-wrap -mx-2" style="margin-top: 10px;">
        <div class="form-group w-full md:w-1/3 px-2">
          <!-- Tỉnh đón -->
          <select class="form-control" id="add_destination_city" v-model="orderCTO.destination_city_id">
            <option value="">Thành phố đến</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
          </select>
        </div>
        <!-- Quận / Huyện đón -->
        <div class="form-group w-full md:w-1/3 px-2">
          <select class="form-control" v-model="orderCTO.destination_district">
            <option value="">Quận/huyện đến</option>
            <option v-for="district in districtsDestination" :key="district.name" :value="district.name">
              {{ district.name }}</option>
          </select>
        </div>
        <div class="form-group w-full md:w-1/3 px-2">
          <input class="form-control" v-model="orderCTO.destination_address_1" placeholder="Địa chỉ đến" type="text" />
        </div>
      </div>

      <!-- Dịch vụ và thời gian khởi hành -->
      <div class="flex flex-wrap -mx-2" style="margin-top:10px;">
        <div class="form-group w-full md:w-1/2 px-2">
          <!-- Dịch vụ -->
          <select class="form-control" v-model="orderCTO.id_service">
            <option value="">Dịch vụ đi</option>
            <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
          </select>
        </div>
        <div class="form-group w-full md:w-1/4 px-2">
          <!-- Ngày đón -->
          <input type="datetime-local" v-model="orderCTO.date_of_destination"
            placeholder="Ngày đón định dạng dd/MM/yyyy" class="form-control" />
        </div>

      </div>
      <!-- Họ tên -->
      <div class="flex flex-wrap -mx-2" style="margin-top:10px;">
        <div class="form-group w-full md:w-1/3 px-2">
          <!-- Tỉnh đón -->
          <input class="form-control" v-model="orderCTO.full_name" type="text" placeholder="Họ tên" />
        </div>
        <!-- Quận / Huyện đón -->
        <div class="form-group w-full md:w-1/3 px-2">
          <!-- Tỉnh đón -->
          <input class="form-control" v-model="orderCTO.phone" type="text" placeholder="Số điện thoại" />
        </div>
        <div class="form-group w-full md:w-1/3 px-2">
          <input class="form-control" type="text" placeholder="Tài xê (nếu có)" />
        </div>
      </div>
      <!-- Ghi chú cho tài xế -->
      <div class="flex flex-wrap -mx-2" style="margin-top:10px;">
        <div class="form-group w-full px-2">
          <input type="text" class="form-control" placeholder="Ghi chú cho tài xế" />
        </div>
      </div>
      <div class="flex flex-wrap -mx-2" style="margin-top:10px;">
        <div class="form-group w-full px-2">
          <div class="d-flex bg-light align-items-center p-2 border rounded gap-2">

            <div class="orderCalc p-4 bg-white rounded shadow-md" style="width: 100%;">
              <h3 class="text-lg font-semibold mb-2">Thông tin chuyến đi:</h3>
              <ul class="listDetail list-disc pl-5 space-y-1">
                <li>Khách hàng: {{ orderCTO.full_name || "Không xác định" }} / SĐT: {{ orderCTO.phone || "Không số điện thoại" }}</li>
                <li>Điểm đón: <b> {{ orderCTO.departure_address_1 || "" }}  / {{ orderCTO.departure_district }} / {{ orderCTO.departure_city }}</b></li>
                <li>Điểm đón: <b> {{ orderCTO.destination_address_1 || "" }}  / {{ orderCTO.destination_district }} / {{ orderCTO.destination_city }}</b></li>
                <li>Giá chuyến đi: <b>{{ formatCurrency(orderStore.state.orderCalc.price_guest_after || 0) }}</b></li>
                <li>Chiều dài: <b>{{ orderStore.state.orderCalc.distance }}km</b></li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">

import BaseModal from "@/components/BaseModal.vue";
import { QuickOrder, type IQuickOrder } from "~/models/Order"; // Import IQuickOrder type
// Lấy ref của modal. Gần như gọi thuộc tính của
const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);
import type { ICity } from '~/types/City';
import type { IDistrict } from "~/types/District";
import type { IHappytripService } from "~/types/HappytripService";
const cityStore = useCity();
const orderStore = useOrder();
const districtsDepature = ref<IDistrict[]>([]);
const districtsDestination = ref<IDistrict[]>([]);
const orderCTO = reactive(new QuickOrder({
  id_service: "",
  departure_city: "",
  departure_district: "",
  departure_city_id: "",
  departure_address_1: "",
  destination_city_id: "",
  destination_city: "",
  destination_district: "",
  destination_address_1: "",
}));

defineProps({
  cities: {
    type: Array as PropType<ICity[]>,
    required: false
  },
  services: {
    type: Array as PropType<IHappytripService[]>,
    required: false
  }
});

defineExpose({
  open: () => modalRef.value?.show(),
  close: () => modalRef.value?.hide(),
});

const handleSave = () => {
  console.log("Save operation performed");
};

// Watch for changes in departure_city and destination_city
watch([
  () => orderCTO.departure_city_id,
  () => orderCTO.destination_city_id
], async ([newCityDiemdon, newCityDiemden], [oldCityDiemdon, oldCityDiemden]) => {
  if (newCityDiemdon !== oldCityDiemdon) {
    await cityStore.GetDetail(newCityDiemdon);
    districtsDepature.value = cityStore.state.cityDetail.districts || [];
    orderCTO.departure_city = cityStore.state.cityDetail.name;
  }
  if (newCityDiemden !== oldCityDiemden) {
    await cityStore.GetDetail(newCityDiemden);
    districtsDestination.value = cityStore.state.cityDetail.districts || [];
    orderCTO.destination_city = cityStore.state.cityDetail.name;
  }
});

const { $showToast } = useNuxtApp();
// Watch for changes in orderCTO
watch(() => orderCTO, async (newVal, oldVal) => {
  try {
    console.log('orderCTO changed:', orderCTO);

    // Tính toán lại thông tin
    await orderStore.CalcOrder(orderCTO);
    // Error handling is done in the catch block below
    console.log('orderStore.state.orderDetail:', orderStore.state.orderCalc);
  } catch (error: any) {
    console.log('errorHihi:', error);

    $showToast(error?.message || "Lỗi không xác định", 'error');
  }
}, { deep: true });

const handleClose = () => {
  modalRef.value?.hide();
  console.log("1close", "close");
};
</script>
