export default function ZonePanel() {    
    return (
        <aside className={"flex flex-col h-screen w-1/5 shadow-xl shrink-0 z-10  absolute bg-secondary"}>
            <div className={"flex m-5 items-start"}>
                <h1 className={"grow font-bold text-2xl"}>Ordini di movimentazione</h1>
            </div>
            <div id={"ordersList"}>
            </div>
        </aside>
    );
}