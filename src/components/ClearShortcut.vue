<template>
  <a-modal :visible="visible" title="Clear Shortcut" @cancel="closeModal" @ok="clear">
    <div class="ant-modal-body">
      <clear-outlined class="icon"/>
      <p>Are you sure delete data?</p>
    </div>
  </a-modal>
</template>

<script>
import {ClearOutlined} from "@ant-design/icons-vue";
import {deleteAll} from "@/storage/crud";
import {ipcRenderer} from "electron";

export default {
  name: 'ClearAllShortcut',
  props: ['open', 'close'],
  components: {
    ClearOutlined
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    open: function () {
      this.openModal();
    },
    close: function () {
      this.closeModal();
    }
  },
  methods: {
    openModal() {
      this.visible = true
    },
    closeModal() {
      this.visible = false
    },
    clear() {
      this.closeModal()
      deleteAll()
        .then(() => {
          alert('All data are deleted successfully')
          ipcRenderer.send('reload-shortcut-list')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-modal-body {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
}

.icon {
  color: #096dd9;
  font-size: 25px;
}
</style>