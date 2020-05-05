<template>
  <div class="role">
    <div class="role__form">
      <DynamicForm :title="currentState.title" :form="form" :states="states" />
    </div>
    <div class="role__table">
      <DynamicTable
        :title="'Lista de Roles'"
        :data="roles"
        :tableThead="tableThead"
        :states="states"
      />
    </div>
  </div>
</template>

<script src="~/assets/scripts/pages/role.js"></script>
<style src="~/assets/styles/pages/role.scss" lang="scss"></style>
