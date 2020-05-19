import axios from 'axios';
export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        //https://forkify-api.herokuapp.com/api/get
        let rec = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

        this.recipeData = rec.data.recipe;
        console.log(this.recipeData);
    }
    formatIngs(ing){
        let lett = ing.split('');
        let check = 0;
        if(parseFloat(lett[0]))
        check = 1;

        let long = ['teaspoons','teaspoon','tablespoons','tablespoon','slices','slice', 'kilograms','kilogram','grams','gram','cups','cup','pounds','pound'];
        let short = ['tsp','tsp','tbsp','tbsp','slc','slc','kg','kg','gm','gm','cup','cup','lb','lb'];
        let arr = ing.split(' ');
        if(check === 1){
            arr[0]=eval(arr[0].replace('-','+')).toFixed(2);
        }
        long.forEach((c,i)=>{
            for(let j =0;j<arr.length;j++){
                if(arr[j]===c)
                arr[j]=short[i];
            }
        });
        let s = arr.join(' ');
        let a = s.split('');
        let p = 1;
        let ns = ''
        for(let i = 0; i<a.length;i++){
            if(a[i]==='('){
                p=0;
                continue;
            }
            
            if(a[i-1]===')'){
                p=1;
                continue;
            }

            if(p===1){
                ns += a[i];
            }
        }
        let ingred = ns.split(' ');
        let count = parseFloat(ingred[0])?ingred[0]:null;
        let unit;
        let index;
        if(count)
        index = 1;
        else index = 0;
        for(let i = 0;i<ingred.length;i++){
            for(let j =0; j<short.length;j++){
                if(ingred[i]===short[j]){
                    unit = short[j];
                    index = i+1;
                }

            }
        }
        let description = (ingred.slice(index)).join(' ');

        return{
            count,unit,description
        };
}
}
