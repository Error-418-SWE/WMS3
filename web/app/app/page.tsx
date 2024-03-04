import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function app() {
	return (
		<main className={"h-screen flex"}>
			<nav className="flex-col h-screen bg-primary pt-2 items-center">
				<Image
					src="/icons/logo.svg"
					alt="logo"
					width={40}
					height={40}
				/>
				<Button className="flex-col">
					<Image
						src="/icons/zone.svg"
						alt=""
						width={24}
						height={24}
					/>
					<span>Zone</span>
				</Button>
			</nav>
		</main>
	);
}