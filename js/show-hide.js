var inputPass = document.getElementById("pass"),
  viewBtn = document.querySelector(".input-group i"),
  containerConfirm = document.querySelector(".container-confirm"),
  btnSub = document.querySelector("#sub"),
  btnConfirm = document.querySelector("#btn-confirm");

const viewPass = () => {
  if (inputPass.type == "password") {
    inputPass.type = "text";
    viewBtn.classList.remove("bx-show");
    viewBtn.classList.add("bx-hide");
  } else {
    inputPass.type = "password";
    viewBtn.classList.remove("bx-hide");
    viewBtn.classList.add("bx-show");
  }
};

const toggleContainer = () => {
  if (containerConfirm.classList.contains("oculto")) {
    containerConfirm.classList.remove("oculto");
  } else {
    containerConfirm.classList.add("oculto");
  }
};

viewBtn.addEventListener("click", viewPass);
btnSub.addEventListener("click", toggleContainer);
btnConfirm.addEventListener("click", toggleContainer);
