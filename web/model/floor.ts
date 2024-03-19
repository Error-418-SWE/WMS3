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

	clone() {
		const floor = new Floor(
			this.getLength(),
			this.getWidth(),
			this.getSVG().getString()
		);
		floor.getSVG().setLength(this.getSVG().getLength());
		floor.getSVG().setWidth(this.getSVG().getWidth());
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
}

export { Floor };
