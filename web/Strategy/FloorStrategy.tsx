import { readSavedSVG } from "@/ServerActions/SVG/readSavedSVG";
import { Floor } from "@/model/floor";

export interface FloorStrategy {
    createFloor(params: URLSearchParams): Promise<Floor>;
}

export class StandardFloorStrategy implements FloorStrategy {
    async createFloor(params: URLSearchParams): Promise<Floor> {
        const length = parseInt(params.get("profondita") || "0");
        const width = parseInt(params.get("larghezza") || "0");
        const svg = "";
        return new Floor(length, width, svg);
    }
}

export class CustomFloorStrategy implements FloorStrategy {
    async createFloor(params: URLSearchParams): Promise<Floor> {
        const length = parseInt(params.get("latoMaggiore") || "0");
        const svgString = await readSavedSVG();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgElement = svgDoc.documentElement as unknown as SVGSVGElement;
        let svgWidth, svgHeight;

        // Controllo se è definita la viewBox
        if (svgElement.viewBox && svgElement.viewBox.baseVal) {
            svgWidth = svgElement.viewBox.baseVal.width;
            svgHeight = svgElement.viewBox.baseVal.height;
        } else if(svgElement.width && svgElement.height) {
            // Se non è definita la viewBox, prendo width e height
            svgWidth = svgElement.width.baseVal.value;
            svgHeight = svgElement.height.baseVal.value;
        } else {
            // Se non è definita neanche width e height, imposto valori di default
            // per creare un svg di dimensioni [latoMaggiore x latoMaggiore]
            svgWidth = 1;
            svgHeight = 1;
        }

        const width = length * (svgWidth / svgHeight);
        return new Floor(length, width, svgString);
    }
}

export class FloorStrategyContext {
    private strategy: FloorStrategy;

    public constructor(strategy?: FloorStrategy){
        this.strategy = strategy || new StandardFloorStrategy();
    }

    public setStrategy(strategy: FloorStrategy){
        this.strategy = strategy;
    }

    public async createFloor(params: URLSearchParams): Promise<Floor> {
        return this.strategy.createFloor(params);
    }
}
