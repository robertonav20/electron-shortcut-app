<template>
  <div class="home">
    <MenuComponent/>
    <router-view/>
  </div>
</template>

<script>
import MenuComponent from '@/components/Menu.vue'

export default {
  name: 'HomeView',
  components: {
    MenuComponent
  }
}
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;
}
</style>
