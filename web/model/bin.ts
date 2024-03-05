import { Product } from './product';

class Bin {
    private id: number;
    private level: number;
    private column: number;
    private weight: number;
    private length: number;
    private width: number;
    private product: Product;

    constructor(id: number, level: number, column: number, weight: number, length: number, width: number, product: Product) {
        this.id = id;
        this.level = level;
        this.column = column;
        this.weight = weight;
        this.length = length;
        this.width = width;
        this.product = product;
    }

    public getId(): number {
        return this.id;
    }

    public getLevel(): number {
        return this.level;
    }

    public getColumn(): number {
        return this.column;
    }

    public getWeight(): number {
        return this.weight;
    }

    public getLength(): number {
        return this.length;
    }

    public getWidth(): number {
        return this.width;
    }

    public getProduct(): Product {
        return this.product;
    }
}

export { Bin };