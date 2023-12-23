const fs = require('fs')
const path = require ('path')
const productsJson = fs.readFileSync(__dirname + '../../database/product.json','utf-8')
const products = JSON.parse(productsJson)

const reutilizarJson = () => {
    const productsFilePath = path.join(__dirname, '../database/product.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products
}
const setJson = (array,fileName) => {
    const json = JSON.stringify(array);
    fs.writeFileSync(`${__dirname}/../database/${fileName}.json`,json,"utf-8")
}


const productsFilePath = path.join(__dirname, '../database/product.json');


const productsController ={
    //Este metodo hay que editarlo, Esteban. 
    index: (req, res) => {
        const products = reutilizarJson();
        res.render("products/products",{title:"Ardidas",products})
    },


    productCart:(req,res)=>{
        const {id} = req.params
        const product = products.find(producto => producto.id == id)
        res.render('products/productCart',{title:"Carrito", product})
    },


    productDetail:(req,res)=>{
        const products = reutilizarJson();
        const {id} = req.params
        const product = products.find(producto => producto.id == id)
        const productOff = products.filter(product => product.category === "oferta")

        res.render('products/productDetail',{title: "Detalle" ,product, productOff})
    },
    

    dashboard:(req, res) => {
        const products = reutilizarJson();
        res.render('products/dashboard', { title: "Dashboard", products });
    },



    productLoad: (req,res)=>{
        res.render("products/productLoad",{ title: "Crear"});
    },
    create: (req,res)=>{
        const file = req.file
        console.log("1er paso :", file)
        const archivoJson = reutilizarJson();
        console.log("2do paso :", archivoJson)
        const Nuevaid = Date.now();
        const {nombre, talles, descripcion, precio, category, color} = req.body;

        let nuevoJson = {
            id: +Nuevaid,
            nombre: nombre.trim(),
            talles,
            descripcion: descripcion.trim(),
            precio: +precio,
            imagen: file ? file.filename : "default-image.png",
            category,
            color
        }
        let productoNuevo = [...archivoJson, nuevoJson]
        setJson(productoNuevo, "product");
        res.redirect("/products/dashboard");
    
    },


    productEdit:(req, res) => {
        const {id} = req.params;        
        // const productsJson = fs.readFileSync(__dirname + '../../database/product.json','utf-8')
        // const products = JSON.parse(productsJson);
        const product = products.find(elemento => elemento.id == id);
        res.render("products/productEdit", {title:"Detalle producto",product})
        
    },
    update:(req, res) => {
        const {id} =req.params;
        const product = reutilizarJson();
        const {nombre,precio,descripcion,imagen,category,talles,color} = req.body;
        const nuevoArray = products.map(product => {
            if(product.id == id)
            return{
                id:+id,
                nombre:nombre.trim(),
                talles,
                color,
                precio:+precio,
                descripcion:descripcion.trim(),
                imagen: imagen ? imagen : product.imagen,
                category,
            }

        return product
        })
        const json = JSON.stringify(nuevoArray);
        fs.writeFileSync(productsFilePath, json, 'utf-8');
        res.redirect(`/products/detalle/${id}`);
    },



    update:(req, res) => {
        const {id} =req.params;
        const product = reutilizarJson();
        const {nombre,precio,descripcion,imagen,category,talles,color} = req.body;
        const nuevoArray = products.map(product => {
            if(product.id == id)
            return{
                id:+id,
                nombre:nombre.trim(),
                talles,
                color,
                precio:+precio,
                descripcion:descripcion.trim(),
                imagen: imagen ? imagen : product.imagen,
                category,
            }

        return product
        })
        const json = JSON.stringify(nuevoArray);
        fs.writeFileSync(productsFilePath, json, 'utf-8');
        res.redirect(`/products/detalle/${id}`);
    },
    destroy:(req, res) => {
        const {id}= req.params;
		const products = reutilizarJson();

        let product = products.find(product => product.id == id);
		let productClear = products.filter(product => product.id !== +req.params.id);
		const json = JSON.stringify(productClear);
        
        fs.unlink(path.join(__dirname,`../../public/images/${product.imagen}`), (err) =>{
			if(err) throw err;
			console.log(`borre el archivo ${product.image}`);
		})

		fs.writeFileSync(productsFilePath,json, "utf-8");
		res.redirect ('/products/dashboard')
	}

    
}

module.exports = productsController;