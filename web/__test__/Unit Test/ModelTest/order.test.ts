import { Order } from '@/model/order';
import { Bin } from '@/model/bin';
import { Product } from '@/model/product';

describe('Order', () => {
  let order: Order;
  let startPoint: Bin;
  let endPoint: Bin;
  let product: Product;

  beforeEach(() => {
    startPoint = new Bin( "1", 1, 1, 1, 1, 1, null);
    endPoint = new Bin( "2", 2, 2, 2, 2, 2, null);
    product = new Product(1, 'prodotto', 1, 1, 1, 1, ['categoria']);
    order = new Order(1, startPoint, endPoint, product);
  });

  it('returns the correct id', () => {
    expect(order.getId()).toBe(1);
  });

  it('returns the correct start point', () => {
    expect(order.getStartPoint()).toBe(startPoint);
  });

  it('returns the correct end point', () => {
    expect(order.getEndPoint()).toBe(endPoint);
  });

  it('returns the correct product', () => {
    expect(order.getProduct()).toBe(product);
  });
});
