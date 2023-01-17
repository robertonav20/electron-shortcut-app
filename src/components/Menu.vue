<template>
  <div class="menu-container">
    <a-menu v-model:selectedKeys="current" mode="horizontal" theme="dark">
      <a-menu-item key="shortcuts">
        <template #icon>
          <appstore-filled :style="iconStyle"/>
        </template>
        Shortcuts
      </a-menu-item>
      <a-sub-menu key="settings">
        <template #icon>
          <setting-filled :style="iconStyle"/>
        </template>
        <template #title>Settings</template>
        <a-menu-item-group title="Shortcuts">
          <a-menu-item key="add" @click="this.addTrigger = !this.addTrigger">Add</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="DB Configuration">
          <a-menu-item key="clear" @click="this.clearTrigger = !this.clearTrigger">Clear</a-menu-item>
          <a-menu-item key="import" @click="this.importTrigger = !this.importTrigger">Import</a-menu-item>
          <a-menu-item key="export" @click="this.exportTrigger = !this.exportTrigger">Export</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
    <add-shortcut :open="addTrigger"/>
    <clear-shortcut :open="clearTrigger"/>
    <import-shortcut :open="importTrigger"/>
    <export-shortcut :open="exportTrigger"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import { AppstoreFilled, SettingFilled } from '@ant-design/icons-vue';
import AddShortcut from '@/components/AddShortcut';
import ClearShortcut from '@/components/ClearShortcut';
import ImportShortcut from '@/components/ImportShortcut';
import ExportShortcut from '@/components/ExportShortcut';
export default {
  name: 'MenuComponent',
  components: {
    AddShortcut,
    ClearShortcut,
    ExportShortcut,
    ImportShortcut,
    AppstoreFilled,
    SettingFilled
  },
  data() {
    return {
      current: ref(['shortcuts']),
      iconStyle: {
        fontSize: '24px',
        color: '#096dd9'
      },
      addTrigger: false,
      clearTrigger: false,
      importTrigger: false,
      exportTrigger: false
    }
  }
}
</script>
