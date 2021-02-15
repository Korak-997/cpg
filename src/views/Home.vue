<template>
  <div id="home" class="wraper">
    <div v-show="welcomeMessage" id="wlcMessage">
      <h3>Welcome to CPG</h3>
      <p>In order to be able to save the palletes you generate.</p>
      <p>We need you to allow using your Browser storage.</p>
      <p>After you push Save Pallete button.</p>
      <p>In a small window you will be asked to allow storage usage.</p>
      <p>Please click allow otherwise you will not be able to save your palletes.</p>
      <button @click="closeMessage()">OK</button>
    </div>
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
import { uuid } from "vue-uuid";
export default {
  name: "Home",
  data() {
    return {
      colors: [],
      rgbColor: "",
      welcomeMessage: true,
      hexColor: "",
      right: [255, 255, 255], //white
      left: [0, 0, 0], //black
      info: ""
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
      // this.colors.push(this.hexColor);
      console.log(this.id)
    },
    closeMessage(){
      this.welcomeMessage = false
    },
    savePallete() {
      localStorage.setItem("colors", JSON.stringify(this.colors))
      this.info = "";
      this.colors = [];
      document.getElementById("addColorBtn").disabled = false;
    },
    convertHexToRgb(hexString) {
      const arr = hexString.split("");
      const r = [`${arr[1]}`, `${arr[2]}`].join("");
      const g = [`${arr[3]}`, `${arr[4]}`].join("");
      const b = [`${arr[5]}`, `${arr[6]}`].join("");
      return [
        `${parseInt(r, 16)}`,
        `${parseInt(g, 16)}`,
        `${parseInt(b, 16)}`
      ];
    },
    generateRandomBg() {
      this.hexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

      document.getElementById("canva").style.backgroundColor = this.hexColor;
    }
  }
};
</script>

<style scoped lang="scss">
#wlcMessage{
  background-color: $dark-blue;
  width: 100%;
  height: 100%;
  position:fixed;
  z-index: 3;
  text-align: center;
  padding: 10rem;
  color: $white;
  font-size: 2rem;
  font-family: 'ubuntu';
  button{
    width: 50%;
    font-size: 2rem;
    margin-top: 2rem;
    background-color: $white;
    border: none;
    color: $dark-blue;
    &:hover{
      cursor:pointer;
      background-color: transparent;
      border: 2px solid $white;
      color: $white;
    }

  }
}
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
    button{
      width: 30%;
      font-size: 1.3rem;
      color: $white;
      background-color: $dark-blue;
      border: none;
      margin: .5em;
      padding: .4em;
      &:hover{
        border: 2px solid $dark-blue;
        color: $dark-blue;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }
}
</style>
