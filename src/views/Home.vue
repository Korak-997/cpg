<template>
  <div id="home" class="wraper">
    <div class="main">
      <p id="info" v-show="info">{{ info }}</p>
      <div @click="generateRandomBg()" id="canva"></div>
    </div>
    <div class="footer">
      <div class="controls">
        <button @click="savePallete">Save Pallete</button>
        <button id="addColorBtn" @click="addColor()">Add Color</button>
      </div>
      <div v-show="colors.length > 0" id="pallete">
        <div v-for="color in colors" :key="color" class="color-div">
          <p>{{ color }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      colors: [],
      rgbColor: "",
      hexColor: "",
      right: [255, 255, 255], //white
      left: [0, 0, 0], //black
      info: "",
    };
  },
  updated() {
    document.querySelectorAll(".color-div").forEach((div) => {
      div.style.backgroundColor = `${div.childNodes[0].innerText}`;
    });
    if (this.colors.length == 15) {
      document.getElementById("addColorBtn").disabled = true;
      this.info = `You have 15 colors, 
				Please save your pallet. 
				Then you will be able to add new Colors`;
    }
  },
  methods: {
    addColor() {
      this.colors.push(this.hexColor);
    },
    savePallete() {
      this.info = "";
      this.colors = [];
      document.getElementById("addColorBtn").disabled = false;
    },
    darkenColor() {
      let color = this.convertHexToRgb("ff33dd");
      color.each((i) => {
        let num = parseInt(i, 10);
        while (num != 0) {
          num = num - 10;
        }
      });
      console.log(color);
    },
    convertHexToRgb(hexString) {
      const arr = hexString.split("");
      const r = [`${arr[1]}`, `${arr[2]}`].join("");
      const g = [`${arr[3]}`, `${arr[4]}`].join("");
      const b = [`${arr[5]}`, `${arr[6]}`].join("");
      return [
        `${parseInt(r, 16)}`,
        `${parseInt(g, 16)}`,
        `${parseInt(b, 16)})`,
      ];
    },
    generateRandomBg() {
      this.hexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

      document.getElementById("canva").style.backgroundColor = this.hexColor;
    },
    changeOpacity(e) {
      const canva = document.getElementById("canva");
      var positionX = e.pageX / canva.clientWidth;
      var positionY = e.pageY / canva.clientHeight;
      console.log(`
				X: ${positionX}
				Y: ${positionY}
			`);
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 92%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  #info {
    position: fixed;
    z-index: 3;
    box-shadow: $shadow;
    padding: 1rem;
    font-size: 1.8rem;
    font-family: "ubuntu";
    background-color: $light-blue;
    color: $white;
  }
  #canva {
    width: 100%;
    text-align: center;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
    p {
      color: $grey;
      font-size: 3rem;
    }
  }
}
.footer {
  width: 100%;
  height: 8%;
  margin: auto;
  display: flex;
  #pallete {
    width: 69%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 5rem;
      height: 3rem;
      margin: 0.2em;
      p {
        display: none;
      }
    }
  }
  .controls {
    width: 30%;
    box-shadow: $shadow;
  }
}
</style>
