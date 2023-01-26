<template>
  <a-modal
    :visible="visible"
    title="Export Shortcut"
    @cancel="closeModal"
    @ok="exportAll"
  >
    <div class="ant-modal-body">
      <a-icon type="export" class="icon" />
      <p>Are you sure export all data?</p>
    </div>
  </a-modal>
</template>

<script>
import { getAllShortcut } from "@/storage/crud";
import { showSaveDialog, exportFile } from "@/service/utils";

export default {
  name: "ExportShortcut",
  props: ["open", "close"],
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    open: function () {
      this.openModal();
    },
    close: function () {
      this.closeModal();
    },
  },
  methods: {
    openModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    exportAll() {
      getAllShortcut().then((rows) => {
        const options = {
          title: "Export shortcuts",
          defaultPath: "export_shortcuts.json",
          buttonLabel: "Export",
          filters: [{ name: "json", extensions: ["json"] }],
        };
        showSaveDialog(options).then(({ filePath }) => {
          if (filePath != undefined && filePath != "") {
            exportFile(filePath, JSON.stringify(rows), "utf-8").then(() => {
              this.$notificatio.success({
                message: "All data exported successfully here " + filePath
              });
            });
          }
        });
        this.closeModal();
      });
    }
  },
};
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