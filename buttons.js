function TreeMenu(){
  let span = document.createElement('span');

  for (let li of tree.querySelectorAll('li')){
      li.prepend(span);
      span.append(span.nextSibling); // move the text node into span
  }

    // catch clicks on whole tree
  tree.onclick = event => {
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

  NewItem = document.createElement('li');//Create new Item

  input = document.createElement('input');
  NewItem.append(input);
  span = document.createElement('span');
  span.setAttribute('ondblclick', 'ChangeName()');

  NewItem.prepend(span);
  span.append(span.nextSibling);

  Ulparent.insertBefore(NewItem, Liparent);
  
  input.focus();

  input.onblur = function(){
    //Change name
    NewItem.setAttribute('id', input.value)
    span.innerHTML = input.value;

    input.remove();

    //Add button
    addBtn = createBtn('add', NewItem);
  
    //Done Button
    doneBtn = createBtn('done', NewItem)
  
    //Remove Button
    removeBtn = createBtn('remove', NewItem)

    //Percentage
    progress = document.createElement('label');
    progress.setAttribute('class', 'Btn progress');

    progress.innerHTML = '(0%)'
    NewItem.append(progress);
  }
}

function AddSubLevel(){

  UlChild = document.createElement('ul');
  LiChild = document.createElement('li');
  LiName = document.createElement('input');
  LiName.setAttribute('type', 'text');

  ParentContainer = event.target.closest('li');

  ParentContainer.append(UlChild);
  UlChild.append(LiChild);
  //LiChild.append(span);
  create('span', LiChild);

  LiChild.append(LiName);

  LiName.focus();

  LiName.onblur = function(){
    LiChild.setAttribute('id', LiName.value)
    span.innerHTML = LiName.value;

    LiName.remove();//Remove the input

    //Add button
    createBtn('add', LiChild);

    //Done Button
    createBtn('done', LiChild)
  
    //Remove Button
    createBtn('remove', LiChild)

    //Percentage
    Percentage(LiChild);
  }
}

function ChangeName(){
  event.target.contentEditable = true;

  event.target.onblur = function(){
    event.target.contentEditable = false;

    H1 = document.getElementById("title").textContent;
    document.title = H1;
  }
}

function CheckTask(){
  checked = event.target;
  addbutton = checked.previousSibling;
  span = addbutton.previousSibling;
  progress = checked.nextSibling.nextSibling;
  progress.innerHTML = '(100%)';

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

function Percentage(place){
  progress = document.createElement('label');
  progress.setAttribute('class', 'Btn progress');

  progress.innerHTML = '(0%)'
  place.append(progress);
}

function Progress(){
  LiGet = event.target.closest('li');
  InsideUl = LiGet.getElementsByTagName('ul');
  InsideUl.child

  counter = InsideUl.length;

  if(counter == 0){
    return '(0%)';
  }else{
    kids = doneKids();
    result = (100/counter);
    return `(${result}%)`
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

function create(name, place){
  if(name == 'span'){
    span = document.createElement('span');
    span.setAttribute('ondblclick', 'ChangeName()');
  }

  return place.append(name);
}

function createBtn(name, place){
  button = document.createElement('button');

  if(name == 'add'){
    button.setAttribute('class', 'Btn ItemBtn');
    button.innerHTML = "+";

    button.onclick = function (){
      AddSubLevel();
    }
  }else if(name == 'done'){
    button.setAttribute('class', 'Btn ItemBtn done');
  
    button.onclick = function (){
      CheckTask();
    };
    button.innerHTML = "&check;"; //Display check symbol

  }else if(name == 'remove'){
    button.setAttribute('class', 'Btn ItemBtn remove');
  
    button.onclick = function (){
      RemoveTask();
    };
    button.innerHTML = "x";
  }
  return place.append(button); 
}