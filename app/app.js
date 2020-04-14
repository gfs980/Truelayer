const Axios = require("./axios");

module.exports = {
    app: async(quantity) => {

        const topStories = await Axios.getTopStories()  // Will get list of top stories

        const fullStories = await customeLoop(topStories, quantity, getPostDetails); // Will return object keys of top stories
        
        console.log('Done');
        console.log('top posts', fullStories)
        return fullStories;
    }
}

/* 
    Function that will loop TopStories in order to get full details of each top story id
    I prefer to use map function but since i cannot stop loop on argument, I use for loop. 
*/
const customeLoop = async(topStories, quantity, callback) =>{
    const listPost = new Array

    for (let index = 0; listPost.length < quantity; index++) {
        const postDetails = await callback(topStories[index], index, topStories);

        validation(postDetails) && listPost.push({
                title : postDetails.title,
                uri: postDetails.url,
                author: postDetails.by,
                points: postDetails.score,
                comments: postDetails.descendants,
                rank: index + 1,
            });
        
    }
    return listPost
}

/* Function that will send get axios request to get full details of the post id */
const getPostDetails = async(id, index) => {
    console.log(`Getting Post Details of rank ${index + 1}`);
    return await Axios.getStoryDetails(id)
}


/* Valiation function that will check object keys for rules
    It will return either true or false
*/
const validation = (props) => {
    return rules.title(props.title) && rules.uri(props.url) && rules.integer(props.score) && rules.integer(props.descendants)
}




/* Rules function will check the rules for each Object key validations */
const rules = {
    title: (word) => word.length > 0 && word.length <= 256,
    uri: (url) => { 
        if(url){
            const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
            const reg = new RegExp(regex);
            return url.match(reg)
        }
        else{
            return false
        }
        
    },
    integer: (number) => Number.isInteger(number) && number >= 0,
}
