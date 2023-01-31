var inputSearch = document.getElementById("input-search"),
  btnSearch = document.getElementById("btn-search"),
  iconView = document.getElementById("icon-view"),
  userList = document.getElementById("users-list");

const searchFocus = () => {
  if (inputSearch.classList.contains("active")) {
    btnSearch.classList.remove("active");
    inputSearch.classList.remove("active");
    iconView.classList.remove("bx-x");
    iconView.classList.add("bx-search");
  } else {
    btnSearch.classList.add("active");
    inputSearch.classList.add("active");
    iconView.classList.remove("bx-search");
    iconView.classList.add("bx-x");
    inputSearch.focus();
  }
  inputSearch.value = "";
};

const search = () => {
  let searchTerm = inputSearch.value;

  if (searchTerm.length > 0) {
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "../php/search.php", true);
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          let res = ajax.response;
          if (res == "nenhum usuario encontrado") {
            userList.innerHTML = "<h3>Nenhum usuário foi encontrado</h3>";
          } else {
            userList.innerHTML = res;
          }
        }
      }
    };
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("searchTerm=" + searchTerm);
  }
};

const updateListUsers = () => {
  let ajax = new XMLHttpRequest();
  ajax.open("GET", "../php/usersconfig.php", true);
  ajax.onreadystatechange = () => {
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        let res = ajax.response;
        if (
          !inputSearch.classList.contains("active") ||
          inputSearch.value == ""
        ) {
          if (res == "nenhum usuario encontrado") {
            userList.innerHTML =
              "<h3>Nenhum usuário cadastrado, compartilhe com seus amigos!</h3>";
          } else {
            userList.innerHTML = res;
          }
        }
      }
    }
  };
  ajax.send();
};

btnSearch.addEventListener("click", searchFocus);
inputSearch.addEventListener("keyup", search);
setInterval(updateListUsers, 500);
