import { Product } from './product';

class Bin {
    private id: string;
    private level: number;
    private column: number;
    private height: number;
    private length: number;
    private width: number;
    private product: Product | null;

    constructor(id: string, level: number, column: number, height: number, length: number, width: number, product: Product | null) {
        this.id = id;
        this.level = level;
        this.column = column;
        this.height = height;
        this.length = length;
        this.width = width;
        this.product = product;
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

    public getProduct(): Product | null{
        return this.product;
    }

	public setId(id: string): void {
		this.id = id;
	}

	public setProduct(product: Product | null): void {
		this.product = product;
	}
}
export { Bin };