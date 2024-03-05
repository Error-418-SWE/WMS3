import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ZonePanel() {
    
    const searchParams = useSearchParams();

    searchParams?.forEach((value, key) => {
        console.log(key, value);
    });
    
    return (
        <aside className={"flex flex-col h-screen w-1/5 shadow-xl shrink-0 z-10  absolute bg-secondary"}>
            <div className={"flex m-5 items-start"}>
                <h1 className={"grow font-bold text-2xl"}>Ordini di movimentazione</h1>
                <Button>
                    <Image 
                        src="/icons/reload.svg"
                        width={13}
                        height={13}
                        alt="Add"
                    />
                </Button>
            </div>
            <div id={"ordersList"}>
            </div>
        </aside>
    );
}