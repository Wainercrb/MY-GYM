<template>
  <div class="dn-table">
    <div v-if="showLoading" class="dn-table__loading">
      <LoadingAnimation color="#f42241" size="50px" />
    </div>
    <transition name="fade">
      <div v-if="!showLoading" class="dn-table__content">
        <h2 class="dn-table__title">{{ title }}</h2>
        <div class="dn-table__filter">
          <input
            class="dn-table__input-filter"
            placeholder="Buscar"
            type="text"
          />
          <button class="dn-table__btn-filter">Buscar</button>
        </div>
        <div class="dn-table__table-responsive">
          <table class="dn-table__table">
            <thead>
              <tr class="dn-table__tr">
                <th
                  v-for="(th, index) in tableThead"
                  :key="`tr-${index}`"
                  :title="th.title"
                  @click="$emit('sortRecord', th)"
                  class="dn-table__th"
                >
                  {{ th.title }}
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
                  v-show="tdIndex !== '_id'"
                  :key="`tr-${tdIndex}`"
                  :title="td"
                  class="dn-table__td"
                >
                  {{ typeof td === 'object' ? td.toLocaleDateString() : td }}
                </td>
                <td class="dn-table__td">
                  <div class="dn-table__acciones">
                    <button @click="$emit('edit', tr)">Editar</button>
                    <button @click="$emit('delete', tr)">Eliminar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./script.js"></script>
<style src="./styles.scss" lang="scss"></style>
