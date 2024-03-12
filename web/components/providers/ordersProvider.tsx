import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order } from '@/model/order';

const OrderDataContext = createContext({
    orders: [] as Order[],
	addOrder: (order: Order) => {},
	refresh: () => {},
});

export function OrdersDataProvider({ children } : { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        console.log("OrderDataProvider: useEffect");
        setOrders([]);
    }, []);

	const addOrder = (order: Order) => {
        setOrders([order, ...orders]);
        console.log(orders);
    };

	const refresh = () => {
		setOrders([]);
	}

    const value = { orders, addOrder, refresh };

    return (
        <OrderDataContext.Provider value={value}>
            {children}
        </OrderDataContext.Provider>
    );
}

export function useOrdersData() {
    const context = useContext(OrderDataContext);
    return context;
}
