import { useOrdersData } from "@/components/providers/ordersProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderItem from "./orderItem";

export default function OrderPanel() {
	const { orders } = useOrdersData();

	return (
		<aside className={"flex flex-col h-screen w-2/5 max-w-96 min-w-80 overflow-hidden shadow-xl z-10 absolute bg-slate-50"}>
			<div className={"flex m-5 items-start"}>
				<h1 className={"grow font-bold text-2xl"}>Ordini di movimentazione</h1>
			</div>
			<ScrollArea>
				<div id="orderList">
					{orders.map((order) => (
						<OrderItem key={order.getId()} order={order} />
					))}
				</div>
			</ScrollArea>
		</aside>
	);
}