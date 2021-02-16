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
        <p>Here goes controlers</p>
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
    border: 2px solid red;
    .controls{
      border: 2px solid blue;
    }
    .colors{
      border: 2px solid green;
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
