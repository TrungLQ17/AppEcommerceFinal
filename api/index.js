const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8000;
const ipAddress = "192.168.43.131";
//const ipAddress = "192.168.1.10";
const jwt = require("jsonwebtoken");


app.listen(port, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${port}`);
});


mongoose.connect("mongodb+srv://trunglequanghz:trung@cluster0.mlns87m.mongodb.net/", {
<<<<<<< HEAD
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
=======
//mongoose.connect("mongodb+srv://Letuongvi:1222029260@cluster0.htwzbqp.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
>>>>>>> 455db45fcd759cd235c711919a87f433028a29b0
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


const User = require("./models/user");
const Order = require("./models/order");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trunglequanghz@gmail.com",
      pass: "trungLQ17102002@ok",
    },
  });

  const mailOptions = {
    from: "ecomerce.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://192.168.43.131:8000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};


app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    console.log("New User Registered:", newUser);


    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(500).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.addresses.push(address);

    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });
<<<<<<< HEAD

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" })
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
})

//đổi pass
app.post("/setAccount/:userID", async (req, res) => {
  try {
    const userId = req.params.userID;
    const { newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password" });
  }
});
=======
    
    const generateSecretKey = () => {
      const secretKey = crypto.randomBytes(32).toString("hex");
    
      return secretKey;
    };
    
    const secretKey = generateSecretKey();
    
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
    
        if (user.password !== password) {
          return res.status(401).json({ message: "Invalid password" });
        }
    
        const token = jwt.sign({ userId: user._id }, secretKey);
    
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ message: "Login Failed" });
      }
    });
    
    app.post("/addresses", async (req, res) => {
      try {
        const { userId, address } = req.body;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        user.addresses.push(address);
    
        await user.save();
    
        res.status(200).json({ message: "Address created Successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error addding address" });
      }
    });
    
    app.get("/addresses/:userId", async (req, res) => {
      try {
        const userId = req.params.userId;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const addresses = user.addresses;
        res.status(200).json({ addresses });
      } catch (error) {
        res.status(500).json({ message: "Error retrieveing the addresses" });
      }
    });
    
    app.post("/orders", async (req, res) => {
      try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
          req.body;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const products = cartItems.map((item) => ({
          name: item?.title,
          quantity: item.quantity,
          price: item.price,
          image: item?.image,
        }));
    
        const order = new Order({
          user: userId,
          products: products,
          totalPrice: totalPrice,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
        });
    
        await order.save();
    
        res.status(200).json({ message: "Order created successfully!" });
      } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
      }
    });
    
    app.get("/profile/:userId", async (req, res) => {
      try {
        const userId = req.params.userId;
    
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({ user });
      } catch (error) {
        res.status(500).json({ message: "Error retrieving the user profile" });
      }
    });
    
    app.get("/orders/:userId",async(req,res) => {
      try{
        const userId = req.params.userId;
    
        const orders = await Order.find({user:userId}).populate("user");
    
        if(!orders || orders.length === 0){
          return res.status(404).json({message:"No orders found for this user"})
        }
    
        res.status(200).json({ orders });
      } catch(error){
        res.status(500).json({ message: "Error"});
      }
    })
    
    app.get('/orders/:orderId', async (req, res) => {
      try {
        const orderId = req.params.orderId;
    
        // Tìm đơn hàng trong cơ sở dữ liệu dựa trên orderId
        const order = await Order.findById(orderId).populate('user');
    
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
    
        // Nếu tìm thấy đơn hàng, gửi thông tin chi tiết của đơn hàng về client
        res.status(200).json({ order });
      } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Error fetching order details' });
      }
    });

    //đổi pass
app.post("/setAccount/:userID", async (req, res) => {
  try {
    const userId = req.params.userID;
    const { newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password" });
  }
});
