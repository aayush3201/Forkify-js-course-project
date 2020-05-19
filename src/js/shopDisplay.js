export const addList = (list)=>{
    document.querySelector('.shopping__list').innerHTML='';
    list.forEach(c=>{
        let markup = `<li class="shopping__item" id="${c.uid}" data-uid="${c.uid}">
        <div class="shopping__count">
            <input type="number" value="${parseFloat(c.count)}" step="${parseFloat(c.count)}">
            <p>${c.unit?c.unit:''}</p>
        </div>
        <p class="shopping__description">${c.description}</p>
        <button class="shopping__delete btn-tiny" data-id="${c.uid}">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>`;
    document.querySelector('.shopping__list').insertAdjacentHTML('beforeend',markup);
    });

}
export const removeFromList=(element)=>{
    let uid= element.dataset.id;
    element.parentNode.parentNode.removeChild(document.getElementById(uid));
}