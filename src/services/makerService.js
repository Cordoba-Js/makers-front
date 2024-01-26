import axios from "axios"

const URL = 'http://localhost:8080/makers';

export const findAll = async () => {

    try {
        const response = await axios.get(URL);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const save = async ({name, lastName, email}) => {
    try {
        const response = await axios.post(URL, {
            name,
            lastName,
            email,
        });
        return response;
    } catch (error) {
        console.log(error);
    }

    return null;
}

export const update = async ({id, name, lastName, email}) => {
    try {
        const response = await axios.put(`${URL}/${id}`, {
            name,
            lastName,
            email,
        });
        return response;
    } catch (error) {
        console.log(error);
    }

    return null;
}

export const remove = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
    } catch (error) {
        console.log(error);
    }
    return null;
}