import mongoose from "mongoose";
import express from "express";
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/usersDB", {
    useNewUrlParser: true,
});

app.use(express.json())

const userSchema = new mongoose.Schema({
    first_name: {
        type: String, required: true,
    },
    last_name: {
        type: String, required: true,
    },
    username: {
        type: String, required: true
    },
    email: {
        type: String, required: true,
    },
    phone_number: {
        type: String, required: true,
    },
    date_of_birth: {
        type: Date, required: true,
    },
});

const User = mongoose.model("User", userSchema);

///////////////////// Create  ////////////////////////////

app.post("/", async function (req, res) {

    let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
    });
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (error) {
        res.send("Error-----------------" + error);
    }
});

//////////////////////// Read   /////////////////////////////

app.get("/", async function (req, res) {
    try {

        let findUser = await User.find()
        res.send(findUser)
    }
    catch (error) {
        res.send("Error-----------------" + error)
    }
})

/////////////////// Read One /////////////////////////////////

app.get("/:id", async function (req, res) {
    try {
        let findOneUser = await User.findById(req.params.id)
        res.send(findOneUser)

    }
    catch (error) {
        res.send("Error-----------------" + error)
    }

})

/////////////////////  Update / Update All ////////////////////////////////

app.patch("/:id", async function (req, res) {
    try {
        let id = req.params.id
        let updateUser = await User.findById(id)

        await User.updateMany(updateUser, {

            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                phone_number: req.body.phone_number,
                date_of_birth: req.body.date_of_birth
            }
        }, { new: true })
        updateUser = await updateUser.save()
        res.send(updateUser)

    } catch (error) {
        res.send("Error-----------------" + error)
    }
})

//////////////////////  Delete  ///////////////////////////////

app.delete("/:id", async function (req, res) {
    try {
        let id = req.params.id
        let deleteUser = await User.findByIdAndDelete(id)
        res.send(deleteUser)

    } catch (error) {
        res.send("Error-----------------" + error)

    }
})

////////////////////////  Port : 3000 //////////////////////////////////////

app.listen("3000", function (req, res) {
    console.log("server starts at port 3000");
});
