<template>
  <div class="card p-3 mb-3">
    <h4>{{ editingUser ? "Editar Usuario" : "Crear Usuario" }}</h4>

    <form @submit.prevent="save">
      <!-- Nombre -->
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          v-model="localUser.name"
          required
        />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="localUser.email"
          required
        />
      </div>

      <!-- Password (solo crear) -->
      <div class="mb-3" v-if="!editingUser">
        <label class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="localUser.password"
          required
        />
      </div>

      <!-- Rol -->
      <div class="mb-3">
        <label class="form-label">Rol</label>
        <select class="form-select" v-model="localUser.rol" required>
          <option value="admin">Admin</option>
          <option value="usuario">Usuario</option>
        </select>
      </div>

      <!-- Botones -->
      <button class="btn btn-success me-2" type="submit">Guardar</button>

      <button class="btn btn-secondary" type="button" @click="$emit('close')">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import { createUser, updateUser } from "@/services/userService.js";

export default {
  props: ["editingUser"],

  data() {
    return {
      localUser: {
        name: "",
        email: "",
        password: "",
        rol: "usuario",
      },
    };
  },

  mounted() {
    // Si viene un usuario para editar → llenar el formulario
    if (this.editingUser) {
      this.localUser = {
        ...this.editingUser,
        password: "", // no se edita password aquí
      };
    }
  },

  methods: {
    async save() {
      if (this.editingUser) {
        // EDITAR
        await updateUser(this.editingUser.id, this.localUser);
      } else {
        // CREAR
        await createUser(this.localUser);
      }

      this.$emit("saved");
      this.$emit("close");
    },
  },
};
</script>


