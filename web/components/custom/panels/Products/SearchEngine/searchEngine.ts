import * as SearchStrategies from "@/components/custom/panels/Products/SearchEngine/searchStrategies";
import { Product } from "@/model/product";

interface searchProps {
	list: Product[];
	query: string;
	type: string;
}

export function SearchEngine({list, query, type} : searchProps) {

	switch (type) {
		case "id":
			return SearchStrategies.searchById({ list, query });
		case "name":
			return SearchStrategies.searchByName({ list, query });
		case "category":
			return SearchStrategies.searchByCategory({ list, query });
		default:
			throw new Error(`Invalid search type: ${type}`);
	}
  }