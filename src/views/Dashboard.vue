<template>
  <div id="dashboard" class="wraper">
    <h1>Welcome to your Dashboard</h1>
    <div v-for="pallete in palletes" :key="pallete" class="palletes">
      <div class="colors">
        <p v-for="color in pallete.colors" :key="color" class="color" >
          <span>{{color}}</span>
        </p>
      </div>
      <div class="controls">
        <button>
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
  }
};
</script>

<style scoped lang="scss">
#dashboard{
  text-align: center;
  h1{
    color:$dark-blue;
  }
  .palletes{
    box-shadow: $shadow;
    margin: 2rem;
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
        width: 20%;
        height: 3rem;
      }
    }
  }
}
</style>
