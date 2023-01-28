import { CartModel } from '../models/cart.model.js';
import * as ProductService from './product.service.js';

export async function getCarts() {
  try {
    const carts = await CartModel.find();
    return carts;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCart(cid) {
  try {
    const cart = await CartModel.findById(cid);
    if (!cart) throw new Error(`The cart with the id: ${cid} doesn't exist.`);

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCart(cartData) {
  try {
    const cart = await CartModel.create(cartData);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCart(cid, products) {
  try {
    const cart = await getCart(cid);

    cart.products = [];
    for await (const p of products) {
      // Now we use the same logic that was used in addProduct() but if there's a product that doesn't
      // exist it throws an error and the cart keeps the original products
      const { product: pid, quantity = 1 } = p;

      // If the product doesn't exist in the product collection, throws an error
      await ProductService.getProduct(pid);

      const index = cart.products.findIndex(p => p.product._id.toString() === pid);
      if (index >= 0) {
        // If the product exists, adds the quantity to the previous one
        cart.products[index].quantity += quantity;
      } else {
        const newProduct = { product: pid, quantity };
        cart.products.push(newProduct);
      }
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCart(cid) {
  try {
    const cart = await getCart(cid);
    cart.products = [];
    await cart.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addProduct(cid, pid, quantity = 1) {
  try {
    // If the product doesn't exist in the product collection, throws an error
    await ProductService.getProduct(pid);

    const cart = await getCart(cid);

    const index = cart.products.findIndex(p => p.product._id.toString() === pid);
    if (index >= 0) {
      // If the product exists, adds the quantity to the previous one
      cart.products[index].quantity += Number(quantity);
    } else {
      const newProduct = { product: pid, quantity };
      cart.products.push(newProduct);
    }

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProduct(cid, pid, quantity = 1) {
  try {
    // If the product doesn't exist in the product collection, throws an error
    await ProductService.getProduct(pid);

    const cart = await getCart(cid);

    const index = cart.products.findIndex(p => p.product._id.toString() === pid);
    if (index < 0) throw new Error(`The product with the id: ${pid} isn't in this cart.`);

    cart.products[index].quantity = quantity;
    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(cid, pid) {
  try {
    // If the product doesn't exist in the product collection, throws an error
    await ProductService.getProduct(pid);

    const cart = await getCart(cid);

    cart.products = cart.products.filter(p => p.product._id.toString() !== pid);
    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

