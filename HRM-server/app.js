const express = require('express');
const app = express();
const conn = require('./db/conn');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./router/userRouters');
const authRoutes = require('./router/authRouters');
const cors = require('cors');

app.use(cors());


//database connectiongffgfdafds fdfgdgffds 123456 7891011122345
conn();//Some update 11111
app.use(express.json({limit : '100mb'}));

//parsed JSON Data
app.use(express.urlencoded({extended : false}));

// app.use('/',express.static(__dirname + '/../client'));

app.use('/',express.static(__dirname + '/public'));

app.use('/uploads',express.static(__dirname + '/uploads'));


//userRoutes
app.use(userRoutes);


//authRoutes
app.use(authRoutes);


app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`)
});




// const express = require('express');
// const app = express();
// const conn = require('./db/conn');
// const dotenv = require('dotenv');
// const userRoutes = require('./router/userRouters');
// const authRoutes = require('./router/authRouters');
// const cors = require('cors');

// dotenv.config();
// app.use(cors());

// // Database connection
// conn();

// // Middleware to parse JSON data
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ extended: false }));

// // Serve static files
// app.use('/', express.static(__dirname + '/public'));
// app.use('/uploads', express.static(__dirname + '/uploads'));

// // User routes
// app.use(userRoutes);

// // Auth routes
// app.use(authRoutes);

// // Define a route to get user by ID with full image URL
// app.get('/users/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {
//     // Assuming you have a User model to fetch data from your database
//     const user = await User.findById(userId); // Fetch user from DB
//     if (user) {
//       // Construct the full URL for the image
//       const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${user.image}`; // Adjust this path as needed
//       res.json({
//         success: true,
//         data: {
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           image: imageUrl // Use the full URL here
//         }
//       });
//     } else {
//       res.status(404).json({ success: false, message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // Start the server
// app.listen(process.env.PORT, () => {
//   console.log(`Server running at http://localhost:${process.env.PORT}`);
// });
