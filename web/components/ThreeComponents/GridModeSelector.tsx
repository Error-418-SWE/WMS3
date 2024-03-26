import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"


interface GridModeSelectorProps {
	gridCellSize: number;
	onGridCellSizeChange: (value: number) => void;
}

export function GridModeSelector ({
	gridCellSize,
	onGridCellSizeChange
}: GridModeSelectorProps) {

	const handleChange = (value : string) => {
		onGridCellSizeChange(parseFloat(value));
	};

	return (
		<div
			className={"absolute bottom-4 right-4 p-2 pl-4 flex gap-4 items-center bg-slate-300 bg-opacity-50 rounded-lg shadow-md"}
		>
			<span className="text-slate-600 select-none">Griglia</span>
			<ToggleGroup
				onValueChange={(value) => handleChange(value)}
				defaultValue={gridCellSize.toString()}
				type="single"
				>
				<ToggleGroupItem value="0" aria-label="Disattiva griglia di collocamento">
					<span>0</span>
				</ToggleGroupItem>
				<ToggleGroupItem value="0.1" aria-label="Passo griglia 10 centimetri">
					<span>0.1</span>
				</ToggleGroupItem>
				<ToggleGroupItem value="0.5" aria-label="Passo griglia 50 centimetri">
					<span>0.5</span>
				</ToggleGroupItem>
				<ToggleGroupItem value="1" aria-label="Passo griglia 1 metro">
					<span>1.0</span>
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
