<template>
  <a-modal :visible="visible" title="Clear Shortcut" @ok="closeModal" @cancel="closeModal">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script>
export default {
  name: 'ClearAllShortcut',
  props: ['open', 'close'],
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
    }
  }
}
</script>