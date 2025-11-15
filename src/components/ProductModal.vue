<template>
  <div class="modal fade" tabindex="-1" ref="modalElement">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">

        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">
            {{ product ? "Editar Producto" : "Nuevo Producto" }}
          </h5>
          <button type="button" class="btn-close" @click="hide"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <form @submit.prevent="guardar">

            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input v-model="form.title" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Precio</label>
              <input v-model.number="form.price" type="number" min="1" step="0.01" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea v-model="form.description" class="form-control" rows="3" required></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Imagen (URL)</label>
              <input v-model="form.image" type="text" class="form-control" placeholder="https://ruta.com/imagen.jpg" />
              <small class="text-muted">Si no ingresas una imagen válida, se usará la imagen por defecto.</small>
            </div>

          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="hide">Cancelar</button>
          <button class="btn btn-primary" @click="guardar">Guardar</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  props: {
    product: { type: Object, default: null },
  },

  data() {
    return {
      modal: null,
      form: {
        title: "",
        price: "",
        description: "",
        image: "",
      },
    };
  },

  watch: {
    product: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = {
            title: newVal.title || "",
            price: newVal.price || "",
            description: newVal.description || "",
            image: newVal.image || "",
          };
        } else {
          this.form = {
            title: "",
            price: "",
            description: "",
            image: "",
          };
        }
      },
    },
  },

  mounted() {
    this.modal = new Modal(this.$refs.modalElement);
  },

  methods: {
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },

    guardar() {
      if (!this.form.title || !this.form.price || !this.form.description) {
        alert("Todos los campos son obligatorios");
        return;
      }

      if (!this.form.image) {
        this.form.image = "/no-image.png"; // fallback automático
      }

      this.$emit("save", { ...this.form });
      this.hide();
    },
  },
};
</script>

<style scoped>
.modal-content {
  border-radius: 12px;
}
</style>