import { NextApiRequest, NextApiResponse } from "next";

export default function movement(req: NextApiRequest, res: NextApiResponse) {
	//
	// L'IMPLEMENTAZIONE DI QUESTA API NON E' OGGETTO DEL CAPITOLATO.
	// Il Proponente ha stabilito che l'implementazione di tale API non è richiesta in quanto
	// sviluppata internamente da parte di Sanmarco Informatica.
	//

	const movementCanBeDone = Math.random() > 0.25;
	// generate random id for the new order
	const newOrderId = Math.floor(Math.random() * 1000);
	return res
		.status(200)
		.json({ canBeDone: movementCanBeDone, orderId: newOrderId });
}
