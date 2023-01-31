var formsignup = document.getElementById("formsignup"),
  btn = document.getElementById("sub"),
  inputName = document.getElementById("name"),
  inputEmail = document.getElementById("email"),
  inputPass = document.getElementById("pass"),
  inputRepPass = document.getElementById("reppass"),
  error = document.getElementById("error"),
  errorLogName = null,
  errorLogEmail = null,
  errorLogPass = null,
  errorLogReppass = null,
  errorLogImg = null;

const checkName = () => {
  if (inputName.value.length > 3) {
    errorLogName = null;
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "php/signup.php", true);
    ajax.onreadystatechange = () => {
      if (
        ajax.readyState === 0 ||
        ajax.readyState === 1 ||
        ajax.readyState === 2 ||
        ajax.readyState === 3
      ) {
        document.querySelector("#input-error-name").classList.add("oculto");
        document.querySelector("#name-load").classList.remove("oculto");
      } else if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          document.querySelector("#name-load").classList.add("oculto");
          let res = ajax.response;
          if (res == "nome ja cadastrado") {
            document.querySelector("#input-error-name").innerHTML =
              "Este nome ja está sendo usado, tente outro!";
            document
              .querySelector("#input-error-name")
              .classList.remove("oculto");
            errorLogName = 1;
          } else {
            errorLogName = null;
            document.querySelector("#input-error-name").classList.add("oculto");
          }
        }
      }
    };
    let formData = new FormData();
    formData.append("checkName", inputName.value.toLowerCase());
    ajax.send(formData);
  } else {
    document.querySelector("#input-error-name").innerHTML =
      "O nome precisa ter no mínimo 4 caractéries!";
    document.querySelector("#input-error-name").classList.remove("oculto");
    errorLogName = 2;
  }
};

const checkEmail = () => {
  let val = /\S+@\S+\.\S+/;
  let valres = val.test(inputEmail.value);
  if (valres == true) {
    document.querySelector("#input-error-email").classList.remove("oculto");
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "php/signup.php", true);
    ajax.onreadystatechange = () => {
      if (
        ajax.readyState === 0 ||
        ajax.readyState === 1 ||
        ajax.readyState === 2 ||
        ajax.readyState === 3
      ) {
        document.querySelector("#input-error-email").classList.add("oculto");
        document.querySelector("#email-load").classList.remove("oculto");
      } else if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          document.querySelector("#email-load").classList.add("oculto");
          res = ajax.response;
          if (res == "email invalido") {
            document.getElementById("input-error-email").innerHTML =
              "E-mail inválido!";
            document
              .querySelector("#input-error-email")
              .classList.remove("oculto");
            errorLogEmail = 3;
          } else if (res == "email ja cadastrado") {
            document.getElementById("input-error-email").innerHTML =
              "Este e-mail já está sendo usado, tente outro!";
            document
              .querySelector("#input-error-email")
              .classList.remove("oculto");
            errorLogEmail = 4;
          } else {
            document
              .querySelector("#input-error-email")
              .classList.add("oculto");
            errorLogEmail = null;
          }
        }
      }
    };
    let formData = new FormData();
    formData.append("checkEmail", inputEmail.value.toLowerCase());
    ajax.send(formData);
  } else {
    document.getElementById("input-error-email").innerHTML = "E-mail inválido!";
    document.querySelector("#input-error-email").classList.remove("oculto");
    errorLogEmail = 5;
  }
};

const checkPass = () => {
  if (inputPass.value.length < 6) {
    document.querySelector("#input-error-pass").innerHTML =
      "A senha deve haver no mínimo 6 caracteries!";
    document.querySelector("#input-error-pass").classList.remove("oculto");
    errorLogPass = 5;
  } else {
    document.querySelector("#input-error-pass").classList.add("oculto");
    errorLogPass = null;
  }
};

const checkRepPass = () => {
  if (inputRepPass.value !== inputPass.value) {
    document.querySelector("#input-error-reppass").innerHTML =
      "As senhas não coincidem!";
    document.querySelector("#input-error-reppass").classList.remove("oculto");
    errorLogReppass = 6;
  } else {
    document.querySelector("#input-error-reppass").classList.add("oculto");
    errorLogReppass = null;
  }
};

const submitForm = () => {
  if (
    inputName.value !== "" &&
    inputEmail.value !== "" &&
    inputPass.value !== "" &&
    inputRepPass.value !== ""
  ) {
    error.classList.add("oculto");
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "php/signup.php", true);
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
          if (res === "success") {
            errorLogName = null;
            location.href = "./main/users.php";
          }
        }
      }
    };

    if (
      errorLogName === null &&
      errorLogEmail === null &&
      errorLogPass === null &&
      errorLogReppass === null
    ) {
      let formData = new FormData();
      formData.append("name", inputName.value.toLowerCase());
      formData.append("email", inputEmail.value.toLowerCase());
      formData.append("pass", inputPass.value);
      formData.append("reppass", inputRepPass.value);
      ajax.send(formData);
    }
    if (errorLogName !== null) {
      document
        .querySelector("#input-error-name")
        .classList.remove("error-input-persistent");
      document
        .querySelector("#input-error-name")
        .classList.add("error-input-persistent");
    }
    if (errorLogEmail !== null) {
      document
        .querySelector("#input-error-email")
        .classList.remove("error-input-persistent");
      document
        .querySelector("#input-error-email")
        .classList.add("error-input-persistent");
    }
    if (errorLogPass !== null) {
      document
        .querySelector("#input-error-pass")
        .classList.remove("error-input-persistent");
      document
        .querySelector("#input-error-pass")
        .classList.add("error-input-persistent");
    }
    if (errorLogReppass !== null) {
      document
        .querySelector("#input-error-reppass")
        .classList.remove("error-input-persistent");
      document
        .querySelector("#input-error-reppass")
        .classList.add("error-input-persistent");
    }
  } else {
    error.classList.remove("oculto");
    error.innerHTML = "Todos os campos devem ser preenchidos!";
    setTimeout(() => {
      error.classList.add("oculto");
    }, 5000);
  }
};

formsignup.onsubmit = (event) => {
  event.preventDefault();
};

inputName.addEventListener("keyup", checkName);
inputEmail.addEventListener("keyup", checkEmail);
inputPass.addEventListener("keyup", checkPass);
inputRepPass.addEventListener("keyup", checkRepPass);
btn.addEventListener("click", submitForm);
