<template>
  <div class="container">
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.identificationCard }} - {{ product.mail }}
        <br />
        <button
          :disabled="!product.inventory"
          @click="addProductToCart(product)"
        >
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script src="~/assets/scripts/pages/admin.js"></script>
<style src="~/assets/styles/pages/admin.scss" lang="scss"></style>
