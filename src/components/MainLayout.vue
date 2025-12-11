<template>
  <div class="main-layout">
    <!-- Navbar -->
    <NavbarComponent
      @toggle-sidebar="sidebarVisible = !sidebarVisible"
      :show-login="!isAuthenticated"
    />

    <!-- Sidebar + Contenido -->
    <div class="layout-container">
      <!-- Sidebar desplegable -->
      <SidebarComponent
        :visible="sidebarVisible"
        @report="generateReport"
      />

      <!-- Overlay para cerrar sidebar en móvil -->
      <div
        v-if="sidebarVisible"
        class="sidebar-overlay"
        @click="sidebarVisible = false"
      ></div>

      <!-- Contenido principal -->
      <main class="main-content">
        <router-view />
        <FooterComponent />
      </main>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  },

  data() {
    return {
      sidebarVisible: window.innerWidth > 768, // Abierto en desktop por defecto
      isAuthenticated: false
    };
  },

  mounted() {
    this.checkAuth();
    window.addEventListener('resize', this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    checkAuth() {
      const user = sessionStorage.getItem('wichofit_user');
      this.isAuthenticated = !!user;
    },

    handleResize() {
      if (window.innerWidth > 768) {
        this.sidebarVisible = true;
      } else {
        this.sidebarVisible = false;
      }
    },

    generateReport() {
      alert('Función de generar reporte - Por implementar');
    }
  }
};
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-container {
  display: flex;
  flex: 1;
  position: relative;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  transition: margin-left 0.3s ease;
}

/* Sidebar visible en desktop */
@media (min-width: 769px) {
  .main-content {
    margin-left: 250px;
  }
}

/* Overlay para móvil */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
  }

  .main-content {
    margin-left: 0;
  }
}
</style>
