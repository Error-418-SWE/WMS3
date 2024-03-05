import {Bin} from './bin';

class Zone {
    private id: number;
    private xcordinate: number;
    private ycordinate: number;
    private height: number;
    private length: number;
    private width: number;
    private bins: Bin[];
    private orientation: boolean;

    constructor(id: number, xcordinate: number, ycordinate: number, height: number, length: number, width: number, bins: Bin[], orientation: boolean) {
        this.id = id;
        this.xcordinate = xcordinate;
        this.ycordinate = ycordinate;
        this.height = height;
        this.length = length;
        this.width = width;
        this.bins = bins;
        this.orientation = orientation;
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

    public getHeight(): number {
        return this.height;
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

    public getOrientation(): boolean {
        return this.orientation;
    }

    public getBin(id: number): Bin | undefined {
        return this.bins.find(bin => bin.getId() === id);
    }
}

export {Zone};