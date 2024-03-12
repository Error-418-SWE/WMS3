import { Order } from "@/model/order";
import Image from "next/image";

interface OrderItemProps {
	order: Order,
}

export default function OrderItem({ order }: OrderItemProps) {
	return (
		<div className={"m-5"}>
			<span className={"font-bold"}># {order.getId()} {order.getProduct().getName()}</span>
			<div className={"flex gap-x-2 text-slate-500 text-sm"}>
				<span>{order.getStartPoint() ? order.getStartPoint().getId() : "Non collocato"}</span>
				<Image src="/icons/arrow.svg" alt="to" width={20} height={20} />
				<span>{order.getEndPoint().getId()}</span>
			</div>
		</div>
	);
}