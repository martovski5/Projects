// Создаем новый элемент и добавляем его в конец списка.
function pushRules() {
  const textArea = document.querySelector("input").value;
  const list = document.getElementById("list-group");
  const entry = document.createElement("li");
  entry.appendChild(document.createTextNode(textArea));
  list.appendChild(entry);
  entry.className = "list-group-item";

  // Унового ли появляется кнопка "закрыть"
  const button = document.createElement("button");
  button.innerText = "";
  entry.appendChild(button);
  button.className = "btn-close";
  button.setAttribute("name", "del");
  button.setAttribute("onclick", "delItem()");
}

//При клике на задачи они зачеркиваются,
//при повторном клике - задачи становятся обычными.
let isMenuShow = false;
function newStyle(e) {
  if (isMenuShow == true) {
    e.target.style.textDecoration = "none";
    isMenuShow = false;
  } else {
    e.target.style.textDecoration = "line-through";
    isMenuShow = true;
  }
}
let ul = document.getElementById("list-group");
ul.addEventListener("click", newStyle);

//Удаляем элементы при нажатии на крестик.
function delItem() {
  const els = document.getElementsByName("del");
  els.forEach(function (item) {
    item.addEventListener("click", function () {
      item.parentNode.parentNode.removeChild(item.parentNode);
    });
  });
}
