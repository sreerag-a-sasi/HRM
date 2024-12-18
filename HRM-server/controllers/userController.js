const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const users = require('../db/models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fileUpload = require('../utils/file-upload').fileUpload;
const set_password_template = require("../utils/set-password").resetPassword;
const resetPassword = require("../utils/resetpassword").resetPassword;
const sendEmail = require("../utils/send-email").sendEmail;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// exports.addUser = async function (req, res) {
//     try {
//         console.log("body : ", req.body);

//         let firstName = req.body.firstName;
//         let lastName = req.body.lastName;
//         let email = req.body.email.trim();
//         let image = req.body.image;
//         /////////////////////////////////////////////////////////////////////////////////



//         //Generating random password for new user
//         function generateRandomPassword(length) {
//             let charset =
//                 "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
//             let password = "";

//             for (var i = 0; i < length; i++) {
//                 var randomIndex = Math.floor(Math.random() * charset.length);
//                 password += charset.charAt(randomIndex);
//             }


//             return password;
//         }

//         var randomPassword = generateRandomPassword(12);
//         // console.log("random password" ,randomPassword);


//         let password = randomPassword;


//         /////////////////////////////////////////////////////////////////////////////////

//         // console.log("firstname : ", firstName);
//         // console.log("lastname : ", lastName);
//         // console.log("email : ", email);
//         // console.log("password : ", password);
//         // console.log("image : ", image);

//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         if (!emailRegex.test(email)) {
//             let response = error_function({
//                 statusCode: 400,
//                 message: "invalid email id",
//             });

//             return res.status(response.statusCode).send(response);
//         }
//         const count = await users.countDocuments({ email: req.body.email.trim() });
//         console.log(`Number of documents with the same email: ${count}`);
//         if (count>=1) {
//             let response = error_function({
//                 statusCode: 400,
//                 message: "user with this email id already exist",
//             });
//             return res.status(response.statusCode).send(response);
//         } else {
//             let salt = bcrypt.genSaltSync(10);
//             console.log("salt : ", salt);
//             let hashed_password = bcrypt.hashSync(password, salt);
//             console.log("hashed_password : ", hashed_password);

//             let img_path;
//             if (image && image !== "removed") {
//                 img_path = await fileUpload(image, "users");
//             }
//             console.log("img_path : ", img_path);
//             //validation
//             //failed : error_response
//             //success : Continue 
//             //Count email
//             //if email count greater than zero error_response : email must be unique
//             //else continue
//             //save to database
//             const new_user = await users.create({
//                 firstName,
//                 lastName,
//                 email,
//                 password: hashed_password,
//                 image: img_path,
//                 user_type: "668bb6fdfaa2016df7cef426",
//             });

//             if (new_user) {
//                 ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                 console.log("REAched here ...");
//                 let email_template = await set_password_template(
//                     firstName,
//                     email,
//                     password
//                 );

//                 let send = await sendEmail(email, "Update Password", email_template);




//                 //send response
//                 message = message + " and login details send to official email";

//                 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                 let response = success_function({
//                     statusCode: 201,
//                     data: new_user,
//                     message: "User created successfully",
//                 });
//                 return res.status(response.statusCode).send(response);
//             } else {
//                 let response = error_function({
//                     statusCode: 400,
//                     message: "User creation failed",
//                 });
//                 return res.status(response.statusCode).send(response);
//             }
//         }

//     } catch (error) {
//         console.log("error : ", error);
//         //return res.status(400).send("failed");
//         let response = error_function({
//             statusCode: 400,
//             message: "something went wrong",
//         });
//         return res.status(response.statusCode).send(response);
//     }
// }





exports.addUser = async function (req, res) {
    try {
        console.log("Request Body: ", req.body); // Log incoming request

        let { firstName, lastName, email, image } = req.body;
        email = email.trim(); // Trim spaces

        // Check for empty fields
        if (!firstName || !lastName || !email) {
            console.error("Missing required fields.");
            return res.status(400).send({ message: "First name, last name, and email are required." });
        }

        // Generate random password for new user
        function generateRandomPassword(length) {
            let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
            let password = "";
            for (let i = 0; i < length; i++) {
                let randomIndex = Math.floor(Math.random() * charset.length);
                password += charset.charAt(randomIndex);
            }
            return password;
        }

        var randomPassword = generateRandomPassword(12);
        console.log("Generated random password");

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            console.error("Invalid email ID:", email);
            return res.status(400).send({ message: "Invalid email ID" });
        }

        // Count documents with the same email
        const count = await users.countDocuments({ email: email });
        console.log(`Number of documents with the same email: ${count}`);

        if (count > 0) {
            console.error("User with this email already exists");
            return res.status(400).send({ message: "User with this email ID already exists" });
        }

        // Hashing password
        let salt = bcrypt.genSaltSync(10);
        let hashed_password = bcrypt.hashSync(randomPassword, salt);
        console.log("Hashed Password:", hashed_password);

        // Handle image upload
        let img_path;
        if (image && image !== "removed") {
            img_path = await fileUpload(image, "users");
            console.log("Image Path:", img_path);
        }

        // Save to database
        const new_user = await users.create({
            firstName,
            lastName,
            email,
            password: hashed_password,
            image: img_path,
            user_type: "668bb6fdfaa2016df7cef426",
        });

        if (new_user) {
            console.log("New user created:", new_user);
            let email_template = await set_password_template(firstName, email, randomPassword);
            await sendEmail(email, "Update Password", email_template);
            
            return res.status(201).send({ message: "User created successfully", data: new_user });
        } else {
            console.error("User creation failed");
            return res.status(400).send({ message: "User creation failed" });
        }
    } catch (error) {
        console.error("Error occurred:", error); // Log the actual error
        return res.status(500).send({ message: "Something went wrong", error: error.message }); // Provide error details
    }
}







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.updateUser = async function (req, res) {
    try {
        let body = req.body;
        console.log("body from userconroller : ", body);

        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let image = req.body.image;
        console.log("image file from usercontroller:", image || 'null');
        

        const count = await users.countDocuments({ email: req.body.email });
        console.log(`Number of documents with the same email: ${count}`);


        let img_path;
        if (image && image !== "removed") {
            img_path = await fileUpload(image, "users");
        }
        console.log("img_path : ", img_path);


        const update_datas = ({
            firstName,
            lastName,
            email,
            image: img_path,
        });
        //save to database

        let id = req.params.id;
        console.log("id : ", id);

        // let _id = new ObjectId(id);
        const update_user = await users.findOneAndUpdate(
            { _id: id },
            { $set: update_datas },
        );

        if (update_user && count === 0) {
            let response = success_function({
                statusCode: 201,
                data: update_user,
                message: "User updated successfully",
            });
            return res.status(response.statusCode).send(response);
        } else {
            let response = error_function({
                statusCode: 400,
                message: "User updation failed",
            });
            return res.status(response.statusCode).send(response);
        }
    } catch (error) {
        console.log("error : ", error);
        //return res.status(400).send("failed");
        let response = error_function({
            statusCode: 400,
            message: "something went wrong",
        });
        return res.status(response.statusCode).send(response);
    }
}


