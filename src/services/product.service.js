import { ProductModel } from '../models/product.model.js';

export async function getProducts({ limit = 10, page = 1, sort, category, stock }) {
  try {
    const query = { deleted: false }
    if(category !== undefined) query.categories = category;
    if(stock !== undefined) query.stock = { $gt: 0 };
    
    const paginateOptions = {
      lean: true,
      limit,
      page,
      sort: sort ? { price: sort} : null,
    }

    const products = await ProductModel.paginate(query, paginateOptions);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProduct(pid) {
  try {
    const product = await ProductModel.findById(pid);

    if (!product) throw new Error(`The product with the id:${pid} doesn't exist.`);

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
    const { modifiedCount } = await ProductModel.delete({ _id: pid });

    if (!modifiedCount) throw new Error(`The product with the id:${pid} doesn't exist.`);
  } catch (error) {
    throw new Error(error.message);
  }
}