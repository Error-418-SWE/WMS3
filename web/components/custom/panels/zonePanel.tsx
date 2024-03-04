import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function ZonePanel() {
    return (
        <aside className={"flex flex-col h-screen w-1/5 h-screen shadow-xl shrink-0 z-10 absolute bg-secondary"}>
            <div className={"flex m-5 items-end"}>
                <h1 className={"grow font-bold text-2xl"}>Zone</h1>
                <Button>
                    <Image 
                        src="/icons/add.svg"
                        width={13}
                        height={13}
                        alt="Add"
                    />
                </Button>
            </div>
            <div className={"mx-5 mt-1"}>
                <Label className={"sr-only"}>
                    Ricerca le zone
                </Label>
                <Input placeholder="Search..."/>
            </div>
            <div id={"zoneList"}>
            </div>
        </aside>
    );
}