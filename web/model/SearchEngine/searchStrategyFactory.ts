import { ProductSearchStrategy } from './productSearchStrategy';
import { ZoneSearchStrategy } from './zoneSearchStrategy';
import { SearchStrategy } from './searchInterface';
import { Product } from '../product';
import { Zone } from '../zone';

export class SearchStrategyFactory {
    static createSearchStrategy<T extends Zone | Product> (type: string) : SearchStrategy<T>{
        switch (type) {
            case 'Product':
                return new ProductSearchStrategy() as unknown as SearchStrategy<T>;
            case 'Zone':
                return new ZoneSearchStrategy() as unknown as SearchStrategy<T>;
            default:
                throw new Error(`Invalid type: ${type}`);
        }
    }
}
