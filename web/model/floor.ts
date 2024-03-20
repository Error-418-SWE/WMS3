import { SVG } from "@/model/svg";

class Floor {
	private length: number;
	private width: number;
	private SVG: SVG | null;
	constructor(length: number, width: number, svg: string) {
		this.length = length;
		this.width = width;
		this.SVG = new SVG(svg, this.length, this.width);
	}

	clone() {
		const floor = new Floor(this.length, this.width, this.SVG?.getString()? this.SVG.getString() : "");
		floor.setSVG(this.SVG? this.SVG : null);
		return floor;
	}

	public getLength(): number {
		return this.length;
	}

	public getWidth(): number {
		return this.width;
	}

	public getSVG(): SVG {
		return this.SVG!;
	}

	public setLength(length: number) {
		this.length = length;
	}

	public setWidth(width: number) {
		this.width = width;
	}

	public setSVG(svg: SVG | null) {
		this.SVG = svg;
	}
}

export { Floor };
