<template>
  <div class="footer-container">
    <span class="footer-left-item">Shortcut size {{ size }}</span>
    <div class="footer-right-item">
      <a-tooltip title="Add">
        <a-button class="action-button" shape="circle" :size="'large'" type="primary" icon="plus" theme="filled"
          @click="openAddDialog">
        </a-button>
      </a-tooltip>
      <a-divider type="vertical" class="action-divider"/>
      <a-tooltip title="Refresh">
        <a-button class="action-button" shape="circle" :size="'large'" type="primary" icon="reload" theme="filled"
          @click="refresh">
        </a-button>
      </a-tooltip>
      <a-tooltip title="Import">
        <a-button class="action-button" shape="circle" :size="'large'" type="primary" icon="import" theme="filled"
          @click="openImportDialog">
        </a-button>
      </a-tooltip>
      <a-tooltip title="Export">
        <a-button class="action-button" shape="circle" :size="'large'" type="primary" icon="export" theme="filled"
          @click="openExportDialog">
        </a-button>
      </a-tooltip>
      <a-divider type="vertical" class="action-divider"/>
      <a-tooltip title="Clear">
        <a-button class="action-button" shape="circle" :size="'large'" type="primary" icon="delete" theme="filled"
          @click="openClearDialog">
        </a-button>
      </a-tooltip>
    </div>
    <add-shortcut :open="addTrigger" @refresh="refresh" />
    <clear-shortcut :open="clearTrigger" @refresh="refresh" />
    <import-shortcut :open="importTrigger" @refresh="refresh" />
    <export-shortcut :open="exportTrigger" />
  </div>
</template>

<script>
import AddShortcut from "@/components/AddShortcut";
import ClearShortcut from "@/components/ClearShortcut";
import ImportShortcut from "@/components/ImportShortcut";
import ExportShortcut from "@/components/ExportShortcut";
export default {
  name: "FooterComponent",
  props: ['size'],
  emits: ["refresh"],
  components: {
    AddShortcut,
    ClearShortcut,
    ExportShortcut,
    ImportShortcut,
  },
  data() {
    return {
      data: 0,
      addTrigger: false,
      clearTrigger: false,
      importTrigger: false,
      exportTrigger: false,
    };
  },
  watch: {
    size: function (data) {
      this.data = data;
    },
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
    refresh() {
      this.$emit("refresh");
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  min-width: 20px;
  width: 100%;
  justify-content: space-between;
}

.footer-left-item {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.footer-right-item {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  gap: 5px;
}

.action-button {
  background-color: #096dd9;
}

.action-divider {
  background-color: rgba(0, 0, 0, 0.65);
  width: 2px;
  height: 25px;
}
</style>
