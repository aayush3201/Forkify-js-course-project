export const displayResults = (recipes)=>{
    recipes.forEach(cur=>{
        let markup = 
        `<li>
            <a class="results__link" href="#${cur.recipe_id}" data-id="${cur.recipe_id}">
                <figure class="results__fig">
                    <img src="${cur.image_url}" alt="${cur.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${formatTitle(cur.title)}</h4>
                    <p class="results__author">${cur.publisher}</p>
                </div>
            </a>
        </li>`;
    document.querySelector('.results__list').insertAdjacentHTML('beforeend',markup);
    })
}

export const formatTitle = (title)=>{
    let arr = title.split(' ');
    let retstr = '';
    
    for(let i = 0;i<arr.length;i++){
        if((retstr+' '+arr[i]).length<=25){
            retstr += ' '+arr[i];
             
        }

        else{
            retstr += '...'; 
            break;
        }
              
    } 
    return retstr;
}

export const displayLoader = ()=>{
    const loader =
    `<div class= "loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;


    document.querySelector('.results__list').insertAdjacentHTML('afterbegin',loader);

}
export const hideLoader = ()=>{
    document.querySelector('.results__list').innerHTML='';
}

const addPrev = (number)=>{
    const markup =`<button class="btn-inline results__btn--prev" data-action="prev">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-left"></use>
    </svg>
    <span> Page ${number}</span>
</button>`;
document.querySelector('.results__pages').insertAdjacentHTML('afterbegin',markup);
}
const addNext = (number)=>{
    const markup =`<button class="btn-inline results__btn--next" data-action = "next">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-right"></use>
    </svg>
    <span> Page ${number}</span>
</button>`;
document.querySelector('.results__pages').insertAdjacentHTML('afterbegin',markup);
}

export const addPages = (curPage, total)=>{
    document.querySelector('.results__pages').innerHTML='';
if(curPage===total){
    addPrev(curPage-1);
}else if(curPage<total && curPage>1){
    addPrev(curPage-1);
    addNext(curPage+1);
}else{
    addNext(curPage+1);
}
}
