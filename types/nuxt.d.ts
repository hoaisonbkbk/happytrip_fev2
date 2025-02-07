import { NuxtApp } from "#app";

declare module "#app" {
  interface NuxtApp {
    $showToast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $showToast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
  }
}
