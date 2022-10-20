import { ObjectId } from "mongodb";
import clientPromise from "./connection";


const getData = async (req, res) => {

    try {
        var client = await clientPromise;

        var db = await client.db('testDB');

        const userData = await db.collection('testUserCollection').find({}).toArray();
        const users = JSON.parse(JSON.stringify(userData));
        // console.log(users);
        res.send(users);
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: 'Error while fetching data' })
    }
}

export default getData;


export const addNewUser = async (req, res) => {
    try {
        var client = await clientPromise;

        var db = await client.db('testDB');
        const user = req.body;

        const result = await db.collection('testUserCollection').insertOne(user);

        res.send(result);

    } catch (error) {
        console.log(error);
    }
}

export const updateUserToDB = async (req, res) => {
    try {
        var client = await clientPromise;

        var db = await client.db('testDB');

        const updatedUser = req.body;
        const filter = { _id: ObjectId(updatedUser.id) };
        const options = { upsert: true };

        // console.log(filter);
        // console.log(updatedUser);
        const updatedDoc = {
            $set: {
                name: updatedUser.name,
                email: updatedUser.email,
                website: updatedUser.website,
            }
        }

        const result = await db.collection('testUserCollection').updateOne(filter, updatedDoc, options);
        res.send(result);


    } catch (error) {
        console.log(error);
    }
}

export const deleteUserFromDB = async (req, res) => {

    try {
        var client = await clientPromise;

        var db = await client.db('testDB');


        const userInfo = req.body;
        const id = { _id: ObjectId(userInfo._id) };

        const result = await db.collection('testUserCollection').deleteOne(id);

        res.send(result);


    } catch (error) {
        console.log(error);
    }
}