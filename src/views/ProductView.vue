<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="gradient-title mb-0">Productos</h3>

      <button class="btn btn-primary-wicho" @click="nuevoProducto">
        + Nuevo Producto
      </button>
    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="loading" />

    <!-- Lista de productos -->
    <div class="row g-3" v-else>
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="p in productos"
        :key="p.id"
      >
        <ProductCardComponent
          :product="p"
          @view="abrirProducto"
          @addToCart="añadirCarrito"
          @delete="eliminarProducto"
        />
      </div>
    </div>

    <ProductModal
      ref="modal"
      :product="productoSeleccionado"
      @save="guardarProducto"
    />
  </div>
</template>

<script>
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api.js";

import ProductCardComponent from "../components/ProductCardComponent.vue";
import ProductModal from "../components/ProductModal.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  components: { ProductCardComponent, ProductModal, LoadingSpinner },

  data() {
    return {
      productos: [],
      loading: true,
      productoSeleccionado: null,
    };
  },

  async mounted() {
    await this.cargarProductos();
  },

  methods: {
    // Cargar productos desde API local simulada
    async cargarProductos() {
      this.loading = true;
      this.productos = await getProducts();
      this.loading = false;
    },

    abrirProducto(p) {
      this.productoSeleccionado = { ...p }; // evitar mutación directa
      this.$refs.modal.show();
    },

    nuevoProducto() {
      this.productoSeleccionado = null;
      this.$refs.modal.show();
    },

    async guardarProducto(data) {
      if (this.productoSeleccionado) {
        // EDITAR
        await updateProduct(this.productoSeleccionado.id, data);
      } else {
        // CREAR
        await createProduct(data);
      }
      await this.cargarProductos();
    },

    async eliminarProducto(producto) {
      if (!confirm(`¿Seguro que deseas eliminar "${producto.title}"?`)) return;

      await deleteProduct(producto.id);
      await this.cargarProductos();
    },

    añadirCarrito(p) {
      console.log("Añadido al carrito:", p);
    },
  },
};
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>
