import { Product } from "@/model/product";

interface searchProps {
	list: Product[];
	query: string;
}

export function searchById({ list, query }: searchProps) {
	return list.filter((item) => item.getId().toString().includes(query));
}

export function searchByName({ list, query }: searchProps) {
	return list.filter((item) =>
		item.getName().toLowerCase().includes(query.toLowerCase())
	);
}

export function searchByCategory({ list, query }: searchProps) {
	return list.filter((item) =>
		item
			.getCategories()
			.some((category) =>
				category.toLowerCase().includes(query.toLowerCase())
			)
	);
}
