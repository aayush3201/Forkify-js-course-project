import {formatTitle} from './searchDisplay';
export const addtoUI=(obj)=>{
    let markup = `                        <li>
    <a class="likes__link" href="#${obj.id}" id="${obj.id}" data-id="${obj.id}">
        <figure class="likes__fig">
            <img src="${obj.img}" alt="${obj.name}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${formatTitle(obj.name)}</h4>
            <p class="likes__author">${obj.publisher}</p>
        </div>
    </a>
</li>`;
document.querySelector('.likes__list').insertAdjacentHTML('beforeend',markup);
}

export const removeFromUI = (id)=>{
    let el = document.getElementById(id);
    el.parentNode.removeChild(el);
}