interface PanelProps {
    children: React.ReactNode;
    className?: string;
}

export default function Panel({children, className} : PanelProps) {

	return (
		<aside
			className = {
				"flex flex-col h-screen w-1/5 h-screen shadow-xl max-h-screen z-10 absolute bg-secondary " + className
			}
		>
            {children}
		</aside>
	);
}