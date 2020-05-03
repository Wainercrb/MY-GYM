<template>
  <nav :class="[`sidebar-${menuIsOpen ? 'open' : 'close'}`, 'sidebar']">
    <div @click="toggleSideMenu" class="sidebar__btn"></div>
    <header class="sidebar__header">
      <img
        class="sidebar__avatar"
        src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg"
      />
      <h2 class="sidebar__user">John D.</h2>
    </header>
    <ul class="sidebar__menu">
      <li class="sidebar__menu-item">
        <router-link to="/admin/tipos-de-cedula">
          <span>Dashboard</span>
        </router-link>
      </li>
      <li class="sidebar__menu-item">
        <router-link to="/admin/roles">
          <span>Customers</span>
        </router-link>
      </li>
      <li class="sidebar__menu-item">
        <span>Users</span>
      </li>
      <li class="sidebar__menu-item">
        <span>Settings</span>
      </li>
    </ul>
  </nav>
</template>

<script src="./script.js"></script>
<style src="./styles.scss" lang="scss"></style>
