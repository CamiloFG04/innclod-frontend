<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Innclod </q-toolbar-title>

        <div>Usuario {{ name }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> MENU </q-item-label>
        <q-item
          v-for="item in options"
          :key="item.title"
          clickable
          v-ripple
          @click="item.click"
        >
          <q-item-section avatar>
            <q-icon color="primary" :name="item.icon" />
          </q-item-section>

          <q-item-section>{{ item.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/useAuth';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();
const name = authStore.user?.name;
const logout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};
interface Props {
  title: string;
  icon?: string;
  click: () => void;
}

const options: Props[] = [
  {
    title: 'Cerrar sesión',
    icon: 'logout',
    click: logout,
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
