const port = 4000;

const express = require("express")
const app = express()
const axios = require("axios");

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer") // image storage engine
const path = require("path") // access backend directory in express app
const cors = require("cors")

app.use(express.json());// response data parse through json
app.use(cors())// react js project connect to express js on 4000 port

//Database connection with MongoDB
mongoose.connect("mongodb+srv://sanjay12:eUn7gFPGjhlRq696@cluster0.xw6npoe.mongodb.net/LiquirApp")



app.get('/', (req, res) => {
     res.send("Express App is running")
});

// Image storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:( req, file, cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const  secretKey= "test_secret_key_a40c0e9764424956a3764de3c4ac0139";

const upload = multer({ storage:storage })

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))

// MiddleWare to fetch user from database
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success:1,
       image_url: `http://localhost:4000/images/${req.file.filename}`
    })


})

// Schema for creating user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  age: {
    type: Number,
    
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// Schema for creating Product
const Product = mongoose.model("Product", {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    new_price: {
      type: Number
    },
    old_price: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now,
    },
    avilable: {
      type: Boolean,
      default: true,
    },
  });

  const Checkout = mongoose.model("Checkout", {

    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      
    },
    cartData: {
      type: Object,
    },
    status: {
      type: String,
      default: "pending"
    },
    date: {
      type: Date,
      default: Date.now,
    },
    
  });
  app.get("/", (req, res) => {
    res.send("Root");
  });


  app.post("/khalti-api", async (req, res) => {
    const payload = req.body;
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${secretKey}`,
        },
      }
    );
  
    if (khaltiResponse) {
      res.json({
        success: true,
        data: khaltiResponse?.data,
      });
    } else {
      res.json({
        success: false,
        message: "something went wrong",
      });
    }
  });

app.post('/checkout', async (req, res) => {
  try {
    let success = false;
    const checkout = new Checkout({
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      paymentMethod:req.body.paymentMethod,
      totalAmount:req.body.totalAmount,
      cartData:req.body.cartData,
      
    });

    await checkout.save();

    success = true; 
    console.log("Checkout has been added" )
    res.json({ success, message:"Checkout has been added" })
  } 
  catch (error) {

    res.status(500).json({ success: false, errors: "Internal server error" });
  }
})

//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id, 
                    email: user.email,
                }
            }
			success = true;
      console.log(user.id);
			const token = jwt.sign(data, 'secret_ecom');
			res.json({ success, token });
        }
        else {
            return res.status(400).json({success: success, errors: "please try with correct email/password"})
        }
    }
    else {
        return res.status(400).json({success: success, errors: "please try with correct email/password"})
    }
})


//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
        let success = false;
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: success, errors: "existing user found with this email" });
        }
        let cart = {};
          for (let i = 0; i < 300; i++) {
          cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        
        const token = jwt.sign(data, 'secret_ecom');
        success = true; 
        res.json({ success, token })
    })

app.get("/newcollections", async (req, res) => {
      let products = await Product.find({});
      let arr = products.slice(1).slice(-8);
      console.log("New Collections");
      res.send(arr);
    });

app.post('/addproduct', async(req, res) => {
     let success =false;
     let normalizedExistingNames = (await Product.find({}, 'name')).map(product => product.name.trim().toLowerCase());
     let incomingProductName = req.body.name.trim().toLowerCase();
   
     if (normalizedExistingNames.includes(incomingProductName)) {
       return res.status(400).json({ success: success, errors: "Existing product found with this name" });
     }
    let products = await Product.find({});
    let id;
    if(products.length >0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id+1;
    }
    else{
        id =1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
      });

      console.log(product)
      await product.save()
      console.log('saved')
      res.json({
        success:true,
        name: req.body.name,
      })

})
// deleting a product
app.post("/removeproduct", async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({success:true,name:req.body.name})
  });

app.post('/updateproduct', async (req, res) => {
    try {
      const productId = req.body.id;
      const updatedProduct = {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
      };
  
      // Update the product in the database
      const result = await Product.findOneAndUpdate(
        { id: productId },
        { $set: updatedProduct },
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({ success: false, errors: "Product not found" });
      }
  
      res.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ success: false, errors: "Internal server error" });
    }
  });
  
  
  // Creating API for getting all products

app.get("/allproducts", async (req, res) => {
	let products = await Product.find({});
  console.log("All Products");
    res.send(products);
});


//Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
	console.log("Add Cart");
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
  })

  //Create an endpoint for saving the product in cart
  app.post('/removefromcart', fetchuser, async (req, res) => {
    console.log("Remove Cart");
      let userData = await Users.findOne({_id:req.user.id});
      if(userData.cartData[req.body.itemId]!=0)
      {
        userData.cartData[req.body.itemId] -= 1;
      }
      await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
      res.send("Removed");
    })

    //Create an endpoint for saving the product in cart
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);

  })
  // Create an endpoint to clear the cart
app.post('/clearcart', fetchuser, async (req, res) => {
  try {
    console.log("Clear Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    let cart = {};
    for (let i = 0; i < 300; i++) {
    cart[i] = 0;
     }
   
     userData.cartData = cart;

    // Save the updated user data
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

    res.send("Cart cleared successfully");
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).send("Error clearing cart");
  }
});

app.get('/getCheckOut', fetchuser, async (req, res) => {
	console.log("getCheckOut ");
     
    let checkouts = await Checkout.find({email:req.user.email});
    
    if (checkouts.length === 0) {
      return res.status(404).json({ success: false, message: 'No checkouts found for the email ID' });
    }
    
    res.json({ success: true, checkouts: checkouts });
  })

  app.get('/getcheckouts', async (req, res) => {
    console.log("getcheckouts ");
       
      let checkouts = await Checkout.find({});
      
      if (checkouts.length === 0) {
        return res.status(404).json({ success: false, message: 'No checkouts found for the email ID' });
      }
      
      res.json({ success: true, checkouts: checkouts });
    })

    app.post('/Orderstatus', async (req, res) => {
      const { orderId, status } = req.body;
    
      try {
        const checkout = await Checkout.findById(orderId);
    
        if (!checkout) {
          return res.status(404).json({ success: false, message: 'Checkout not found' });
        }
    
        checkout.status = status;
        await checkout.save();
    
        res.json({ success: true, message: 'Order status updated', checkout });
      } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });
    
  


app.listen(port, (error) => {
    if (!error) console.log("Server Running on port " + port);
    else console.log("Error : ", error);
  });
  