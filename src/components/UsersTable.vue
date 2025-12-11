<template>
  <div class="card shadow-sm">
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">
                <i class="bi bi-person me-1"></i>Nombre
              </th>
              <th scope="col">
                <i class="bi bi-envelope me-1"></i>Email
              </th>
              <th scope="col">
                <i class="bi bi-card-text me-1"></i>Documento
              </th>
              <th scope="col">
                <i class="bi bi-calendar-event me-1"></i>Fecha Nacimiento
              </th>
              <th scope="col" style="width: 220px;" class="text-center">
                <i class="bi bi-gear me-1"></i>Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="users.length === 0">
              <td colspan="6" class="text-center text-muted py-4">
                <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                No hay usuarios registrados
              </td>
            </tr>

            <tr v-for="u in users" :key="u.id">
              <td class="fw-bold">{{ u.id }}</td>
              <td>{{ u.name || u.nombre }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.documento || 'N/A' }}</td>
              <td>{{ u.fechaNacimiento || 'N/A' }}</td>

              <td class="text-center">
                <div class="action-buttons">
                  <button
                    class="btn btn-warning btn-action"
                    @click="$emit('edit', u)"
                    title="Editar usuario"
                  >
                    <i class="bi bi-pencil-fill me-1"></i>
                    Editar
                  </button>

                  <button
                    class="btn btn-danger btn-action"
                    @click="$emit('delete', u)"
                    title="Eliminar usuario"
                  >
                    <i class="bi bi-trash-fill me-1"></i>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['edit', 'delete']
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.table > thead {
  position: sticky;
  top: 0;
  background: #f8f9fa;
  z-index: 10;
}

.table > thead th {
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  padding: 1rem 0.75rem;
}

.table > tbody td {
  padding: 0.75rem;
  vertical-align: middle;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.btn-action {
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  min-width: 90px;
  min-height: 38px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  white-space: nowrap;
}

.btn-action i {
  font-size: 1.1rem;
}

.btn-warning.btn-action {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  border: none;
  color: white;
  box-shadow: 0 2px 4px rgba(255, 193, 7, 0.3);
}

.btn-warning.btn-action:hover {
  background: linear-gradient(135deg, #ffb300, #ff8f00);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 193, 7, 0.4);
}

.btn-danger.btn-action {
  background: linear-gradient(135deg, #dc3545, #c82333);
  border: none;
  color: white;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
}

.btn-danger.btn-action:hover {
  background: linear-gradient(135deg, #c82333, #bd2130);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4);
}



.table-hover tbody tr {
  transition: all 0.2s ease;
}

.table-hover tbody tr:hover {
  background-color: rgba(106, 0, 255, 0.05);
  transform: scale(1.01);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Animación de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

tbody tr {
  animation: fadeIn 0.3s ease;
}
</style>
