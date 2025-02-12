<script setup>
defineProps(["error"]);
useHead({
  title: "Trang không tồn tại - 404",
});
</script>

<template>
  <div class="error-container">
    <h1>⚠️ Oops! Trang bạn tìm không tồn tại.</h1>
    <p v-if="error.statusCode === 404">
      Có vẻ như trang bạn đang tìm kiếm không có trên hệ thống.
    </p>
    <p v-else>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
    <NuxtLink to="/" class="btn-home">Quay về trang chủ</NuxtLink>
  </div>
</template>

<style scoped>
.error-container {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 2rem;
  color: red;
}

.btn-home {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: blue;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
