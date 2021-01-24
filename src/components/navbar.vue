<template>
  <div id="nav-bar">
    <nav>
      <img @click="showNav = !showNav" src="../assets/burger.png" alt="burger menu" />
      <ul v-show="showNav">
        <li><router-link v-bind:to="'/'">Home</router-link></li>
        <li><router-link v-bind:to="'/dashboard'">Dashboard</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  data(){
    return{
      showNav: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  background-color: $dark-blue;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5em;
  border-radius: 0 30% 10% 20%;
  box-shadow: $shadow;
  img {
    width: 2rem;
    &:hover {
      cursor: pointer;
    }
  }
  ul{
    list-style: none;
    margin: .4em;
    display: flex;
    align-items: center;
    justify-content: center;
    li{
      margin-left: .5em;
      a{
        text-decoration: none;
        color: $white;
        font-size: 1.3rem;
        &:hover{
          color: $light-blue;
        }
      }
    }
  }
}
</style>
