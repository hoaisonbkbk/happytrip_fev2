export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // Log error
    LogService.logError(error, 'Global Error Handler');
    
    // Show user friendly message
    if (process.client) {
      nuxtApp.$showToast('Đã xảy ra lỗi, vui lòng thử lại sau', 'error');
    }
  };
}); 