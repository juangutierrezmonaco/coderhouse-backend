import { ProductModel } from '../models/product.model.js';

export async function getProducts(limit) {
  try {
    const products = await ProductModel.find({deleted: false}).limit(limit);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProduct(pid) {
  try {
    const product = await ProductModel.findById(pid);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createProduct(productData) {
  try {
    const product = await ProductModel.create(productData);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProduct(pid, productData) {
  try {
    const product = await ProductModel.findByIdAndUpdate(pid, productData, { new: true });
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(pid) {
  try {
    await ProductModel.delete({ _id: pid });
  } catch (error) {
    throw new Error(error.message);
  }
}