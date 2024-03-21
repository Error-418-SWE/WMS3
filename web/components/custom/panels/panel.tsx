interface PanelProps {
    children: React.ReactNode;
    className?: string;
}

export default function Panel({children, className} : PanelProps) {

	return (
		<aside
			className = {
				"flex flex-col h-screen w-2/5 max-w-96 min-w-80 shadow-xl z-10 absolute bg-slate-50 " + className
			}
		>
			{children}
		</aside>
	);
}

