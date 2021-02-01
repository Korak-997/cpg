<template>
	<div id="home" class="wraper">
		<div class="main">
			<div v-show="colors.length > 0" class="colors"></div>
			<div @mouseover.self="changeBg($event)" id="canva">
				<p>1) Move Your mouse around to generate colors.</p>
				<p>2) Click to save the color to your pallete.</p>
			</div>
		</div>
		<div class="controls">Controls will be here</div>
	</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			colors: [],
			rgb: "",
			topRight : [255, 255, 255], //white
			topLeft : [0, 0, 0], //black
			bottomMiddle : [0, 255, 0], //green
			bottomRight : [255, 0, 0], //red
			bottomLeft : [0, 0, 255], //blue
			leftMiddle : this.average(this.bottomRight, this.bottomLeft),
			rightMiddle : this.average(this.topRight, this.bottomRight),
			center : this.average(this.rightMiddle, this.leftMiddle),
			topMiddle : this.average(this.topRight, this.topLeft),
		};
	},
	methods: {
		// calculates average of the given colors based on  Bilinear interpolation
		average(a, b) {
			return [0.5 * (a[0] + b[0]), 0.5 * (a[1] + b[1]), 0.5 * (a[1] + b[1])];
		},
		interpolate2D(x00, x01, x10, x11, x, y) {
			return (
				x00 * (1 - x) * (1 - y) +
				x10 * x * (1 - y) +
				x01 * (1 - x) * y +
				x11 * x * y
			);
		},
		interpolateArray(x00, x01, x10, x11, x, y) {
			var result = [0, 0, 0];
			for (var i = 0; i < 3; ++i) {
				result[i] = Math.floor(
					this.interpolate2D(x00[i], x01[i], x10[i], x11[i], x, y)
				);
			}
			return result;
		},
		changeBg(e) {
			const canva = document.getElementById("canva");
			var positionX = e.pageX / canva.clientWidth;
			var positionY = e.pageY / canva.clientHeight;
			var x00, x01, x11, x10;
			if (positionX > 0.5 && positionY > 0.5) {
				x00 = this.center;
				x01 = this.bottomMiddle;
				x10 = this.rightMiddle;
				x11 = this.bottomRight;
				positionX = 2.0 * (positionX - 0.5); // scale position back to [0, 1]
				positionY = 2.0 * (positionY - 0.5);
			} else if (positionX > 0.5 && positionY <= 0.5) {
				x00 = this.topMiddle;
				x01 = this.center;
				x10 = this.topRight;
				x11 = this.rightMiddle;
				positionX = 2.0 * (positionX - 0.5);
				positionY = 2.0 * positionY;
			} else if (positionX <= 0.5 && positionY <= 0.5) {
				x00 = this.topLeft;
				x01 = this.leftMiddle;
				x10 = this.topMiddle;
				x11 = this.center;
				positionX = 2.0 * positionX;
				positionY = 2.0 * positionY;
			} else if (positionX <= 0.5 && positionY > 0.5) {
				x00 = this.leftMiddle;
				x01 = this.bottomLeft;
				x10 = this.center;
				x11 = this.bottomMiddle;
				positionX = 2.0 * positionX;
				positionY = 2.0 * (positionY - 0.5);
			} else {
				// can't happen
			}
			this.rgb = this.interpolateArray(
				x00,
				x01,
				x10,
				x11,
				positionX,
				positionY
			);
			canva.style.backgroundColor = `rgb(${this.rgb.join(",")})`;
		},
	},
};
</script>

<style scoped lang="scss">
.main {
	width: 100%;
	height: 80vh;
	display: flex;
	align-items: center;
	justify-content: space-between;
	#canva {
		width: 98%;
		text-align: center;
		height: 80vh;
		&:hover {
			cursor: pointer;
		}
		p {
			color: $grey;
		}
	}
}
.controls {
	width: 60%;
	margin: 0.3em auto;
}
</style>
