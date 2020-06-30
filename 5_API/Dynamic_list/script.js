const ul = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

input.focus();

// click "Add item" button to put value in list
button.addEventListener("click", addToList);

// allows enterkey insted of click to put value in list
input.onkeyup = function (e) {
  if (e.keyCode === 13) {
    //checks whether the pressed key is "Enter"
    addToList();
  }
};

// appends <ul> with <li> from input and adds delete <button>
function addToList() {
  let listItem = input.value;
  input.value = "";
  let li = document.createElement("li");
  let span = document.createElement("span");
  let delBut = document.createElement("button");

  ul.appendChild(li);
  li.appendChild(span);
  li.appendChild(delBut);

  span.textContent = listItem;

  // makes delete button for that item's <li>
  delBut.textContent = "delete";
  delBut.addEventListener("click", delItem);
  function delItem() {
    li.parentNode.removeChild(li);
  }

  // focus on input for immediate text entry
  input.focus();
}


/*  mozilla's answer

var list = document.querySelector('ul');
      var input = document.querySelector('input');
      var button = document.querySelector('button');
      button.onclick = function() {
        var myItem = input.value;
        input.value = '';
        var listItem = document.createElement('li');
        var listText = document.createElement('span');
        var listBtn = document.createElement('button');
        listItem.appendChild(listText);
        listText.textContent = myItem;
        listItem.appendChild(listBtn);
        listBtn.textContent = 'Delete';
        list.appendChild(listItem);
        listBtn.onclick = function(e) {
          list.removeChild(listItem);
        }
        input.focus();
      }

********************/