// exports.updateUser = async function (req, res) {
//     try {
//       let body = req.body;
//       console.log("body from usercontroller:", body);
  
//       let { firstName, lastName, email, image } = body;
//       console.log("image file from usercontroller:", image || 'null');
  
//       const count = await users.countDocuments({ email: req.body.email });
//       console.log(`Number of documents with the same email: ${count}`);
  
//       let img_path;
//       if (image && image !== "removed" && image !== null) {
//         img_path = await fileUpload(image, "users");
//       }
  
//       // Prepare the update data, only include img_path if it's defined
//       const update_datas = {
//         firstName,
//         lastName,
//         email,
//         ...(img_path !== undefined && { image: img_path }),
//       };
  
//       // Save to database
//       let id = req.params.id;
//       console.log("id:", id);
  
//       const update_user = await users.findOneAndUpdate(
//         { _id: id },
//         { $set: update_datas },
//         { new: true } // Return the updated document
//       );
  
//       if (update_user && count === 0) {
//         let response = success_function({
//           statusCode: 201,
//           data: update_user,
//           message: "User updated successfully",
//         });
//         return res.status(response.statusCode).send(response);
//       } else {
//         let response = error_function({
//           statusCode: 400,
//           message: "User updation failed",
//         });
//         return res.status(response.statusCode).send(response);
//       }
//     } catch (error) {
//       console.log("error:", error);
//       let response = error_function({
//         statusCode: 400,
//         message: "something went wrong",
//       });
//       return res.status(response.statusCode).send(response);
//     }
//   };
  


// exports.updateUser = async function (req, res) {
//     try {
//       let body = req.body;
//       console.log("body from usercontroller:", body);
  
//       let { firstName, lastName, email, image } = body;
//       console.log("image file from usercontroller:", image || 'null');
  
//       let img_path;
//       if (image && image !== "removed" && image !== null) {
//         img_path = await fileUpload(image, "users");
//       }
  
//       // Prepare the update data, only include img_path if it's defined
//       const update_datas = {
//         firstName,
//         lastName,
//         email,
//         ...(img_path !== undefined && { image: img_path }),
//       };
  
