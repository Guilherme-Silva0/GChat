const formConfirm = document.querySelector("#formConfirm"),
  error = document.querySelector("#error");

const confirmDeleteUser = () => {
  if (inputPass.value !== "" && inputPass.value !== null) {
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "../php/deleteuser.php", true);
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
            error.innerHTML = "Senha incorreta!";
            setTimeout(() => {
              error.classList.add("oculto");
            }, 5000);
          } else if (res === "success") {
            location.href = "../index.php";
          }
        }
      }
    };
    let formData = new FormData(formConfirm);
    ajax.send(formData);
  } else {
    error.innerHTML = "É necessário que preencha o campo!";
    error.classList.remove("oculto");
    setTimeout(() => {
      error.classList.add("oculto");
    }, 5000);
  }
};

formConfirm.onsubmit = (event) => {
  event.preventDefault();
};

btnConfirm.addEventListener("click", confirmDeleteUser);
