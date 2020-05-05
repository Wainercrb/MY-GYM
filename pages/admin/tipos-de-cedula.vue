<template>
  <div class="role">
    <DynamicForm
      :title="'Nuevo tipo de cedula'"
      :form="form"
      :eventBusEvent="'EventBusRole'"
      class="role__form"
    />
    <DynamicTable
      :title="'Lista de tipos de cudulas'"
      :data="identificationCards"
      :tableThead="tableThead"
      class="role__table"
    />
  </div>
</template>

<script src="~/assets/scripts/pages/identificationCardType.js"></script>
<style
  src="~/assets/styles/pages/identificationCardType.scss"
  lang="scss"
></style>
