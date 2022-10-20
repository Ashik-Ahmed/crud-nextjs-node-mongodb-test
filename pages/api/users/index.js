import getData, { addNewUser, deleteUserFromDB, updateUserToDB } from "../../../database/controller";



const testAPI = (req, res) => {

    const { method } = req;


    switch (method) {
        case 'GET':
            getData(req, res);
            // res.status(200).json({ method, name: 'GET request' });
            break;
        case 'POST':
            // console.log(req.body)
            addNewUser(req, res);
            break;
        case 'PATCH':
            updateUserToDB(req, res);
            // res.status(200).json({ method, name: 'PUT request' });
            break;
        case 'DELETE':
            deleteUserFromDB(req, res);
            // res.status(200).json({ method, name: 'DELETE request' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;

    }
}

export default testAPI;