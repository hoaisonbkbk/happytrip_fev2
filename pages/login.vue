<script lang="ts" setup>
definePageMeta({ layout: "auth" });
import { reactive } from "vue";
import { Partner } from "~/models/Partner";
import { useAuth } from "~/composables/useAuth";
import type { IPartner } from "~/types/Partner";

const {login} = useAuth();

const partner = reactive<IPartner>(new Partner())

// Hàm xử lý login
const handleLogin = () =>{
    console.log(partner);
    login(partner);
}

</script>
<template>
    <div class="card-body text-center">
        <div class="mb-4">
            <img class="brand" src="assets/img/bootstraper-logo.png" alt="bootstraper logo">
        </div>
        <h6 class="mb-4 text-muted">Đăng nhập Happytrip System</h6>
        <div class="mb-3 text-start">
            <label for="tel" class="form-label">Số điện thoại</label>
            <input type="tel" class="form-control" v-model="partner.phone" placeholder="Enter your phone" required>
        </div>
        <div class="mb-3 text-start">
            <label for="password" class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" v-model="partner.password" placeholder="Enter your password" required>
        </div>
        <div class="mb-3 text-start">
            <div class="form-check">
                <input class="form-check-input" name="remember" type="checkbox" value="" id="check1">
                <label class="form-check-label" for="check1">
                    Ghi nhớ đăng nhập
                </label>
            </div>
        </div>
        <button class="btn btn-primary mb-4" @click="handleLogin" style="width:100%">Đăng nhập hệ thống</button>
        <p class="mb-0 text-muted">Chưa có tài khoản? <a href="/signup">Đăng ký</a></p>
    </div>
</template>