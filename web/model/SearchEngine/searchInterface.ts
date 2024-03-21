import { Product } from "../product";
import { Zone } from "../zone";

export interface SearchStrategy<T extends Zone | Product> {
	search(list: T[], query: string, type: string): T[];
}