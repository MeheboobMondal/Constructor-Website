export const getToken = () => {
    try{
        const userData = localStorage.getItem('userData')

        if(!userData){
            return null
        }

        const datajson = JSON.parse(userData)
        return datajson.token
        
    }catch(error){
        console.log(error)
    }
}


export const apiUrl = "http://127.0.0.1:8000/api"
export const fileUrl = "http://127.0.0.1:8000/"
