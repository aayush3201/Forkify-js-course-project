import axios from 'axios';
export default class Search{
    constructor(query){
        this.query=query;
    }
    
    async searchRecipes(){
        try{
            let res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.recipes = res.data.recipes;
        }catch(err){
            alert('Results not found, check spelling or try looking for something else...');
        }
    }


}