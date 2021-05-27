const Category = require("../../models/category");
const Product = require("../../models/product");


function createCategory(categories, parentId = null) {
    // console.log(parentId);
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId:cate.parentId,
            children: createCategory(categories, cate._id)

        });
    }


    return categoryList
}


exports.initialData=async (req,res)=>
{
    const categories= await Category.find({}).exec();
    const products= await Product.find({})
                                    .select("name _id description productPicture price quantity slug category").
                                    populate({path:'category',select:"name _id"})
                                    .exec();
    // select is use to specify which keys we want

    res.status(200).json({
        categories:createCategory(categories),
        products
    })
}
