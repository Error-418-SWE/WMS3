import { Product } from "./product";
export enum BinState {
	Idle = "Idle",
	ProductIncoming = "ProductIncoming",
	ProductOutgoing = "ProductOutgoing",
}

class Bin {
	private id: string;
	private level: number;
	private column: number;
	private height: number;
	private length: number;
	private width: number;
	private product: Product | null;
	private state: BinState;

	constructor(
		id: string,
		level: number,
		column: number,
		height: number,
		length: number,
		width: number,
		product: Product | null,
	) {
		this.id = id;
		this.level = level;
		this.column = column;
		this.height = height;
		this.length = length;
		this.width = width;
		this.product = product;
		this.state = BinState.Idle;
	}

	public getId(): string {
		return this.id;
	}

	public getLevel(): number {
		return this.level;
	}

	public getColumn(): number {
		return this.column;
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

	public getProduct(): Product | null {
		return this.product;
	}

	public setId(id: string): void {
		this.id = id;
	}

	public setProduct(product: Product | null): void {
		this.product = product;
	}

	public clearProduct(): void {
		this.product = null;
	}

	public setBinState(state: BinState) {
		this.state = state;
	}

	public getBinState(): BinState {
		return this.state;
	}
}
export { Bin };
