import axios from "axios"; // when using ESNext, use import instead of require\
import dotenv from 'dotenv';

dotenv.config({path:'./spotify-web-player/.env'});

class APIController {
	private clientId = process.env.S_CLIENTID;
	private clientSecret = process.env.S_CLIENT_SECRET;

	public _getToken = async () => {
		const result = await axios.post(
			"https://accounts.spotify.com/api/token",
			"grant_type=client_credentials", // This is the request body
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " + btoa(this.clientId + ":" + this.clientSecret),
				},
			}
		);

		return result.data.access_token;
	};

	public _getGenres = async (token: any) => {
		//categories

		const result: any = await axios(
			`https://api.spotify.com/v1/browse/categories?locale=sv_US`,
			{
				//make sure this is the correct link
				method: "GET",
				headers: { Authorization: "Bearer " + token },
			}
		);
		return result.categories.items;
	};

	public _getPlaylistByGenre = async (token: any, genreId: any) => {
		//category's of playlists
        const limit = 5;
		const result: any = await axios(
			`https://api.spotify.com/v1/brows/categories/${genreId}/playlists?limit=${limit}`,
			{
				method: "GET",
				headers: { Authorization: "Bearer " + token },
			}
		);

		return result.playlists.items;
	};

	public _getTracks = async (token: any, tracksEndPoint: any) => {
		//Get a playlist's items

		const limit = 10; //CAN BE CHANGED

		const result: any = await axios(`${tracksEndPoint}?limit =${limit}`, {
			method: "GET",
			headers: { Authorization: "Bearer " + token },
		});

		return result.items;
	};

	public _getTrack = async (token: any, trackEndPoint: any) => {
		const result = await axios(`${trackEndPoint}`, {
			method: "GET",
			headers: { Authorization: "Bearer " + token },
		});
	};
}

export default new APIController();
