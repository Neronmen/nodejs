
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

// [Get] /admin/product
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    const status = req.query.status;
    find.status = status;
  }
  // Bộ lọc 
  const filterStatus = filterStatusHelper(req.query);
  // End bộ lọc

  // Tìm kiếm 
    const objectSearch = searchHelper(req.query);
    var keyword = "";
    if(objectSearch.regex){
        keyword = objectSearch.keyword;
        find.title = objectSearch.regex
    }
  // End tìm kiếm

    //pagination
    //CT: (Trang hiện tại - 1) * (số sản phẩm 1 trang)
    const countProduct = await Product.countDocuments(find);
    const objectPage = paginationHelper({
        currentPage: 1,
        limit: 4,
        skip:0
    },
    req.query,
    countProduct
)

    // End pagination




  const listProduct = await Product.find(find).sort({position: "desc"}).limit(objectPage.limit).skip(objectPage.skip);

  res.render("admin/pages/product/index", {
    pageTitle: "Trang danh sách sản phẩm",
    listProduct: listProduct,
    filterStatus: filterStatus,
    keyword: keyword,
    objectPage: objectPage
  });
};



// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) =>{
    const status = req.params.status;
    const id = req.params.id;
    req.flash('success', 'Đã cập nhật thành công trạng thái sản phẩm');
    await Product.updateOne({_id:id},{status: status})
    res.redirect("back")
}




// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) =>{
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
      case "active":
        req.flash('success', `Đã cập nhật thành công trạng thái ${ids.length} sản phẩm`);
        await Product.updateMany({_id: { $in: ids }},{status: type});
        res.redirect("back")
        break;
      case "inactive":
        req.flash('success', `Đã cập nhật thành công trạng thái ${ids.length} sản phẩm`);
        await Product.updateMany({_id: { $in: ids }},{status: type});
        res.redirect("back")
        break;
      case "delete":
        req.flash('success', `Đã xóa thành công  ${ids.length} sản phẩm`);
        await Product.updateMany({_id: { $in: ids }},{deleted: true});
        res.redirect("back")
        break;
      case "change-position":
        for(const item of ids){
          var [id,position] = item.split("-");
          position = parseInt(position);
          await Product.updateOne({_id: id},{position: position})
        }
        res.redirect("back")
        break;
      default:
        break;
    }
}




// [PATCH] /admin/product/delete/:id
module.exports.delete = async (req, res) =>{
    const id = req.params.id;
    await Product.updateOne({_id: id},{deleted: true});
    res.redirect("back")
}


// [Get] /admin/product/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/product/create",{
    pageTitle: "Thêm sản phẩm"
  })
};



// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if(req.body.position == ""){
      const countProduct = await Product.countDocuments();
      req.body.position = countProduct + 1;
    }else{
      req.body.position = parseInt(req.body.position)
    }
    if(req.file){
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/product`)
};




// [Get] /admin/product/edit/:id
module.exports.edit = async (req, res) => {

  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id
  }
  const product = await Product.findOne(find)



  res.render("admin/pages/product/edit",{
    pageTitle: "Cập nhật sản phẩm",
    product: product
  })
};



// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  req.body.position = parseInt(req.body.position)
  if(req.file){
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  const id = req.params.id
  await Product.updateOne({_id: id},req.body)
  req.flash('success', `Cập nhật sản phẩm thành công`);
  res.redirect(`back`)
};



// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {

  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id
  }
  const product = await Product.findOne(find)
  res.render("admin/pages/product/detail",{
    pageTitle: product.title,
    product: product
  })
};
