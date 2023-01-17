<template>
  <a-layout class="layout">
    <a-layout-header>
      <menu-component/>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view/>
    </a-layout-content>
  </a-layout>
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

<style lang="scss" scoped>
.layout {
  height: 100%;
}

.content {
  background: lightgrey;
  padding: 5rem;
  height: 100%;
  overflow: auto;
}
</style>
