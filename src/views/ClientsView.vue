<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-0">
          <i class="bi bi-person-badge-fill me-2"></i>Gestión de Clientes
        </h2>
        <small class="text-muted">Administra la base de datos de clientes</small>
      </div>
      <button class="btn btn-primary">
        <i class="bi bi-plus-circle me-2"></i>Nuevo Cliente
      </button>
    </div>

    <div class="card shadow-sm p-4">
      <div class="text-center text-muted py-5">
        <i class="bi bi-people fs-1 d-block mb-3"></i>
        <h5>Módulo de Clientes</h5>
        <p>Esta sección está en desarrollo</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientsView'
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}
</style>
