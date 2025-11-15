<template>
  <div class="d-flex dashboard-container">
    <!-- Sidebar -->
    <SidebarComponent :visible="sidebarVisible" @report="generateReport" />

    <!-- Contenedor principal -->
    <div class="flex-fill d-flex flex-column">
      <!-- Navbar -->
      <NavbarComponent :userName="user.name" @toggle-sidebar="toggleSidebar" />

      <!-- Contenido de vistas -->
      <main class="p-4 flex-grow-1 overflow-auto">
        <router-view />
      </main>

      <!-- Footer -->
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import SidebarComponent from '../components/SidebarComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  components: { SidebarComponent, NavbarComponent, FooterComponent },

  data() {
    return {
      sidebarVisible: true,
      user: { name: 'Usuario' },
    }
  },

  mounted() {
    const u = sessionStorage.getItem('wichofit_user')
    if (u) this.user = JSON.parse(u)
  },

  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    },

    generateReport() {
      alert('Función de reporte (placeholder).')
    },
  },
}
</script>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
</style>