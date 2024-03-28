import { Bin } from "./bin";

class Zone {
	private id: number;
	private xcoordinate: number;
	private ycoordinate: number;
	private height: number;
	private length: number;
	private width: number;
	private bins: Bin[];
	private orientation: boolean;

	constructor(
		id: number,
		xcoordinate: number,
		ycoordinate: number,
		height: number,
		length: number,
		width: number,
		bins: Bin[],
		orientation: boolean,
	) {
		this.id = id;
		this.xcoordinate = xcoordinate;
		this.ycoordinate = ycoordinate;
		this.height = height;
		this.length = length;
		this.width = width;
		this.bins = bins;
		this.orientation = orientation;
	}

	public getId(): number {
		return this.id;
	}

	public getXcoordinate(): number {
		return this.xcoordinate;
	}

	public getYcoordinate(): number {
		return this.ycoordinate;
	}

	public getHeight(): number {
		return this.height;
	}

	public getLength(): number {
		return this.length;
	}

	public getWidth(): number {
		return this.width;
	}

	public getBins(): Bin[] {
		return this.bins;
	}

	public isNSOriented(): boolean {
		return this.orientation;
	}

	public getBin(id: number | string): Bin | undefined {
		return this.bins.find((bin) => bin.getId() === id);
	}

	public setCoordinateX(x: number): void {
		this.xcoordinate = x;
	}

	public setCoordinateY(y: number): void {
		this.ycoordinate = y;
	}

	public getLevels(): [Bin[]] {
		let levels: [Bin[]] = [[]];
		let level: number = 0;
		for (let i = 0; i < this.bins.length; i++) {
			if (this.bins[i].getLevel() !== level) {
				level = this.bins[i].getLevel();
				levels.push([]);
			}
			levels[level].push(this.bins[i]);
		}
		return levels;
	}

	public getColumns(): [Bin[]] {
		let columns: [Bin[]] = [[]];
		let column: number = 0;
		for (let i = 0; i < this.bins.length; i++) {
			if (this.bins[i].getColumn() !== column) {
				column = this.bins[i].getColumn();
				columns.push([]);
			}
			columns[column].push(this.bins[i]);
		}
		return columns;
	}

	public getMaxUsedLevel(): number {
		let maxLevel: number = -1;
		this.bins.forEach((bin) => {
			if (bin.getProduct() !== null && bin.getLevel() > maxLevel) {
				maxLevel = bin.getLevel();
			}
		});
		return maxLevel + 1;
	}

	public getMaxUsedColumn(): number {
		let maxColumn: number = -1;
		this.bins.forEach((bin) => {
			if (bin.getProduct() !== null && bin.getColumn() > maxColumn) {
				maxColumn = bin.getColumn();
			}
		});
		return maxColumn + 1;
	}
}

export { Zone };
