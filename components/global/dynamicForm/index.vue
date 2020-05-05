<template>
  <div class="dn-form">
    <div v-show="showLoading" class="dn-form__loading">
      <LoadingAnimation color="#f42241" size="50px" />
    </div>
    <transition name="fade">
      <div v-show="!showLoading" class="dn-form__content">
        <h2 class="dn-form__title">{{ title }}</h2>
        <div ref="parentCtn" />
      </div>
    </transition>
  </div>
</template>

<script src="./script.js"></script>
<style src="./styles.scss" lang="scss"></style>
