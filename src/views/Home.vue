<template>
	<div id="home" class="wraper">
		<div class="main">
			<p id="info" v-show="info">{{ info }}</p>
			<div @click="generateRandomBg()" id="canva"></div>
		</div>
		<div class="footer">
			<div class="controls">
				<button title="Save current pallete" class="btn" @click="savePallete">
					SAVE
				</button>
				<button title="Add current color to your pallete" class="btn" id="addColorBtn" @click="addColor()">
					ADD
				</button>
				<div id="darkness">
					<button class="colorBtn" @click="lightenColor()" title="Make Lighter">
						+
					</button>
					<p>{{ num }}</p>
					<button class="colorBtn" @click="darkenColor()" title="Make Darker">
						-
					</button>
				</div>
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
			info: "",
			pallete: [],
			num: 0,
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
		shadeColor(color, percent) {
			var R = parseInt(color.substring(1, 3), 16);
			var G = parseInt(color.substring(3, 5), 16);
			var B = parseInt(color.substring(5, 7), 16);

			R = parseInt((R * (100 + percent)) / 100);
			G = parseInt((G * (100 + percent)) / 100);
			B = parseInt((B * (100 + percent)) / 100);

			R = R < 255 ? R : 255;
			G = G < 255 ? G : 255;
			B = B < 255 ? B : 255;

			var RR =
				R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
			var GG =
				G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
			var BB =
				B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

			this.hexColor = `#${RR}${GG}${BB}`;
			document.getElementById("canva").style.backgroundColor = this.hexColor;
		},
		darkenColor() {
			if (this.num != -10) {
				this.num -= 1;
				this.shadeColor(this.hexColor, this.num);
			}
		},
		lightenColor() {
			if (this.num != 10) {
				this.num += 1;
				this.shadeColor(this.hexColor, this.num);
			}
		},
		savePallete() {
			let id = Math.floor(Math.random() * 16777215).toString(16);
			this.pallete.push({
				id: id,
				colors: this.colors,
			});
			localStorage.setItem("palletes", JSON.stringify(this.pallete));
			this.info = "";
			this.colors = [];
			id = "";
			document.getElementById("addColorBtn").disabled = false;
			alert("Your pallete is Saved :)");
		},
		convertHexToRgb(hexString) {
			const arr = hexString.split("");
			const r = [`${arr[1]}`, `${arr[2]}`].join("");
			const g = [`${arr[3]}`, `${arr[4]}`].join("");
			const b = [`${arr[5]}`, `${arr[6]}`].join("");
			return [`${parseInt(r, 16)}`, `${parseInt(g, 16)}`, `${parseInt(b, 16)}`];
		},
		generateRandomBg() {
			this.hexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

			document.getElementById("canva").style.backgroundColor = this.hexColor;
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
			margin: .5em;
			box-shadow: $shadow;
			p {
				display: none;
			}
		}
	}
	.controls {
		border-radius: 2em 0;
		width: 30%;
		box-shadow: $shadow;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.btn {
			width: fit-content;
			font-size: 1.1rem;
			color: $white;
			background-color: $dark-blue;
			border: none;
			margin: 0.3em;
			padding: .7em;
			border-radius: 2em 0;
			&:hover {
				cursor: pointer;
				box-shadow: $shadow;
			}
			&:disabled{
				display: none;
			}
		}
		#darkness {
			width: 50%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: $shadow;
			border-radius: 2em 0;
			p {
				font-size: 1.8rem;
				color: $dark-blue;
				font-weight: bolder;
				padding: .4em;
			}
			.colorBtn {
				font-size: 1.8rem;
				color: $dark-blue;
				font-weight: bolder;
				padding: .3em;
				border: none;
				&:hover {
					cursor: pointer;
					background-color: $dark-blue;
					color: $white;
					border-radius: 2em 0;
				}
			}
		}
	}
}
</style>
