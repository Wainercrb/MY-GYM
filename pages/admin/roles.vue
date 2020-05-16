<template>
  <div class="role">
    <div class="role__form">
      <DynamicForm
        @submit="submit"
        :pageIsLoading="formIsLoading"
        :title="'Mantenimiento Rol'"
        :form="form"
      />
    </div>
    <div class="role__table">
      <DynamicTable
        @edit="editRole"
        @delete="deleteRole"
        @sortRecord="sortRecord"
        :pageIsLoading="tableIsLoading"
        :title="'Lista de Roles'"
        :tableThead="tableThead"
        :data="roles"
      />
    </div>
  </div>
</template>

<script src="~/assets/scripts/pages/role.js"></script>
<style src="~/assets/styles/pages/role.scss" lang="scss"></style>
