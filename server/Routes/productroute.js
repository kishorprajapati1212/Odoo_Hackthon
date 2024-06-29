const express = require("express");
const router = express.Router();
const ProductModel = require("../Model/Product.js");

router.post("/productsadd", async (req, res) => {
  try {
    console.log('Request received for adding a product.');
    const { name, rentingPrice, image, description, category,stock } = req.body;

    const newProduct = new ProductModel({
      name: name,
      rentingPrice: rentingPrice,
      image: image,
      description: description,
      category: category,
      stock: stock,
    });

    await newProduct.save();
    console.log('Product successfully saved:', newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error during product creation:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();

    // Convert image to base64
    const productsWithBase64 = products.map((product) => ({
      ...product.toObject(),
      img1: `data:image/jpeg;base64,${product.img1}`, // Adjust MIME type if necessary
    }));

    res.status(200).json(productsWithBase64);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/deleteproducts/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    await ProductModel.findOneAndDelete({ _id: productId });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/productdetail/:productId', async(req,res) =>{
  const productId = req.params.productId;

  try {
    console.log(productId)
    const product = await ProductModel.findOne({ _id: productId });
    console.log(product);
    res.status(200).json({ message: 'Product Find successfully', product });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;
