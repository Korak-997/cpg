<template>
	<div id="home" class="wraper">
		<div class="main">
			<div @keydown.enter="generateColor()" @click="changeOpacity($event)" id="canva">
				<p>1) Move Your mouse around to generate colors.</p>
				<p>2) Click to save the color to your pallete.</p>
			</div>
		</div>
		<div class="footer">
			<div class="controls">
				<button>Save</button>
			</div>
			<div v-show="colors.length > 0" id="pallete">
				<div v-for="color in colors" :key="color" class="color-div">
					{{ color }}
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
			rgb: "",
			right: [255, 255, 255], //white
			left: [0, 0, 0], //black
		};
	},
	created() {
	},
	updated() {
		document.querySelectorAll(".color-div").forEach((div) => {
			div.style.backgroundColor = `rgb(${div.innerText})`;
			div.innerHTML = "";
		});
	},
	methods: {
		// calculates average of the given colors based on  Bilinear interpolation
		addColor() {
			this.colors.push(this.rgb.join(","));
			console.log("i worked");
			console.log(this.colors);
		},
		generateColor(){
			document.getElementById('canva').style.backgroundColor=`#${Math.floor(Math.random()*16777215).toString(16)}`
		},
		changeOpacity(e) {
			const canva = document.getElementById("canva");
			var positionX = e.pageX / canva.clientWidth;
			var positionY = e.pageY / canva.clientHeight;
			console.log(`
				X: ${positionX}
				Y: ${positionY}
			`)
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
	#canva {
		width: 100%;
		text-align: center;
		height: 100%;
		&:hover {
			cursor: crosshair;
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
			width: 3rem;
			height: 3rem;
		}
	}
	.controls {
		width: 30%;
		box-shadow: $shadow;
	}
}
</style>
