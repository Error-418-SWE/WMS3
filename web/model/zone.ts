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

    public getBin(id: number | string): Bin | undefined {
        return this.bins.find(bin => bin.getId() === id);
    }

    public getLevels(): [Bin[]] {
        let levels: [Bin[]] = [[]];
        let level: number = 1;
        for (let i = 0; i < this.bins.length; i++) {
            if (this.bins[i].getLevel() !== level) {
                level = this.bins[i].getLevel();
                levels.push([]);
            }
            levels[level-1].push(this.bins[i]);
        }
        return levels;
    }

    public getColumns(): [Bin[]] {
        let columns: [Bin[]] = [[]];
        let column: number = 0;
        for (let i = 0; i < this.bins.length; i++) {
            if (this.bins[i].getColumn() !== column) {
                column = this.bins[i].getColumn();
                columns.push([]);
            }
            columns[column-1].push(this.bins[i]);
        }
        return columns;
    }

}

export {Zone};