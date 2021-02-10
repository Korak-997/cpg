<template>
	<div id="home" class="wraper">
		<div class="main">
			<div
				@click="darkenColor()"
				id="canva"
			>
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
			rgbColor: "",
			hexColor: "",
			right: [255, 255, 255], //white
			left: [0, 0, 0], //black
		};
	},
	updated() {
		document.querySelectorAll(".color-div").forEach((div) => {
			div.style.backgroundColor = `rgb(${div.innerText})`;
			div.innerHTML = "";
		});
	},
	methods: {
		addColor() {
			this.colors.push(this.rgb.join(","));
			console.log("i worked");
			console.log(this.colors);
		},
		darkenColor(){
			let color = this.convertHexToRgb("ff33dd")
			color.each(i =>{
				num = parseInt(i, 10)
				while (num != 0){
					num = num - 10
				}
			})
			console.log(color)
		},
		convertHexToRgb(hexString){
			const arr = hexString.split("")
			const r = [`${arr[1]}`, `${arr[2]}`].join('')
			const g = [`${arr[3]}`, `${arr[4]}`].join('')
			const b = [`${arr[5]}`, `${arr[6]}`].join('')
			return [`${parseInt(r, 16)}`, `${parseInt(g, 16)}`, `${parseInt(b, 16)})`]
		},
		addRanBg() {
			this.hexColor = `#${Math.floor(
				Math.random() * 16777215
			).toString(16)}`

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
