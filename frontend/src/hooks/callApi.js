import api from "../api/axios";

export default function callApi() {
   

    const request = async ({
        method = "GET",
        url,
        data = {},
        params = {},
        headers = {},
    }) => {
        try {
            const response = await api({
                method,
                url,
                data,
                params,
                headers,
            });

            return response.data;
        } catch (err) {   
            throw err;
        } 
    };

    return {
        request,
    };
}