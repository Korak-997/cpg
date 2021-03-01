<template>
	<div id="app">
		<nav-bar></nav-bar>
		<router-view />
	</div>
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
	width: 100%;
	height: 100%;
}
</style>
