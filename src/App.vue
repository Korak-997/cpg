<template>
	<nav-bar></nav-bar>
	<router-view />
</template>

<script>
import Nav from "./components/navbar";
export default {
	name: "App",
	components: {
		"nav-bar": Nav,
	},
};
</script>

<style lang="scss">
#app {
}
</style>
