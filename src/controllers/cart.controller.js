import * as CartService from '../services/cart.service.js';
import { STATUS } from '../constants/constants.js';

export async function getCarts(req, res) {
  try {
    const carts = await CartService.getCarts();
    res.status(200).json({
      data: carts,
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

export async function getCart(req, res) {
  const { cid } = req.params;

  try {
    const cart = await CartService.getCart(cid);
    res.status(200).json({
      data: cart,
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

export async function createCart(req, res) {
  try {
    const newCart = await CartService.createCart();

    res.status(201).json({
      data: newCart,
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

export async function updateCart(req, res) {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await CartService.updateCart(cid, products)

    res.status(200).json({
      data: cart,
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

export async function deleteCart(req, res) {
  const { cid } = req.params;

  try {
    await CartService.deleteCart(cid);

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

export async function addProduct(req, res) {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await CartService.addProduct(cid, pid, quantity);

    res.status(201).json({
      data: cart,
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
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await CartService.updateProduct(cid, pid, quantity);

    res.status(200).json({
      data: cart,
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
  const { cid, pid } = req.params;

  try {
    await CartService.deleteProduct(cid, pid);

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

