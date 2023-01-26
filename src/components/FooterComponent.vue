<template>
  <div class="footer-container">Shortcut size {{ size }}</div>
</template>

<script>
export default {
  name: "FooterComponent",
  props: ['size'],
  data() {
    return {
      data: 0
    };
  },
  watch: {
    size: function (data) {
      this.data = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-container {
  min-width: 20px;
  text-align: center;
}
</style>
