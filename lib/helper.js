export const getUsers = async () => {
    const data = await fetch('http://localhost:3000/api/users');
    const users = await data.json();
    // console.log((users))
    return users;
}

export const addUserToDB = async (userData) => {
    // console.log(userData);
    try {
        const result = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })

        return result;


    } catch (error) {
        return error;
    }
}

export const updateUserHandle = async (updatedUser, refreshData) => {
    try {
        const result = await fetch('http://localhost:3000/api/users', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        }).then(res => res.json()).then(data => {
            if (data.acknowledged) {
                refreshData();
            }
        })
        // console.log(updatedUser)

    } catch (error) {
        return error;
    }
}


export const handleDeleteUser = async (deleteUser, refreshData) => {
    try {

        fetch('http://localhost:3000/api/users', {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(deleteUser)
        }).then(res => res.json()).then(data => {
            if (data.acknowledged) {
                refreshData();
            }
        })


    } catch (error) {
        console.log(error)
    }

}
