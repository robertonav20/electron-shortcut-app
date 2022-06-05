<template>
  <div class="shortcuts-container">
    <button class="shortcut-button" @click="action('https://google.it')">
      <ChromeFilled class="shortcut-button-icon"/>
    </button>
    <button class="shortcut-button">
      <FolderFilled class="shortcut-button-icon" @click="action('file:/home/rob')"/>
    </button>
    <button class="shortcut-button">
      <FacebookFilled class="shortcut-button-icon" @click="action('https://facebook.com')"/>
    </button>
  </div>
</template>

<script>
import { shortcutLaunchByCMD } from "@/service/shortcut";
import { ChromeFilled, FolderFilled, FacebookFilled } from '@ant-design/icons-vue';

export default {
  name: 'ShortcutsView',
  components: {
    ChromeFilled,
    FolderFilled,
    FacebookFilled
  },
  data() {
    return {
      iconStyle: {
        fontSize: '20px',
        color: '#096dd9'
      }
    }
  },
  methods: {
    action(cmd) {
      shortcutLaunchByCMD(cmd)
    }
  }
}
</script>

<style scoped lang="scss">
.shortcuts-container {
  margin-top: 5rem;
  display: flex;
  justify-content: space-evenly;
}

.shortcut-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border: 1px #096dd9 solid;
  border-radius: 25%;
  padding: 10px;
  box-shadow: 1px 2px #096dd9;
  color: #096dd9;
}

.shortcut-button:hover {
  background: white;
  border: 1px #4B4B4BF7 solid;
  box-shadow: 1px 2px #4B4B4BF7;
  color: #4B4B4BF7;
}

.shortcut-button:active {
  background: #489BFFF7;
  border: 1px #096dd9 solid;
  box-shadow: 1px 2px #096dd9;
  color: white;
}

.shortcut-button-icon {
  font-size: 20px;
  color: inherit;
}

.shortcut-button-icon:hover {
  font-size: 20px;
}

.shortcut-button-icon:active {
  font-size: 20px;
}
</style>