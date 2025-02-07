import { defineNuxtPlugin } from "#app";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  // Đăng ký plugin Toast vào Vue App
  nuxtApp.vueApp.use(Toast, {
    position: "top-right", // Vị trí hiển thị
    timeout: 3000, // Thời gian hiển thị
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    icon: true,
    rtl: false,
  });

  // Cung cấp một hàm `showToast` để dùng toàn cục
  nuxtApp.provide("showToast", (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    const toast = useToast();
    if (toast[type]) {
      toast[type](message);
    } else {
      toast.info(message); // Mặc định dùng info nếu type không hợp lệ
    }
  });
});
