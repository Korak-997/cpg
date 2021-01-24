<template>
  <div id="home" class="wraper">
    <div class="main">
      <div v-show="colors.length > 0" class="colors"></div>
      <div @mouseover="changeBg()" id="canva">
        <p>1) Move Your mouse around to generate colors.</p>
        <p>2) Click to save the color to your pallete.</p>
      </div>
    </div>
    <div class="controls">Controls will be here</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      colors: [],
    };
  },
  methods: {
    changeBg() {
      document.getElementById("canva").style.backgroundColor = "rgb(0, 0, 0)";
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  #canva {
    width: 95%;
    &:hover {
      cursor: pointer;
    }
  }
}
.controls {
  width: 60%;
  margin: 0.3em auto;
}
</style>
