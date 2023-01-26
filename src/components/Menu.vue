<template>
  <a-menu :selectedKeys="current" mode="horizontal" theme="dark" class="menu-container">
    <a-sub-menu key="settings">
      <template #icon>
        <a-icon type="setting" theme="filled" :style="iconStyle" />
      </template>
      <template #title>Settings</template>
      <a-menu-item-group title="Shortcuts">
        <a-menu-item key="add" @click="openAddDialog">Add</a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="DB Configuration">
        <a-menu-item key="clear" @click="openClearDialog">Clear</a-menu-item>
        <a-menu-item key="import" @click="openImportDialog">Import</a-menu-item>
        <a-menu-item key="export" @click="openExportDialog">Export</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>
    <add-shortcut :open="addTrigger" />
    <clear-shortcut :open="clearTrigger" />
    <import-shortcut :open="importTrigger" />
    <export-shortcut :open="exportTrigger" />
  </a-menu>
</template>

<script>
import { ref } from "vue";
import AddShortcut from "@/components/AddShortcut";
import ClearShortcut from "@/components/ClearShortcut";
import ImportShortcut from "@/components/ImportShortcut";
import ExportShortcut from "@/components/ExportShortcut";
export default {
  name: "MenuComponent",
  components: {
    AddShortcut,
    ClearShortcut,
    ExportShortcut,
    ImportShortcut,
  },
  data() {
    return {
      current: ref(["shortcuts"]),
      iconStyle: {
        fontSize: "24px",
        color: "#096dd9",
      },
      addTrigger: false,
      clearTrigger: false,
      importTrigger: false,
      exportTrigger: false,
    };
  },
  methods: {
    openAddDialog() {
      this.addTrigger = !this.addTrigger;
    },
    openClearDialog() {
      this.clearTrigger = !this.clearTrigger;
    },
    openImportDialog() {
      this.importTrigger = !this.importTrigger;
    },
    openExportDialog() {
      this.exportTrigger = !this.exportTrigger;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  padding: 0.5rem;
}
</style>
