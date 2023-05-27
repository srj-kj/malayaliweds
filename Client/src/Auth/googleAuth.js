const googleLoginApi = async (email)=>{
    try{
        const response = await axiosConfig.post('/googleLogin', email)
        return response.data
    }catch(err) {
        console.log(err);
    }
}

export default googleLoginApi;