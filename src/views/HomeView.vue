<template>
  <a-layout class="layout">
    <a-layout-header>
      <menu-component/>
    </a-layout-header>
    <a-layout-content class="content">
      <shortcut-view/>
    </a-layout-content>
    <a-layout-footer>
      <footer-component/>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import MenuComponent from "@/components/Menu.vue";
import ShortcutView from '@/views/ShortcutView.vue'

export default {
  name: 'HomeView',
  components: {
    FooterComponent,
    MenuComponent,
    ShortcutView
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
