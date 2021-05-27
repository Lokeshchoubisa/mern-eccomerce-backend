const express = require("express")
// const { stringify } = require("qs")
const slugify = require("slugify")
const Category = require("../models/category")

exports.addCategory = (req, res) => {
    // console.log(req.body);
    // return 0;
    // console.log(req.files);
    const CategoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.body.parentId) {
        CategoryObj.parentId = req.body.parentId;
    }
    if (req.file) {
        CategoryObj.categoryImage = "/public/" + req.file.filename;
    }
    // console.log(category);
    Category.find({ slug: CategoryObj.slug }, (err, body) => {
        if (body.length > 0) {
            return res.status(400).json({ msg: "already exists" });
        }
        else {
            const cat = new Category(CategoryObj);
            cat.save((error, category) => {
                if (error) {
                    return res.status(400).json({
                        error
                    });
                }
                if (category) {
                    return res.status(201).json({ category })
                }
            });

        }

    });
    // return 0;



}

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

exports.getCategory = (req, res) => {


    Category.find({}).exec((error, categories) => {
        if (error) {
            res.status(400).json({ error })
        }
        if (categories) {
            categoryList = createCategory(categories)
            res.status(200).json({ categoryList })
        }
    })

}


exports.updateCategories= async (req,res)=>
{

    const {_id,name,parentId,type}=req.body;
    const updatedCategories=[];
    if(name instanceof Array)
    {   
        for(let i=0;i<name.length;i++)
        {
            const category={
                name:name[i],
                
                type:type[i]
            };
            category.slug=slugify(category.name);
            if(parentId[i]==="none")
            {
                category.parentId=undefined;
            }
            else if(parentId[i] !=="")
            {
                category.parentId=parentId[i];
            }

            const updatedCategory=await Category.findOneAndUpdate({_id:_id[i]},category,{new:true});
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json(
            {
                updatedCategories
            }
        )
    }
    else
    {
        const category={
            name,type,
            slug:slugify(name)
        }
        if(parentId !=="")
        {
            category.parentId=parentId;
        }
        else
        {
            category.parentId=undefined;
        }
        
        const updatedCategory=await Category.findOneAndUpdate({_id},category,{new:true});
        updatedCategories.push(updatedCategory);
        
        return res.status(201).json( {updatedCategory} )
    }

}
exports.deleteCategories= async (req,res)=>
{

    const {_id,name,parentId,type}=req.body;
    const updatedCategories=[];
    if(_id instanceof Array)
    {   
        for(let i=0;i<_id.length;i++)
        {
           
            const deletedCategory=await Category.findOneAndDelete({_id:_id[i]});
            deletedCategories.push(deletedCategory);
        }
        return res.status(201).json(
            {
                deletedCategories
            }
        )
    }
    else
    {
        // const category={
        //     name,type,
        //     slug:slugify(name)
        // }
        // if(parentId !=="")
        // {
        //     category.parentId=parentId;
        // }
        // else
        // {
        //     category.parentId=undefined;
        // }
        
        // const updatedCategory=await Category.findOneAndUpdate({_id},category,{new:true});
        // updatedCategories.push(updatedCategory);
        
        const deletedCategory=await Category.findOneAndDelete({_id});
        // /deletedCategories.push(deletedCategory);
        
        return res.status(201).json( {deletedCategory} )
    }

}