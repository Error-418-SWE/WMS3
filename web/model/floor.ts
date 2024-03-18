import { SVG } from "@/model/svg";

class Floor {
	private length: number;
	private width: number;
	private SVG: SVG;
	constructor(length: number, width: number, svg: string) {
		this.length = length;
		this.width = width;
		this.SVG = new SVG(svg, this.length, this.width);
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
}

export { Floor };
