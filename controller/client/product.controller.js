const Product = require("../../models/product.model");


module.exports.index = async (req, res) => {
  const listProduct = await Product.find({
    status: "active",
    deleted: false
  }).sort({position: "desc"});
    const newListProduct = listProduct.map(item => {
      item.priceNew = ((item.price * (100-item.discountPercentage))/100).toFixed(0)
      return item;
    })
    console.log(newListProduct)
  res.render("client/pages/products/index.pug",{
    pageTitle: "Danh sách sản phẩm",
    listProduct: newListProduct
  });
};



// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const find = {
      deleted: false,
      slug: slug,
      status: "active"
    }
    const product = await Product.findOne(find)
    res.render("client/pages/products/detail.pug",{
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    res.redirect("/products");
  }

};


