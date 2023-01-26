<template>
  <a-layout class="layout">
    <a-layout-header>
      <menu-component @refresh="refresh"/>
    </a-layout-header>
    <a-layout-content class="content">
      <shortcut-view :shortcuts="shortcuts" @refresh="refresh"/>
    </a-layout-content>
    <a-layout-footer>
      <footer-component :size="shortcuts.length"/>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import MenuComponent from "@/components/Menu.vue";
import ShortcutView from '@/views/ShortcutView.vue'

import { getAllShortcut } from "@/storage/crud";

export default {
  name: 'HomeView',
  components: {
    FooterComponent,
    MenuComponent,
    ShortcutView
  },
  data() {
    return {
      shortcuts: [],
      size: 0
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      getAllShortcut().then((rows) => {
        if (rows && rows.length > 0) {
          this.shortcuts = rows;
          this.size = rows.length;
        }
      });
    }
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
