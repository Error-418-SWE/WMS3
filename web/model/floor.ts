class Floor{
    private length: number;
    private width: number;
    private SVG?: string;
    constructor(length: number, width: number, svg?: string){
        this.length = length;
        this.width = width;
        this.SVG = svg;
    }

    public getLength(): number {
        return this.length;
    }

    public getWidth(): number {
        return this.width;
    }

    public getSVG(): string | undefined{
        return this.SVG;
    }
}

export { Floor }