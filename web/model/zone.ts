import {Bin} from './bin';

class Zone {
    private id: number;
    private xcordinate: number;
    private ycordinate: number;
    private weight: number;
    private length: number;
    private width: number;
    private bins: Bin[];

    constructor(id: number, xcordinate: number, ycordinate: number, weight: number, length: number, width: number, bins: Bin[]) {
        this.id = id;
        this.xcordinate = xcordinate;
        this.ycordinate = ycordinate;
        this.weight = weight;
        this.length = length;
        this.width = width;
        this.bins = bins;
    }

    public getId(): number {
        return this.id;
    }

    public getXcordinate(): number {
        return this.xcordinate;
    }

    public getYcordinate(): number {
        return this.ycordinate;
    }

    public getWeight(): number {
        return this.weight;
    }

    public getLength(): number {
        return this.length;
    }

    public getWidth(): number {
        return this.width;
    }

    public getBins(): Bin[] {
        return this.bins;
    }

    public getBin(id: number): Bin | undefined {
        return this.bins.find(bin => bin.getId() === id);
    }
}

export {Zone};