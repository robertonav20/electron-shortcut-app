<template>
  <a-modal :visible="visible" title="Import Shortcut" @cancel="closeModal" @ok="importAll">
    <div class="ant-modal-body">
      <import-outlined class="icon" />
      <p>Are you sure import all data?</p>
    </div>
  </a-modal>
</template>

<script>
import { ImportOutlined } from '@ant-design/icons-vue';
import { addShortcut } from '@/storage/crud';
import { showOpenDialog, getCurrentWindow, send, readFile } from '@/service/utils'

export default {
  name: 'ImportShortcut',
  props: ['open', 'close'],
  components: {
    ImportOutlined
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
    importAll() {
      const options = {
        title: "Import shortcuts",
        buttonLabel: "Import",
        filters: [
          { extensions: ['json'] },
        ],
        properties: ['openFile']
      };
      showOpenDialog(getCurrentWindow(), options).then(({ filePaths }) => {
        if (filePaths != undefined && filePaths.length > 0) {
          const filename = filePaths[0]
          readFile(filename, 'utf-8', (err, data) => {
            const rows = JSON.parse(data)
            rows.forEach(row => addShortcut(row, false))
            alert('All data imported from file ' + filename)
            send('reload-shortcut-list')
          })
        }
      });
      this.closeModal()
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