<template>
  <div class="menu-container">
    <a-menu v-model:selectedKeys="current" mode="horizontal" @select="go" theme="dark">
      <a-menu-item key="shortcuts">
        <template #icon>
          <AppstoreFilled :style="iconStyle"/>
        </template>
        Shortcuts
      </a-menu-item>
      <a-sub-menu key="settings">
        <template #icon>
          <SettingFilled :style="iconStyle"/>
        </template>
        <template #title>Settings</template>
        <a-menu-item-group title="Shortcuts">
          <a-menu-item key="add">Add</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="DB Configuration">
          <a-menu-item key="import">Import</a-menu-item>
          <a-menu-item key="export">Export</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { ref } from 'vue';
import { AppstoreFilled, SettingFilled } from '@ant-design/icons-vue';
export default {
  name: 'MenuComponent',
  components: {
    AppstoreFilled,
    SettingFilled
  },
  data() {
    return {
      current: ref(['shortcuts']),
      iconStyle: {
        fontSize: '24px',
        color: '#096dd9'
      }
    }
  },
  methods: {
    go() {
      this.$router.push(this.current[0])
    }
  }
}
</script>
