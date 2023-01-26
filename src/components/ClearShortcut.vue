<template>
  <a-modal
    :visible="visible"
    title="Clear Shortcut"
    @cancel="closeModal"
    @ok="clear"
  >
    <div class="ant-modal-body">
      <a-icon type="delete" class="icon" />
      <p>Are you sure delete data?</p>
    </div>
  </a-modal>
</template>

<script>
import { deleteAll } from "@/storage/crud";

export default {
  name: "ClearAllShortcut",
  props: ["open", "close"],
  emits: ['refresh'],
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
    clear() {
      deleteAll().then(() => {
        this.$notification.success({
          message: "All data are deleted successfully"
        });
        this.refresh();
        this.closeModal();
      });
    },
    refresh() {
      this.$emit('refresh');
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