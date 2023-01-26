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
      console.log(res[0])
      if (res) {
        this.size = res
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
