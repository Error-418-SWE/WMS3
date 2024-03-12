import { Bin } from "./bin";
import { Product } from "./product";

class Order {
	private id: number;
	private startPoint: Bin;
	private endPoint: Bin;
	private product: Product;

	constructor(id: number, startPoint: Bin, endPoint: Bin, product: Product) {
		this.id = id;
		this.startPoint = startPoint;
		this.endPoint = endPoint;
		this.product = product;
	}

	public getId(): number {
		return this.id;
	}

	public getStartPoint(): Bin {
		return this.startPoint;
	}

	public getEndPoint(): Bin {
		return this.endPoint;
	}

	public getProduct(): Product {
		return this.product;
	}
}
export { Order }