import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import SettingsPanel from "../custom/panels/Settings/settingsPanel";
import { Button } from "./button";
import Icon from "./icon";
import { useState } from "react";
import dynamicIconImports from 'lucide-react/dynamicIconImports';


interface MenuItemProps {
	name: string;
	icon: keyof typeof dynamicIconImports;
	panelComponent: React.ReactNode;
}

const MenuItem = ({name, icon, panelComponent}: MenuItemProps) => {
	const [panel, setPanel] = useState<React.ReactNode>(null);
	const [showPanel, setShowPanel] = useState(false);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button
						onClick={() => {
							setPanel(<SettingsPanel />);
							setShowPanel(panel?.type !== SettingsPanel || !showPanel);
						}}
						className={`mt-auto flex flex-col gap-1.5 items-center p-2 w-16 h-16 hover:bg-slate-600 group ${panel?.type === SettingsPanel && showPanel ? "bg-slate-700" : "" }`}
						>
						<Icon name={icon} size={28} />
						<span >{name}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right" sideOffset={8}>
					<p>{name}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default MenuItem;