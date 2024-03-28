"use client";

import { ColumnDef, Row, RowModel } from "@tanstack/react-table";
import { Bin } from "@/model/bin";
import { Product } from "@/model/product";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import BinItemDetails from "../Bin/binItemDetails";

function ProductDetailsCell({ row } : { row : Row<Bin> }) {
    const { setElementDetails, setShowElementDetails} = useElementDetails();
    const product: Product = row.getValue("product");

    const handleClick = () => {  
    const bin: Bin = row.original;
      if(bin) {
        setElementDetails(<BinItemDetails bin={bin} />);
        setShowElementDetails(true);
      }
    };
  
    return product && product.getName() ? (
      <Button className={buttonVariants({variant: "secondary"}) + " bg-trasparent float-right mr-2 "} onClick={handleClick}>
        <Image src="/icons/info.svg" width={10} height={10} alt="Info" />
      </Button>
    ) : "";
  }
  

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
			return product && product.getName() ? product.getName() : "Libero";
		},
	},
    {
        accessorKey: "product_details",
        header: () => <div className={"text-right pr-5"}>Info</div>,
        cell: ProductDetailsCell,
    }
];
