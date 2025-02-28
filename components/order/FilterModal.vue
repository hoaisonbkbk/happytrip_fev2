<template>
    <div class="relative overflow-x-auto">
        <div class="grid gap-x-4 gap-y-2 grid-cols-12">
            <!-- filter 1 -->
            <div class="col-span-2">
                <div class="flex flex-row gap-x-2 items-center">
                    <span class="text-sm font-medium text-nowrap">Điểm đón</span>
                    <select name="" id="" v-model="filter.city_diemdon"
                        class="border border-gray-300 w-full rounded-md px-3 py-1.5 text-sm">
                        <option value="">Lựa chọn</option>
                        <option v-for="city in cities" :key="city.id" :value="city.id">{{
                            city.name }}</option>
                    </select>
                </div>
            </div>
            <!-- filter 2 -->
            <div class="col-span-2">
                <div class="flex flex-row gap-x-2 items-center">
                    <span class="text-sm font-medium text-nowrap">Quận/Huyện đón</span>
                    <select v-model="filter.district_depature"
                        class="border border-gray-300 w-full rounded-md px-3 py-1.5 text-sm">
                        <option value="">Lựa chọn</option>
                        <option v-for="district in districtsDepature" :key="district.id" :value="district.id">{{
                            district.name }}</option>
                    </select>
                </div>
            </div>
            <!-- filter 3 -->
            <div class="col-span-2">
                <div class="flex flex-row gap-x-2 items-center">
                    <span class="text-sm text-nowrap font-medium">Loại dịch vụ</span>
                    <select v-model="filter.service_type"
                        class="border w-full border-gray-300 rounded-md px-3 py-1.5 text-sm">
                        <option value="">Lựa chọn</option>
                        <option v-for="service in services" :key="service.id" :value="service.id">{{
                            service.name }}</option>
               
                    </select>
                </div>
            </div>
            <!-- filter 4 -->
            <div class="col-span-2">
                <div class="flex flex-row gap-x-2 items-center">
                    <span class="text-sm font-medium text-nowrap">Điểm trả</span>
                    <select name="" id="" v-model="filter.city_diemden"
                        class="border border-gray-300 w-full rounded-md px-3 py-1.5 text-sm">
                        <option value="">Lựa chọn</option>
                        <option v-for="city in cities" :key="city.id" :value="city.id">{{
                            city.name }}</option>
                    </select>
                </div>
            </div>
            <!-- filter 5 -->
            <div class="col-span-2">
                <div class="flex flex-row gap-x-2 items-center">
                    <span class="text-sm font-medium text-nowrap">Quận/Huyện trả</span>
                    <select name="" id="" v-model="filter.district_destination"
                        class="border border-gray-300 w-full rounded-md px-3 py-1.5 text-sm">
                        <option value="">Lựa chọn</option>
                        <option v-for="district in districtsDestination" :key="district.id" :value="district.id">{{
                            district.name }}</option>
                    </select>
                </div>
            </div>
            <!-- filter 6 -->
            <div class="col-span-2">
                <div class="flex flex-row gap-x-2 items-center">
                    <span class="text-sm font-medium text-nowrap">Thời gian</span>
                    <input type="date" range v-model="filter.from_date_of_destination"
                        class="border border-gray-300 w-full rounded-md px-3 py-1.5 text-sm" />
                </div>
            </div>
            <!-- filter 7 -->
            <div class="col-span-2">
                <div class="flex flex-row gap-x-2 items-center">
                    <span class="text-sm font-medium text-nowrap">Trạng thái</span>
                    <select name="" id="" v-model="filter.order_status"
                        class="border border-gray-300 w-full rounded-md px-3 py-1.5 text-sm">

                        <option value=0>Chờ tài xế</option>
                        <option value=1>Đã nhận chuyến</option>
                        <option value=2>Hoàn thành</option>
                        <option value=3>Hủy thành</option>
                    </select>
                </div>
            </div>
            <!-- filter 8 -->
            <!-- filter 8 -->
            <div class="col-span-2">
                <div class="flex flex-row gap-x-2 items-center">
                    <span class="text-sm font-medium text-nowrap">Từ khóa</span>
                    <input type="text" v-model="filter.keyword"
                        class="border border-gray-300 w-full rounded-md px-3 py-1.5 text-sm" />
                </div>
            </div>

        </div>

    </div>
</template>
<script setup lang="ts">
import type { ICity } from '~/types/City';
import type { IHappytripService } from '~/types/HappytripService';
import type { IOrderFilter } from '~/types/Order';

const props = defineProps<{
    services:IHappytripService[],
    filter: IOrderFilter,
    cities: ICity[],
    districtsDestination: ICity[],
    districtsDepature: ICity[],
}>();

const emit = defineEmits(['update:filter']);
watch(() => props.filter, () => {
    emit('update:filter');
}, { deep: true });
</script>