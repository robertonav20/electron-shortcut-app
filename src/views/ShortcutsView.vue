<template>
  <div class="shortcuts-container">
    <div class="shortcut-button-card" v-for="(s, index) in shortcuts" :key="index">
      <div class="shortcut-button-card-header">
        <span class="shortcut-button-title">{{s.title}}</span>
        <div class="delete-button-container">
          <DeleteFilled key="delete" class="delete-button" @click="deleteShortcut(s.id)"/>
        </div>
      </div>
      <div class="shortcut-button-card-content">
        <a-button class="shortcut-button" shape="circle" :size="s.size" type="primary" @click="action(s.action)">
        <template #icon>
          <ChromeFilled class="shortcut-button-icon"/>
        </template>
      </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {ChromeFilled, DeleteFilled} from '@ant-design/icons-vue';
import {shortcutLaunchByCMD} from "@/service/shortcut";
import {getAllShortcut, removeShortcut} from "@/storage/crud";

export default {
  name: 'ShortcutsView',
  components: {
    ChromeFilled,
    DeleteFilled
  },
  data() {
    return {
      shortcuts: []
    }
  },
  mounted() {
    this.getAll();
  },
  methods: {
    action(cmd) {
      shortcutLaunchByCMD(cmd)
    },
    getAll() {
      getAllShortcut().then(rows => {
        if (rows && rows.length > 0) {
          this.shortcuts = rows
        }
      })
    },
    deleteShortcut(id) {
      removeShortcut(id)
      this.shortcuts = this.shortcuts.filter(s => s.id !== id)
    }
  }
}
</script>

<style lang="scss" scoped>
.shortcuts-container {
  display: flex;
  justify-content: space-evenly;
  align-content: space-evenly;
  flex-wrap: wrap;
  flex-grow: 2;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
}

.shortcut-button-card {
  min-width: 130px;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
}

.shortcut-button-card-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px #f0f0f0 solid;
}

.shortcut-button-title {
  color: inherit;
  font-size: inherit;
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 16px;
}

.delete-button-container {
  padding: 0.3rem;
  background-color: firebrick;
  border-radius: 0 1rem 0 0;
}

.delete-button-container:hover {
  background-color: #DA4D4DF9;
}

.delete-button-container:active {
  background-color: #4B4B4BF7;
}

.delete-button {
  font-size: 20px;
  color: white;
  padding: 0.2rem;
}

.shortcut-button-card-content {
  min-height: 100px;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shortcut-button {
  background: #096dd9;
  border: 1px #096dd9 solid;
  box-shadow: 1px 2px #489BFFF7;
  color: white;
}

.shortcut-button:hover {
  background: white;
  border: 1px #4B4B4BF7 solid;
  box-shadow: 1px 2px #4B4B4BF7;
  color: #4B4B4BF7;
}

.shortcut-button:active {
  background: #489BFFF7;
  border: 1px #489BFFF7 solid;
  box-shadow: none;
  color: white;
}

.shortcut-button-icon {
  font-size: 25px;
  color: inherit;
}
</style>