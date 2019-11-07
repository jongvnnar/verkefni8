const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    items.addEventListener('click',(e) => {
      deleteItem(e);
      finish(e);
      edit(e);
    });
    
    items.addEventListener('keyup', (e) => {
      commit(e);
    });
    
  }

  function formHandler(e) {
    e.preventDefault();
    let input = document.querySelector(".form__input");
    let value = input.value;
    input.value = "";
    if(value && value.trim()){
    add(value);
    console.log(value);
    console.log('halló heimur');
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if(e.target.classList.contains("item__checkbox")){
      e.target.parentNode.classList.toggle("item--done");
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    if(e.target.classList.contains("item__text")){
      const parent = e.target.parentNode;
      let txt = e.target.innerHTML;
      let inp = el("input", "item__edit");
      inp.type = "text";
      inp.value = txt;
      console.log(e);
      console.log(parent);
      // console.log(e.target);
      // console.log(inp);
      parent.replaceChild(inp, e.target);
      inp.focus();
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const active = document.activeElement;
    if(active.classList.contains("item__edit") && e.keyCode == ENTER_KEYCODE){
      let txt = active.value;
      let text = el("span", "item__text");
      text.innerHTML = txt;
      active.parentNode.replaceChild(text, active);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    let item = el("li","item", finish);
    let checkbox = el("input", "item__checkbox", finish);
    checkbox.type = "checkbox";
    let span = el("span","item__text", edit);
    span.innerHTML = value;
    let button = el("button", "item__button", deleteItem);
    button.innerHTML = "Eyða";
    
    items.appendChild(item);
    item.appendChild(checkbox);
    item.appendChild(span);
    item.appendChild(button);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    if(e.target.classList.contains("item__button")){
      e.target.parentNode.remove();
    } 
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const el = document.createElement(type);
    el.classList.add(className);
    
    if(clickHandler){
      el.addEventListener('click', clickHandler)
    };
    return el;
    
  }

  return {
    init: init
  }
})();
