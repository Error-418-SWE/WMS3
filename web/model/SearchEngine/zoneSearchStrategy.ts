import { Zone } from "../zone";
import { SearchStrategy } from "./searchInterface";

export class ZoneSearchStrategy implements SearchStrategy<Zone> {
	searchById(list: Zone[], query: string): Zone[] {
		return list.filter((item) => item.getId().toString().includes(query));
	}

	search(list: Zone[], query: string, type: string): Zone[] {
		switch (type) {
			case "id":
				return this.searchById(list, query);
			default:
				throw new Error(`Invalid search type: ${type}`);
		}
	}
}
