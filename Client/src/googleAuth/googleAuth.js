const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        try{
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {headers: {'Authorization': `Bearer${tokenResponse.access_token}`}},
            ).then(req => req.data)
            handleUserInfo(userInfo)
            
        }catch(err) {
            console.log(err, "google error");
        }
    },

    onError: errorResponse => console.log(errorResponse)
})

export default googleLoginHandler;