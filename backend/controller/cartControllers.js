import Cart from "../model/cartModel.js";

export const addtoCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log("id in addto cart", req.user);
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const productExists = cart.items.some(
        (item) => item.product.toString() === productId
      );

      if (productExists) {
        return res.status(200).send({
          success: true,
          message: "Product already in cart",
          cart,
        });
      }

      // If product is not in cart, add it
      cart.items.push({ product: productId, quantity: Number(quantity) });
      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: Number(quantity) }],
      });
      await cart.save();
    }

    res
      .status(200)
      .send({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error adding to cart", error });
  }
};

//fetching
export const getCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res
        .status(200)
        .send({ success: true, message: "Cart is empty", cart: [] });
    }
    res.status(200).send({ success: true, cart: cart.items });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error fetching cart", error });
  }
};

//remove items from cart
export const removeFromCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .send({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res.status(200).send({ success: true, message: "Item removed", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error removing item", error });
  }
};

// Clear entire cart
export const clearCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).send({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error clearing cart", error });
  }
};
