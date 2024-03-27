import { Order } from "@/model/order";
import { MoveRight } from "lucide-react";

interface OrderItemProps {
	order: Order,
}

export default function OrderItem({ order }: OrderItemProps) {
	return (
		<div className={"m-5"}>
			<span className={"font-bold"}># {order.getId()} {order.getProduct().getName()}</span>
			<div className={"flex gap-x-4 text-muted-foreground items-center"}>
				<span>{order.getStartPoint() ? order.getStartPoint().getId() : "Non collocato"}</span>
				<MoveRight size={16} />
				<span>{order.getEndPoint().getId()}</span>
			</div>
		</div>
	);
}