<template>
  <div id="dashboard" class="wraper">
    <h1>Welcome to your Dashboard</h1>
    <div v-show="palletes.length == 0" id="info">
      <h1>You do not have any saved palletes.</h1>
      <h1>Go to Home Page and Save a pallete or more. </h1>
      <h1>Then you can see all your palletes here.</h1>
    </div>
    <div v-show="palletes.length > 0" v-for="pallete in palletes" :key="pallete" class="palletes">
      <div class="colors">
        <p v-for="color in pallete.colors" :key="color" class="color" >
          <span>{{color}}</span>
        </p>
      </div>
      <div class="controls">
        <button @click="removePallete(pallete.id)">
          <img src="../assets/delete.png" alt="delete">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return{
      palletes: []
    }
  },
  created() {
    this.palletes = JSON.parse(localStorage.getItem("palletes") || "[]");
    this.$nextTick(() => {
      document.querySelectorAll(".color").forEach((x) =>{
        x.style.background = `${x.childNodes[0].innerText}`
        x.childNodes[0].style.display = "none"
      })
    })
  },
  methods:{
    removePallete(id) {
      let index = 0
      this.palletes.forEach((pallete)=>{
        if (pallete.id == id) {
          index = this.palletes.indexOf(pallete);
        }
      })
      alert('You really want to Delete your Pallete ?')
      this.palletes.splice(index, 1);
      localStorage.setItem("palletes", JSON.stringify(this.palletes));
    }
  }
};
</script>

<style scoped lang="scss">
#dashboard{
  text-align: center;
  height: fit-content !important;
  padding: 1.8em;
  width: 90%;
  h1{
    color:$dark-blue;
  }
  #info{
    width: 70%;
    box-shadow: $shadow;
    margin: 2rem auto;
    padding: 1rem;
  }
  .palletes{
    box-shadow: $shadow;
    margin: 1rem;
    padding: .5em;
    .controls{
      margin: 1rem;
      height: fit-content;
      button{
        background-color: $dark-blue;
        color: $white;
        border: none;
        padding: .2em;
        &:hover{
          box-shadow: $shadow;
          cursor: pointer;
        }
        img{
          width: 1.5rem;
          height: auto;
        }
      }
    }
    .colors{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      p{
        width: 10%;
        height: 6rem;
        span{
          font-size: 1.2rem;
				  color: $white;
				  font-family: 'ubuntu';
				  text-shadow: 1px 1px 1px #000, 3px 3px 5px black;
        }
      }
    }
  }
}
</style>
