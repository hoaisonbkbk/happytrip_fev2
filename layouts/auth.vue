<script setup>
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/css/auth.css";
definePageMeta({
    middleware: ['auth']
})
</script>
<template>
    <div class="wrapper">
        <div class="auth-content">
            <div class="card">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>