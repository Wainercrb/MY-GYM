<template>
  <div class="dn-table">
    <h2 class="dn-table__title">{{ title }}</h2>
    <table class="dn-table__table">
      <thead>
        <tr class="dn-table__tr">
          <th
            v-for="(th, index) in thead"
            :key="`tr-${index}`"
            class="dn-table__th"
          >
            {{ th }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tr, trIndex) in data"
          :key="`tr-${trIndex}`"
          class="dn-table__tr"
        >
          <td
            v-for="(td, tdIndex) in tr"
            :key="`tr-${tdIndex}`"
            v-show="tdIndex !== '_id'"
            class="dn-table__td"
          >
            {{ td }}
          </td>
          <td class="dn-table__td">
            <div class="dn-table__acciones">
              <button @click="editRecord(tr)">Editar</button>
              <button @click="deleteRecord(tr)">Eliminar</button>
              <button @click="updateRecord(tr)">Actualizar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script src="./script.js"></script>
<style src="./styles.scss" lang="scss"></style>
