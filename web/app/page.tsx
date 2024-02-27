import { Button } from "@/components/ui/button";
import styles from "./page.module.css";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	return (
		<main className={"h-screen flex items-center justify-center"}>
			<Card className={"max-w-sm mx-auto"}>
				<CardHeader>
					<CardTitle className={"text-4xl"}>
						Definizione dell'ambiente 3D
					</CardTitle>
				</CardHeader>
				<CardContent className={"flex flex-col gap-y-5"}>
					<Card className={"rounded-md"}>
						<CardHeader>
							<CardTitle>Planimetria rettangolare</CardTitle>
							<CardDescription>
								Definisci le dimensioni del magazzino.
								<br />È possibile definire solo magazzini a pianta rettangolare.
							</CardDescription>
						</CardHeader>
					</Card>
					<Card className={"rounded-md"}>
						<CardHeader>
							<CardTitle>Planimetria personalizzata</CardTitle>
							<CardDescription>
								Carica la planimetria o parti da un magazzino predefinito.
							</CardDescription>
						</CardHeader>
					</Card>
				</CardContent>
				<CardFooter className={"justify-end"}>
					<Button>Continua</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
