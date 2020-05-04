<template>
  <div :style="rootStyle" class="ball-scale-multiple vue-loaders">
    <div :style="styles"></div>
    <div :style="styles"></div>
    <div :style="styles"></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingAnimation',
  props: {
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    rootStyle() {
      const size = this.size ? String(this.size) : null
      if (size) {
        return {
          width: size,
          height: size
        }
      }
      return {}
    },
    styles() {
      const size = this.size ? String(this.size) : null
      const color = this.color ? String(this.color) : null
      if (!color && !size) {
        return
      }
      const styles = {}
      if (size) {
        styles.width = styles.height = size
      }
      if (color) {
        styles.backgroundColor = color
      }
      return styles
    }
  }
}
</script>

<style>
.vue-loaders {
  display: inline-block;
  box-sizing: content-box;
}

.vue-loaders *,
.vue-loaders *:before,
.vue-loaders *:after {
  box-sizing: inherit;
}
.vue-loaders.ball-scale-multiple {
  transform: none;
  width: 60px;
  height: 60px;
}
.vue-loaders.ball-scale-multiple > div {
  top: auto;
  left: auto;
}

@keyframes ball-scale-multiple {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

.ball-scale-multiple {
  position: relative;
  -webkit-transform: translateY(-30px);
  transform: translateY(-30px);
}
.ball-scale-multiple > div:nth-child(2) {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.ball-scale-multiple > div:nth-child(3) {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.ball-scale-multiple > div {
  background-color: #fff;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  left: -30px;
  top: 0px;
  opacity: 0;
  margin: 0;
  width: 60px;
  height: 60px;
  -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
  animation: ball-scale-multiple 1s 0s linear infinite;
}
</style>
