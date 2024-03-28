import { Product } from "../product";
import { SearchStrategy } from "./searchInterface";

export class ProductSearchStrategy implements SearchStrategy<Product> {
	searchById(list: Product[], query: string): Product[] {
		return list.filter((item) => item.getId().toString().includes(query));
	}

	searchByName(list: Product[], query: string): Product[] {
		return list.filter((item) =>
			item.getName().toLowerCase().includes(query.toLowerCase()),
		);
	}

	searchByCategory(list: Product[], query: string): Product[] {
		return list.filter((item) =>
			item
				.getCategories()
				.some((category) =>
					category.toLowerCase().includes(query.toLowerCase()),
				),
		);
	}

	search(list: Product[], query: string, type: string): Product[] {
		switch (type) {
			case "id":
				return this.searchById(list, query);
			case "name":
				return this.searchByName(list, query);
			case "category":
				return this.searchByCategory(list, query);
			default:
				throw new Error(`Invalid search type: ${type}`);
		}
	}
}
