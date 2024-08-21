import userModel from "../models/user.model.js";

const addToCart = async (req, res) => {
  const { _id } = req.user;
  try {
    let user = await userModel.findOne({ _id });

    let cartData =  user.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(_id, { cartData });
    res.json({ success: true, message: "Cart added" });
  } catch (error) {
    res.json({ success: false, message: error });
    console.log(error);
  }
};

const removeFromCart = async (req, res) => {

  const { _id } = req.user;
  try {
    let userId = await userModel.findById({ _id });

    let cartData = await userId.cartData;

    if (cartData[req.body.itemId]>0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(_id, { cartData });
    res.json({ success: true, message: "Cart remved" });
  } catch (error) {
    res.json({ success: false, message: error });
    console.log(error);
  }
};



const getCart = async (req, res) => {

  const {cartData} = req.user

  try {
    const AllCartData = await userModel.findOne({cartData})
    if(!cartData){
      return res.json({message:"cartData not found"})
    }
    res.json(AllCartData)
  } catch (error) {
    res.json({ success: false, message: error });
    console.log(error);
  }
};

export { addToCart, removeFromCart, getCart };
