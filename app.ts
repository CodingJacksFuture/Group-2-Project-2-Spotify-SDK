import axios from 'axios'; // when using ESNext, use import instead of require

class APIController {
    private clientId = process.env.S_CLIENTID;
    private clientSecret = process.env.S_CLIENT_SECRET;

    _getToken = async () => {
        const result = await axios.post(
            'https://accounts.spotify.com/api/token',
            'grant_type=client_credentials',  // This is the request body
            {
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded', 
                    'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
                }
            }
        );
    
        return result.data.access_token;
    }

    _getGenres = async (token:any) => { //categories

        const result:any =await axios(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, { //make sure this is the correct link 
            method: 'GET', 
            headers: { 'Authorization' : 'Bearer ' + token}
        }); 
        return result.categories.items; 
    }

    _getPlaylistByGenre = async (token:any, genreId:any) => { //category's of playlists 

        const result:any = await axios (`https://api.spotify.com/v1/brows/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET', 
            headers: { 'Authorization' : 'Bearer ' + token}
        }); 

        return result.playlists.items; 
    }

    _getTracks = async (token:any, tracksEndPoint:any) =>{ //Get a playlist's items  

        const limit = 10; //CAN BE CHANGED 

        const result:any = await axios(`${tracksEndPoint}?limit =${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        }); 

        return result.items; 
    } 

    _getTrack = async (token:any, trackEndPoint:any) => { 

        const result = await axios(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token} 
        }); 

        return {
            getToken() {
                return _getToken(); 
            }, 
    
            getGenres(token) {
                return _getGenres(token); 
            }, 
    
            getPlaylistByGenre(token, genreId) {
                return _getPlaylistByGenre(token, genreId); 
            }, 
    
            getTracks(token, tracksEndPoint) {
                return _getTracks (token, tracksEndPoint); 
            }, 
    
            getTrack(token, trackEndPoint) {
                return _getTrack (token, trackEndPoint); 
            }, 
    } 

}

export default new APIController();



