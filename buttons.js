function TreeMenu(){
  let span = document.createElement('span');

  for (let li of tree.querySelectorAll('li')){
      li.prepend(span);
      span.append(span.nextSibling); // move the text node into span
  }

    // catch clicks on whole tree
  tree.onclick = function(event) {
    if (event.target.tagName != 'SPAN') {
      return;
    }

    let childrenContainer = event.target.parentNode.querySelector('ul');
    if (!childrenContainer) return; // no children

    childrenContainer.hidden = !childrenContainer.hidden;
  }
}

function AddItem(){
  target = event.target;

  Ulparent = target.closest('ul');
  Liparent = target.closest('li');

  NewItem = document.createElement('li');

  input = createContent().input(NewItem);//Create input and append to NewItem
  span = createContent().span(this.nextSibling, NewItem);//Create span and append to nextSibling and preppend to NewItem

  Ulparent.insertBefore(NewItem, Liparent);
  
  input.focus();

  input.onblur = function(){
    inputOnBlur(NewItem, input, span);
  }
}

function AddSubLevel(){
  ParentContainer = event.target.closest('li');

  UlChild = createContent().ul(ParentContainer);//Create ul and append to ParentContainer
  NewItem = createContent().li(UlChild);//Create li and append to UlChild
  input = createContent().input(NewItem);//Create input and append to NewItem
  span = createContent().span(this.nextSibling, NewItem);//Create span and append to nextSibling and preppend to NewItem

  input.focus();

  input.onblur = function(){
    inputOnBlur(NewItem, input, span);
  }
}

function ChangeName(){
  event.target.contentEditable = true;

  event.target.onblur = function(){
    event.target.contentEditable = false;

    H1 = document.getElementById("title").textContent;
    document.title = H1;
  }
  //SendDataToServer();
}

function CheckTask(){
  checked = event.target;
  addbutton = checked.previousSibling;
  span = addbutton.previousSibling;
  //close = checked.nextSibling;
  //progress = close.nextSibling;
  //progress.innerHTML = '(100%)';

  if(checked.classList.contains('Done')){
    span.removeAttribute('style');
    checked.classList.remove('Done');
    progress.textContent = Progress();
    return;
  }

  span.setAttribute('style', 'text-decoration: line-through');
  progress.textContent = Progress();

  checked.classList.add('Done');
}

function RemoveTask(){
  Li = event.target.closest('li');
  Li.remove();
}

function Progress(){
  LiGet = event.target.closest('li');
  InsideUl = LiGet.getElementsByTagName('ul');
  InsideUl.child
  //checkedKids = InsideUl.getElementsByClassName('Done');

  counter = InsideUl.length;
  console.log(counter); 

  if(counter == 0){
    //return '(0%)';
  }else{
    doneKids();
    //result = (100/counter);
    //return `(${result}%)`
  }
}

function doneKids(){
  if(LiGet.classList.contains('Done')){
    LiGet.removeAttribute('style');
    LiGet.classList.remove('Done');
    return;
  }

  for (var i = 0; i < counter; i++) {
    LiGet.setAttribute('style', 'text-decoration: line-through');
    LiGet.classList.add('Done');
  };
}

function create(){
  button = document.createElement('button');

  return {
    addBtn: (place) => {
      button.setAttribute('class', 'Btn ItemBtn');
      button.innerHTML = "+";
  
      button.onclick = function (){
      AddSubLevel();
      }
      place.append(button);
    },
  
    doneBtn: (place) => {
      button.setAttribute('class', 'Btn ItemBtn done');
      button.innerHTML = "&check;"; //Display check symbol
  
      button.onclick = function (){
        CheckTask();
      }
      place.append(button);
    },
  
    removeBtn: (place) => {
      button.setAttribute('class', 'Btn ItemBtn remove');
      button.innerHTML = "x";
      button.onclick = function (){
        RemoveTask();
      };
      place.append(button);
    }
  }
}

function inputOnBlur(place, input, span){
  //Change name
  place.setAttribute('id', input.value)
  span.innerHTML = input.value;

  input.remove();

  create().addBtn(place);
  create().doneBtn(place);
  create().removeBtn(place);

  //Percentage
  progress = document.createElement('label');
  progress.setAttribute('class', 'Btn progress');
  //progress.innerHTML = '(0%)'
  place.append(progress);  
}

function createContent(){
  return {
    input: (placeToAppend) => {
      input = document.createElement('input');
      input.setAttribute('ondblclick', 'ChangeName()');

      placeToAppend.append(input);
      return input;
    },
    ul: (placeToAppend) => {
      ul = document.createElement('ul');
      ul.setAttribute('ondblclick', 'ChangeName()');

      placeToAppend.append(ul);
      return ul;
    },
    li: (placeToAppend) => {
      li = document.createElement('li');
      li.setAttribute('ondblclick', 'ChangeName()');

      placeToAppend.append(li);
      return li;
    },
    span: (placeToAppend, placeToPreppend) => {
      span = document.createElement('span');
      span.setAttribute('ondblclick', 'ChangeName()');
      
      if(placeToAppend != undefined){
        placeToAppend.append(span);

      }else if(placeToPreppend != undefined){
        placeToPreppend.prepend(span);
      }
      return span;
    },
  }
}