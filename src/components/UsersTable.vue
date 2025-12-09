<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.nombre }}</td>
        <td>{{ user.email }}</td>

        <td>
          <button class="btn btn-warning btn-sm me-2" @click="$emit('edit', user)">
            Editar
          </button>
          <button class="btn btn-danger btn-sm" @click="$emit('delete', user)">
            Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["users"],
};
</script>
