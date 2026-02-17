import axios from "axios";

// sending avatar asset to the backend
export const sendAsset = async ( formData : FormData ) => {
    const res = await axios.post(
        "api/visuals",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        },
    )
    console.log(res);
    return res.data;
}