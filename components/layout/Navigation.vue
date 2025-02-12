<script setup lang="ts">
import { ref, onMounted } from 'vue';
import menuConfig from '~/config/menuConfig.json';
import { useAuth } from '~/composables/useAuth';
import { NuxtLink } from '#components';

const menuItems = ref([]);
const openSubMenus = ref<string[]>([]);

onMounted(() => {
    //const accountType = getAccountType();
    menuItems.value = menuConfig['admin'] || [];
});

const toggleSubMenu = (name: string) => {
    if (openSubMenus.value.includes(name)) {
        openSubMenus.value = openSubMenus.value.filter(n => n !== name);
    } else {
        openSubMenus.value.push(name);
    }
};

const isSubMenuOpen = (name: string) => {
    return openSubMenus.value.includes(name);
};
</script>

<template>
    <nav id="sidebar">
        <div class="sidebar-header">
            <img src="assets/img/bootstraper-logo.png" alt="bootraper logo" class="app-logo">
        </div>
        <ul class="list-unstyled components text-secondary">
            <li v-for="item in menuItems" :key="item.path || item.name">
                <template v-if="item.children">
                    <a href="#" @click.prevent="toggleSubMenu(item.name)">
                        <span v-html="item.icon"></span> {{ item.name }}
                        <i class="fas fa-chevron-down"></i>
                    </a>
                    <ul v-if="isSubMenuOpen(item.name)" class="list-unstyled">
                        <li v-for="subItem in item.children" :key="subItem.path">
                            <NuxtLink :to="subItem.path">
                                <span v-html="subItem.icon"></span> {{ subItem.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <NuxtLink :to="item.path">
                        <!-- Không có thẻ này nó bind dạng text đó-->
                        <span v-html="item.icon"></span> {{ item.name }}
                    </NuxtLink>
                </template>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
nav ul {
    list-style: none;
    padding: 0;
}

nav li {
    margin: 5px 0;
}

nav a {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav ul ul {
    padding-left: 20px;
}
</style>