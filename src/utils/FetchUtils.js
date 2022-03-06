

const get = async (endpoint, token) => {
    try{
        const response = await fetch(endpoint, {
            method: "GET",
            mode: 'no-cors',
            credentials: 'same-origin',
            headers: {
                'token': `${token}`
            },
        });
        return await response.json();
    }catch(err){
        return null;
    }
    
}

export {
    get
};
