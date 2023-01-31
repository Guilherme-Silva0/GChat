var formlogin = document.getElementById("formLogin"),
  btn = document.getElementById("sub"),
  inputUser = document.getElementById("user"),
  error = document.getElementById("error"),
  inputPass = document.getElementById("pass");

const login = () => {
  if (inputUser.value !== "" && inputPass.value !== "") {
    error.classList.add("oculto");
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "php/login.php", true);
    ajax.onreadystatechange = () => {
      if (
        ajax.readyState === 0 ||
        ajax.readyState === 1 ||
        ajax.readyState === 2 ||
        ajax.readyState === 3
      ) {
        document.querySelector("#btnText").classList.add("oculto");
        document.querySelector("#load").classList.remove("oculto");
      } else if (ajax.readyState === 4) {
        document.querySelector("#load").classList.add("oculto");
        document.querySelector("#btnText").classList.remove("oculto");
        if (ajax.status === 200) {
          res = ajax.response;
          if (res === "incorrect") {
            error.classList.remove("oculto");
            error.innerHTML = "Usuario ou senha incorretos!!";
            setTimeout(() => {
              error.classList.add("oculto");
            }, 5000);
          } else if (res === "success") {
            location.href = "main/users.php";
          }
        }
      }
    };
    let val = /\S+@\S+\.\S+/;
    let valres = val.test(inputUser.value);
    let formData = new FormData();
    if (valres == false) {
      formData.append("user", inputUser.value.toLowerCase());
      formData.append("pass", inputPass.value);
    } else {
      formData.append("user", inputUser.value);
      formData.append("pass", inputPass.value);
    }
    ajax.send(formData);
  } else {
    error.classList.remove("oculto");
    error.innerHTML = "Todos os campos devem ser preenchidos!";
    setTimeout(() => {
      error.classList.add("oculto");
    }, 5000);
  }
};

formlogin.onsubmit = (event) => {
  event.preventDefault();
};
btn.addEventListener("click", login);
