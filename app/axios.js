const Axios =  require("axios");

/* For Axios to return request already in JSON from request
    as Axios by default returns an oject of request status details and the data in res.data 
*/
Axios.interceptors.response.use(response => {
    return response.data
},((error) => console.log(error)))


module.exports = {
    getTopStories: async() => {
        return await Axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');  // Array of top stories request
    },

    getStoryDetails: async(id) => {
        return await Axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`); // Array of Object each top story request
    }
}

