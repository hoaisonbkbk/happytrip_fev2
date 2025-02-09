<script setup lang="ts">
import "../assets/vendor/fontawesome/css/fontawesome.min.css"
import "../assets/vendor/fontawesome/css/solid.min.css"
import "../assets/vendor/fontawesome/css/brands.min.css"
import "../assets/vendor/bootstrap/css/bootstrap.min.css"
import "../assets/css/master.css"
import "../assets/vendor/datatables/datatables.min.css";


useHead({
    script: [
        { src: "/vendor/jquery/jquery.min.js", defer: true },
        { src: "/vendor/bootstrap/js/bootstrap.bundle.min.js", defer: true },
        { src: "/js/script.js", defer: true }
    ]
});

</script>
<template>
    <div class="wrapper">
        <!-- Nav -->
        <LayoutNavigation />
        <div id="body" class="active">
            <!-- navbar navigation component -->
           <LayoutNavigationHeader />
            <!-- end of navbar navigation -->
            <div class="content">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>