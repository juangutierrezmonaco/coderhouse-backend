import * as ProductService from '../services/product.service.js';
import { STATUS } from '../constants/constants.js';

export async function getProducts(req, res) {
  const { limit } = req.query;

  try {
    const products = await ProductService.getProducts(limit);
    res.status(200).json({
      data: products,
      status: STATUS.SUCCESS,
      error: ''
    })
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    })
  }
}

export async function getProduct(req, res) {
  const { pid } = req.params;

  try {
    const product = await ProductService.getProduct(pid);
    res.status(200).json({
      data: product,
      status: STATUS.SUCCESS,
      error: ''
    })
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    })
  }
}
export async function createProduct(req, res) {
  try {
    const { body } = req;
    const newProduct = await ProductService.createProduct(body)

    const io = req.app.get('websocket');    // To emit to websocket
    io.emit('addProduct', newProduct);

    res.status(201).json({
      data: newProduct,
      status: STATUS.SUCCESS,
      error: ''
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    });
  }
}

export async function updateProduct(req, res) {
  const { pid } = req.params;
  const { body } = req;

  try {
    const modifiedProduct = await ProductService.updateProduct(pid, body);

    const io = req.app.get('websocket');    // To emit to websocket
    io.emit('updateProduct', modifiedProduct);

    res.status(200).json({
      data: modifiedProduct,
      status: STATUS.SUCCESS,
      error: ''
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    });
  }
}

export async function deleteProduct(req, res) {
  const { pid } = req.params;

  try {
    await ProductService.deleteProduct(pid);

    const io = req.app.get('websocket');    // To emit to websocket
    io.emit('removeProduct', pid);

    res.status(200).json({
      data: null,
      status: STATUS.SUCCESS,
      error: ''
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    });
  }
}