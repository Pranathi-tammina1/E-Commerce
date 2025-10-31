import CartItemsModel from "./cartItems.model.js";

export class CartItemsController {
  addToCart(req, res) {
    const { productId, quantity } = req.query;
    const userId = req.userId;
    CartItemsModel.add(productId, userId, quantity);
    res.status(201).send("Cart is updated");
  }

  get(req, res) {
    const userId = req.userId;
    const items = CartItemsModel.get(userId);
    return res.status(200).send(items);
  }

  deleteFromCart(req, res) {
    const userId = req.userId;
    console.log(req.params.id);
    const cartItemId = req.params.id;
    const error = CartItemsModel.delete(cartItemId, userId);
    if (error) {
      return res.status(404).send(error);
    } else {
      console.log(cartItemId, "deleted");
      return res.status(200).send("Item removed from cart");
    }
  }
}
