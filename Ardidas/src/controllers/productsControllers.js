const fs = require('fs')
const productsJson = fs.readFileSync(__dirname + '../../database/product.json','utf-8')
const products = JSON.parse(productsJson)


const productsController ={
    productCart:(req,res)=>{
        res.render('products/productCart',{title:"Carrito"})
    },
    productDetail:(req,res)=>{
        const {id} = req.params
        const product = products.find(producto => producto.id == id)
        res.render('products/productDetail',{title: "Detalle" ,product})
    },
    
    dashboard:(req, res) => {
        res.render('products/dashboard', { title: "Dashboard", products });
    },
    productEdit:(req, res) => {
         const {id} = req.params;        
        // const productsJson = fs.readFileSync(__dirname + '../../database/product.json','utf-8')
        // const products = JSON.parse(productsJson);
         const product = products.find(elemento => elemento.id == id);
        res.render("products/productEdit", {title:"Detalle producto",product})
        
    },
    // update: (req,res) => {
    //     console.log(req.body)
    //     res.redirect("/products/dashboard")
    // },
}

module.exports = productsController;