//       // Save to database
//       let id = req.params.id;
//       console.log("id:", id);
  
//       const update_user = await users.findOneAndUpdate(
//         { _id: id },
//         { $set: update_datas },
//         { new: true } // Return the updated document
//       );
  
//       if (update_user && count === 0) {
//         let response = success_function({
//           statusCode: 201,
//           data: update_user,
//           message: "User updated successfully",
//         });
//         return res.status(response.statusCode).send(response);
//       } else {
//         let response = error_function({
//           statusCode: 400,
//           message: "User updation failed",
//         });
//         return res.status(response.statusCode).send(response);
//       }
//     } catch (error) {
//       console.log("error:", error);
//       let response = error_function({
//         statusCode: 400,
//         message: "something went wrong",
//       });
//       return res.status(response.statusCode).send(response);
//     }
//   };
  


// exports.getUser = async function (req, res) {
//     try {
//         const data = await users.find({});
//         // console.log("data : ", data);
//         const json_data = JSON.stringify(data);
//         // console.log("json_data : ", json_data);
//         if (data) {
//             let response = success_function({
//                 statusCode: 201,
//                 data: data,
//                 message: "all users found",
//             });
//             return res.status(response.statusCode).send(response);
//         }
//     } catch (error) {
//         console.log("error : ", error);
//         //return res.status(400).send("failed");
//         let response = error_function({
//             statusCode: 400,
//             message: "something went wrong",
//         });
//         return res.status(response.statusCode).send(response);
//     }
// }








exports.deleteUser = async function (req, res) {
    try {
        let id = req.params.id;
        console.log("id : ", id);
        const deleted_User = await users.findOneAndDelete({ _id: id });
        console.log("deleted user : ", deleted_User);
        if (deleted_User) {
            let response = success_function({
                statusCode: 201,
                data: deleted_User,
                message: "User deleted successfully",
            });
            return res.status(response.statusCode).send(response);
        } else {
            let response = error_function({
                statusCode: 400,
                message: "User deletion failed",
            });
            return res.status(response.statusCode).send(response);
        }
    } catch (error) {
        console.log("error : ", error);
        let response = error_function({
            statusCode: 400,
            message: "something went wrong",
        });
        return res.status(response.statusCode).send(response);
    }
}



exports.uniqueUser = async function (req, res) {
    try {

        let userData = req.body.userData;

        if (userData) {
            let response = success_function({
                statusCode: 200,
                data: userData,
            });
            return res.status(response.statusCode).send(response);
        } else {


            let id = req.params.id;
            console.log("id : ", id);


            // let _id = new ObjectId(id);
            const unique_User = await users.findOne({ _id: id });
            console.log("unique user : ", unique_User);
            if (unique_User) {
                let response = success_function({
                    statusCode: 201,
                    data: unique_User,
                    message: "User found successfully",
                });
                return res.status(response.statusCode).send(response);
            } else {
                let response = error_function({
                    statusCode: 400,
                    message: "User not found",
                });
                return res.status(response.statusCode).send(response);
            }
        }
    } catch (error) {
        console.log("error : ", error);
        //return res.status(400).send("failed");
        let response = error_function({
            statusCode: 400,
            message: "something went wrong",
        });
        return res.status(response.statusCode).send(response);
    }
}



exports.getUser = async function (req, res) {
    try {

        let keyword = req.query.keyword;
        //   console.log("keyword : ", keyword);

        let filters = [];

        if (keyword) {
            filters.push({
                $or: [
                    { "firstName": { $regex: keyword, $options: "i" } },
                    { "lastName": { $regex: keyword, $options: "i" } }
                ],
            });
        }
        //   console.log("filter object : ",filters);


        let users_data = await users
            .find(filters.length > 0 ? { $and: filters } : null)
            .sort({ _id: +1 })

        if (users_data) {

            let response = success_function({
                statusCode: 200,
                data: users_data,
                message: "Users fetched successfully",
            });

            res.status(response.statusCode).send(response);
            return;
        } else {
            let response = error_function({
                statusCode: 404,
                message: "User data not found",
            });
            res.status(response.statusCode).send(response);
            return;
        }
    } catch (error) {
        if (process.env.NODE_ENV == "development") {
            let response = error_function({
                statusCode: 400,
                message: error
                    ? error.message
                        ? error.message
                        : error
                    : "Something went wrong",
            });

            res.status(response.statusCode).send(response);
            return;
        } else {
            let response = error_function({ statusCode: 400, message: error });
            res.status(response.statusCode).send(response);
            return;
        }
    }
};
