import Search from './search';
import * as searchDisplay from './searchDisplay';
import Recipe from './recipe';
import * as recipeDisplay from './recipeDisplay';
import Shopping from './shopping';
import * as shopDisplay from './shopDisplay';
import Likes from './likes.js';
import * as likeDisplay from './likeDisplay';

const state = {};
const searchController = async function (query) {
    state.results = new Search(query);
    clearResults();
    searchDisplay.displayLoader();
    await state.results.searchRecipes();
    searchDisplay.hideLoader();
    if(state.results.recipes){
        displayPages(1);
        state.page = 1;
    }

}
state.shopping =[];
state.likes=JSON.parse(window.localStorage.getItem('like'));
if(state.likes){
    state.likes.forEach(obj=>{
        likeDisplay.addtoUI(obj);
    });
}else state.likes=[];


document.querySelector('.search').addEventListener('submit',e=>{
    e.preventDefault();
    searchController(document.querySelector('.search__field').value);
    document.querySelector('.search__field').value='';
});
document.querySelector('.results__pages').addEventListener('click',event=>{
let el= (event.target.closest('.btn-inline'));
if(el){
    if(el.dataset.action==='next'){
        state.page++;
        displayPages(state.page);
    }


    if(el.dataset.action==='prev'){
    state.page--;
    displayPages(state.page);
}

}
}
);

const clearResults = ()=>{
    document.querySelector('.results__list').innerHTML = '';
}

const displayPages = (page)=>{
    clearResults();
    let disp;
    if(page===Math.ceil(state.results.recipes.length/10)){
        disp = state.results.recipes.slice(10*(page-1));
    }
    else disp = state.results.recipes.slice(10*(page-1),10*page);
    searchDisplay.displayResults(disp);
    console.log(Math.ceil(state.results.recipes.length/10));
    searchDisplay.addPages(page,Math.ceil(state.results.recipes.length/10));
}

document.querySelector('.results__list').addEventListener('click',async event=>{
    let el = event.target.closest('.results__link');
    if(el){
        let a = Array.from(document.querySelectorAll('.results__link'));
        a.forEach(e=>{
            e.classList.remove('results__link--active');
        });
        el.classList.add('results__link--active');
        state.curRecipe = new Recipe(el.dataset.id);
        await state.curRecipe.getRecipe();
        recipeDisplay.displayRec(state.curRecipe.recipeData,isLiked(state.curRecipe));
        state.curRecipe.ing = [];
        state.curRecipe.recipeData.ingredients.forEach(c=>{
            state.curRecipe.ing.push(state.curRecipe.formatIngs(c));
        });
        recipeDisplay.ingDisplay(state.curRecipe.ing);
    }

});
document.querySelector('.recipe').addEventListener('click',(e)=>{
    let el = e.target.closest('.change_amount');
    let el2 = e.target.closest('.recipe__btn-shop');
    let el3 = e.target.closest('.recipe__love');
    if(el){
        updateIngredients(el.dataset.type);
    }else if(el2){
        state.curRecipe.ing.forEach(c=>{
            state.shopping.push(new Shopping(c.count,c.unit,c.description));
        });
        shopDisplay.addList(state.shopping);
    }else if(el3){
        let arr = state.curRecipe;
        if(isLiked(arr)){
            let ind;
            for(let i=0;i<state.likes.length;i++){
                if(state.likes[i].id==arr.id){
                    ind = i;
                    break;
                }
            }
            state.likes.splice(ind,1);
            likeDisplay.removeFromUI(arr.id);
            state.curRecipe.recipeData.liked=false;
            voidHeart();
            window.localStorage.clear();
            window.localStorage.setItem('like',JSON.stringify(state.likes));
        }else{
            let obj = new Likes(arr.recipeData.title,arr.recipeData.publisher,arr.recipeData.image_url,arr.id);
            state.likes.push(obj);
            likeDisplay.addtoUI(obj);
            state.curRecipe.recipeData.liked=true;
            fillHeart();
            window.localStorage.clear();
            window.localStorage.setItem('like',JSON.stringify(state.likes));
        }

    }
});

const updateIngredients = (type)=>{
    if(document.querySelector('.recipe__info-data--people').textContent != 1 || type !== 'less'){
    const obj = recipeDisplay.updateIng(type);
    state.curRecipe.ing.forEach(c=>{
        if(c.count){
            c.count*=obj.new/obj.old;
            c.count = c.count.toString();
        }

    });
    recipeDisplay.ingDisplay(state.curRecipe.ing);
    }

}
document.querySelector('.shopping__list').addEventListener('click',e=>{
    let el = e.target.closest('.shopping__delete');
    if(el){
        let index;
        for(let i =0;i<state.shopping.length;i++){
            if(state.shopping[i].uid==el.dataset.id){
                index = i;
                break;
            }
        }
        state.shopping.splice(index,1);
        
        shopDisplay.removeFromList(el);
        
    }
});
document.querySelector('.shopping__list').addEventListener('input',e=>{
    let val = e.target.value;
    
    let id = e.target.parentNode.parentNode.dataset.uid;
    let ind;
    state.shopping.forEach((c,i)=>{
        if(c.uid===id)
        ind = i
    });
    state.shopping[ind].count=val;
    
});

document.querySelector('.likes__list').addEventListener('click', async e=>{
    let el = e.target.closest('.likes__link');
    let x = Array.from(document.querySelectorAll('.results__link'));
    if(el){
        if(x){
            x.forEach(a=>{
                a.classList.remove('results__link--active');
            });
        }
        state.curRecipe = new Recipe(el.dataset.id);
        await state.curRecipe.getRecipe();
        recipeDisplay.displayRec(state.curRecipe.recipeData,isLiked(state.curRecipe));
        state.curRecipe.ing = [];
        state.curRecipe.recipeData.ingredients.forEach(c=>{
            state.curRecipe.ing.push(state.curRecipe.formatIngs(c));
        });
        recipeDisplay.ingDisplay(state.curRecipe.ing);
    }
});

const isLiked=(cur)=>{
    let check = 1;
    for(let i =0;i<state.likes.length;i++){
        if(state.likes[i].id==cur.id){
            check=0;
            break;
        }
    }
    if(check===1)
    return false;
    else return true;
}
const fillHeart = ()=>{
    document.querySelector('.heart__shape').setAttribute('href','img/icons.svg#icon-heart');
}
const voidHeart=()=>{
    document.querySelector('.heart__shape').setAttribute('href','img/icons.svg#icon-heart-outlined');
}