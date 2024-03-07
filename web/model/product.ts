class Product {
    private id: number;
    private name: string;
    private weight: number;
    private length: number;
    private width: number;
    private categories: string[];

    constructor(id: number, name: string, weight: number, length: number, width: number, categories: string[] = []) { 
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.length = length;
        this.width = width;
        this.categories = categories;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
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

    public getCategories(): string[] {
        return this.categories;
    }
}
export { Product };