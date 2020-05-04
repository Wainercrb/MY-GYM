<template>
  <div class="role">
    <div class="role__form">
      <DynamicForm :title="'Nuevo Rol'" :myForm="myForm" :states="states" />
    </div>
    <div class="role__table">
      <DynamicTable
        :title="'Lista de Roles'"
        :data="roles"
        :thead="thead"
        :states="states"
      />
    </div>
  </div>
</template>

<script src="~/assets/scripts/pages/role.js"></script>
<style src="~/assets/styles/pages/role.scss" lang="scss"></style>
