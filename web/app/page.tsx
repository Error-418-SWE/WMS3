import styles from "./page.module.css";
import { ConditionalForm } from "@/components/custom/creationForm";
import {
	Card,
	CardContent,
	CardDescription,
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
				<CardContent>
					<ConditionalForm />
				</CardContent>
			</Card>
		</main>
	);
}
