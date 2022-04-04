import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type Cart = {
  id: string;
  items: Item[];
};

export type Item = {
  id: string;
  quantity: number;
};

@Injectable()
export class CartService {
  // Use this array as your database
  private carts: Cart[] = [];

  private findCart(id: string): Cart {
    const cart: Cart = this.carts.find(({ id: _id }: { id: string }) => _id === id);
    if (!cart) throw new NotFoundException('cart not found');

    return cart;
  }

  create(): Cart {
    const cart: Cart = {
      id: uuidv4(),
      items: [],
    };

    this.carts.push(cart);
    return cart;
  }

  getCart(id: string): Cart {
    return this.findCart(id);
  }

  putItem(id: string, item: Item): Cart {
    throw new NotImplementedException();
  }

  putItems(id: string, items: Item[]): Cart {
    const cart: Cart = this.findCart(id);

    items.forEach((item: Item) => {
      const hasItem: boolean = !!(cart.items.find(({ id }: { id: string }) => id === item.id));

      if (!hasItem) cart.items.push(item);
    });

    return cart;
  }

  removeItems(id: string, items: Item[]): Cart {
    const cart: Cart = this.findCart(id);

    items.forEach((item: Item) => {
      const itemIndex: number = cart.items.findIndex(({ id }: { id: string }) => id === item.id);

      if (itemIndex > -1) cart.items.splice(itemIndex, 1);
    });

    return cart;
  }
}
