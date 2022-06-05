<template>
  <div class="container">
    <a-menu v-model:selectedKeys="current" mode="horizontal" @select="go">
      <a-menu-item key="shortcuts">
        <template #icon>
          <AppstoreFilled :style="iconStyle"/>
        </template>
        Shortcuts
      </a-menu-item>
      <a-menu-item key="settings">
        <template #icon>
          <SettingFilled :style="iconStyle"/>
        </template>
        Settings
      </a-menu-item>
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

<style scoped lang="scss">
</style>
