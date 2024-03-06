"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Bin } from "@/model/bin";
import { Product } from "@/model/product";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export const columns: ColumnDef<Bin>[] = [
	{
		accessorKey: "id",
		header: "Bin",
	},
	{
		accessorKey: "product",
		header: "Stato",
		cell: ({ row }) => {
			const product: Product | null = row.getValue("product");
			return product && product.getName() ? product.getName() : "Empty";
		},
	},
    {
        accessorKey: "product_details",
        header: () => <div className={"text-right pr-5"}>Info</div>,
        //should appear only at mouse hover
        cell: ({ row }) => {
            const product: Product | null = row.getValue("product");
            return product && product.getName() ? <Button className={buttonVariants({variant: "secondary"}) + " bg-trasparent float-right mr-2"} onClick={() => {
                //TODO logic
                console.log(product);
            }}>
                <Image src="/icons/info.svg" width={15} height={15} alt="Info" />
            </Button> : "";
        }
    }
];
