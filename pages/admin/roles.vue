<template>
  <div class="role">
    <DynamicForm
      :title="'Nuevo Usuario'"
      :myForm="myForm"
      :eventBusEvent="'EventBusRole'"
      class="role__form"
    />
    <DynamicTable
      :title="'Lista de Roles'"
      :data="roles"
      :thead="thead"
      class="role__table"
    />
  </div>
</template>

<script src="~/assets/scripts/pages/role.js"></script>
<style src="~/assets/styles/pages/role.scss" lang="scss"></style>
