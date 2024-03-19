class SVG {
	private length: number;
	private width: number;
	private svg: string;

	constructor(svg: string, length: number, width: number) {
		this.length = length;
		this.width = width;
		this.svg = svg;
	}

	public getLength(): number {
		return this.length;
	}

	public getWidth(): number {
		return this.width;
	}

	public getString(): string {
		return this.svg;
	}

	public setLength(length: number) {
		this.length = length;
	}

	public setWidth(width: number) {
		this.width = width;
	}
}

export { SVG };
