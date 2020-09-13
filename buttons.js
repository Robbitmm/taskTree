function TreeMenu(){
  //Catch clicks on whole tree
  tree.onclick = function(event) {
    let childrenContainer = event.target.parentNode.querySelector('ul');

    if (event.target.tagName != 'SPAN') {
      return;
    }

    if (!childrenContainer) return; // no children

    childrenContainer.hidden = !childrenContainer.hidden;
    
  }
}

function AddItem(){
  let target = event.target,
      Ulparent = target.closest('ul'),
      Liparent = target.closest('li');

  const NewItem = document.createElement('li'),
        contentCreator = createContent(),
        input = contentCreator.input(NewItem),//Create input and append to NewItem
        span = contentCreator.span(event.nextSibling, NewItem);//Create span and append to nextSibling and preppend to NewItem

  Ulparent.insertBefore(NewItem, Liparent);
  
  input.focus();

  input.onblur = function(){
    inputOnBlur(NewItem, input, span);
  }
}

function AddSubLevel(){
  let ParentContainer = event.target.closest('li');

  const contentCreator =  createContent();

  if(ParentContainer.childNodes[5] == undefined){//if the ul is not defined
    var UlChild = contentCreator.ul(ParentContainer);//Create ul and append to ParentContainer
  }else{//if the ul has already been defined
    var UlChild = ParentContainer.parentNode.querySelector('ul');//select the ul child
  }

  const NewItem = contentCreator.li(UlChild),//Create li and append to UlChild
        input = contentCreator.input(NewItem),//Create input and append to NewItem
        span = contentCreator.span(this.nextSibling, NewItem);//Create span and append to nextSibling and preppend to NewItem

  input.focus();

  input.onblur = function(){
    inputOnBlur(NewItem, input, span);
  }
}

function ChangeName(){
  event.target.contentEditable = true;

  event.target.onblur = function(){
    let H1 = document.getElementById("title").textContent;

    event.target.contentEditable = false;

    document.title = H1;
  }
}

function CheckTask(){
  let checked = event.target,
      span = checked.parentNode.querySelector('span');

  //var progress = checked.parentNode.querySelector('label');

  if(checked.classList.contains('Done')){
    span.removeAttribute('style');
    checked.classList.remove('Done');
    doneKids();
    return;
  }

  span.setAttribute('style', 'text-decoration: line-through');
  doneKids();

  checked.classList.add('Done');
  
}

function RemoveTask(){
  const Li = event.target.closest('li');
  Li.remove();
}

function doneKids(){
  const LiGet = event.target.closest('li'),
        InsideUl = LiGet.getElementsByTagName('ul');

  let counter = InsideUl.length;

  if(LiGet.classList.contains('Done')){
    LiGet.removeAttribute('style');
    LiGet.classList.remove('Done');
    return;
  }

  for (let i = 0; i < counter; i++) {
    LiGet.setAttribute('style', 'text-decoration: line-through');
    LiGet.classList.add('Done');
  };
}

function create(){
  const button = document.createElement('button');
  
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
  //Percentage
  const progress = document.createElement('label');

  //Change name
  place.setAttribute('id', input.value)
  span.innerHTML = input.value;

  input.remove();

  create().addBtn(place);
  create().doneBtn(place);
  create().removeBtn(place);

  //Percentage
  progress.setAttribute('class', 'Btn progress');
  //progress.innerHTML = '(0%)'
  place.append(progress);  
}

function createContent(){
  return {
    input: (placeToAppend) => {
      const input = document.createElement('input');
      input.setAttribute('ondblclick', 'ChangeName()');

      placeToAppend.append(input);
      return input;
    },
    ul: (placeToAppend) => {
      const ul = document.createElement('ul');
      ul.setAttribute('ondblclick', 'ChangeName()');

      placeToAppend.append(ul);
      return ul;
    },
    li: (placeToAppend) => {
      const li = document.createElement('li');
      li.setAttribute('ondblclick', 'ChangeName()');

      placeToAppend.append(li);
      return li;
    },
    span: (placeToAppend, placeToPreppend) => {
      const span = document.createElement('span');
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