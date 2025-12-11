<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-0">
          <i class="bi bi-box-seam-fill me-2"></i>Productos
        </h2>
        <small class="text-muted">Gestiona tu inventario de productos</small>
      </div>
      <button class="btn btn-primary btn-nuevo" @click="nuevoProducto">
        <i class="bi bi-plus-circle me-2"></i>
        Nuevo Producto
      </button>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="p in productos" :key="p.id">
        <div class="card shadow-sm product-card">

          <img
            :src="p.image || '/no_image.png'"
            class="card-img-top"
            style="height: 200px; object-fit: cover;"
            alt="Imagen del producto"
          />

          <div class="card-body">
            <h5 class="card-title">{{ p.title }}</h5>

            <p class="card-text text-muted">
              {{ p.description }}
            </p>

            <p class="product-price">
              <strong>${{ p.price }}</strong>
            </p>

            <div class="action-buttons-product">
              <button
                class="btn btn-warning btn-action-product"
                @click="editarProducto(p)"
              >
                <i class="bi bi-pencil-fill me-1"></i>
                Editar
              </button>
              <button
                class="btn btn-danger btn-action-product"
                @click="eliminarProducto(p.id)"
              >
                <i class="bi bi-trash-fill me-1"></i>
                Eliminar
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>

    <ProductModal
      ref="productoModal"
      :product="productoEdit"
      @save="guardarProducto"
    />

  </div>
</template>

<script>
import ProductModal from "../components/ProductModal.vue";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsService.js";

export default {
  components: { ProductModal },

  data() {
    return {
      productos: [],
      productoEdit: null,
    };
  },

  async mounted() {
    this.cargarProductos();
  },

  methods: {
    async cargarProductos() {
      this.productos = await getProducts();
    },

    nuevoProducto() {
      this.productoEdit = null;
      this.$refs.productoModal.show();
    },

    editarProducto(prod) {
      this.productoEdit = { ...prod };
      this.$refs.productoModal.show();
    },

    async eliminarProducto(id) {
      if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
      await deleteProduct(id);
      this.cargarProductos();
    },

    async guardarProducto(data) {
      const cleanProduct = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        image: data.image,
        stock: data.stock,
        status: data.status,
      };

      if (this.productoEdit) {
        await updateProduct(this.productoEdit.id, cleanProduct);
      } else {
        await createProduct(cleanProduct);
      }

      this.cargarProductos();
    },
  },
};
</script>

<style scoped>
.product-card {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(106, 0, 255, 0.15) !important;
  border-color: var(--primary-1);
}

.card-img-top {
  border-bottom: 2px solid #f0f0f0;
}

.card-title {
  background: linear-gradient(90deg, var(--primary-1), var(--primary-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.product-price {
  font-size: 1.5rem;
  color: var(--primary-1);
  margin: 1rem 0;
}

.action-buttons-product {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 1rem;
}

.btn-action-product {
  flex: 1;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.btn-action-product i {
  font-size: 1rem;
}

.btn-warning.btn-action-product {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  border: none;
  color: white;
  box-shadow: 0 2px 4px rgba(255, 193, 7, 0.3);
}

.btn-warning.btn-action-product:hover {
  background: linear-gradient(135deg, #ffb300, #ff8f00);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 193, 7, 0.5);
}

.btn-danger.btn-action-product {
  background: linear-gradient(135deg, #dc3545, #c82333);
  border: none;
  color: white;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
}

.btn-danger.btn-action-product:hover {
  background: linear-gradient(135deg, #c82333, #bd2130);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.5);
}

.btn-nuevo {
  background: linear-gradient(135deg, var(--primary-1), var(--primary-2));
  border: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 2px 8px rgba(106, 0, 255, 0.3);
  transition: all 0.3s ease;
}

.btn-nuevo:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(106, 0, 255, 0.5);
}

/* Animación de entrada */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card {
  animation: fadeInUp 0.5s ease;
}
</style>
