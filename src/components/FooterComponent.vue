<template>
  <div class="footer-container">Size {{ size }}</div>
</template>

<script>
import { countAllShortcut } from "@/storage/crud";

export default {
  name: "FooterComponent",
  data() {
    return {
      size: 0
    };
  },
  mounted() {
    countAllShortcut().then(res => {
      if (res.CNT) {
        this.size = res.CNT
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.footer-container {
  min-width: 20px;
  text-align: center;
}
</style>
