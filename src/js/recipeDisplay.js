import {Fraction} from 'fractional';
export const displayRec = (cur,liked)=>{
    document.querySelector('.recipe').innerHTML='';
    let markup = 
    ` <figure class="recipe__fig">
    <img src="${cur.image_url}" alt="${cur.title}" class="recipe__img">
    <h1 class="recipe__title">
        <span>${cur.title}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${cur.ingredients.length*5}</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">4</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny change_amount" data-type="less">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny change_amount" data-type="more">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>

    </div>
    <button class="recipe__love">
        <svg class="header__likes">
            <use class="heart__shape" href="${liked?'img/icons.svg#icon-heart':'img/icons.svg#icon-heart-outlined'}"></use>
        </svg>
    </button>
</div>



<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
    </ul>

    <button class="btn-small recipe__btn-shop">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
</div>

<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${cur.publisher}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${cur.source_url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>

    </a>
</div>`;
document.querySelector('.recipe').insertAdjacentHTML('afterbegin',markup);

}

export const ingDisplay = (ing)=>{
    document.querySelector('.recipe__ingredient-list').innerHTML='';
    ing.forEach(cur=>{
        let markup = `<li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${cur.count?fractioned(parseFloat(cur.count).toFixed(2)):''}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${cur.unit?cur.unit:''}</span>
            ${cur.description}
        </div>
    </li>`;
    document.querySelector('.recipe__ingredient-list').insertAdjacentHTML('beforeend',markup);
    });
}

const fractioned=(number)=>{
    let [num,den] = number.split('.')
    num = parseInt(num);
    den = parseInt(den)/100;
    let retstr = '';
    if(num !== 0){
        if(den === 0)
        retstr += num;
        else retstr += num+' ';
    }
    if(den !==0){
        let obj = new Fraction(den);
        retstr+= `${obj.numerator}/${obj.denominator}`;
    }
    
    return retstr;
}

export const updateIng = type=>{
    let el = document.querySelector('.recipe__info-data--people');
    if(type==='more'){
        el.textContent=parseInt(el.textContent)+1;
        return {
            old : parseInt(el.textContent)-1,
            new : parseInt(el.textContent)
        }
    }
    else if(type === 'less'){
        el.textContent=parseInt(el.textContent)-1;
        return {
            old : parseInt(el.textContent)+1,
            new : parseInt(el.textContent)
        }
    }
}