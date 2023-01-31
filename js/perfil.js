const inputFile = document.getElementById("newImg"),
result = document.getElementById("result"),
load = document.getElementById("load"),
labelText = document.getElementById("label-text");

const updateImg = () => {
  let ajax = new XMLHttpRequest();
  ajax.open("POST", "../php/updateimg.php", true);
  ajax.onreadystatechange = () => {
    if (ajax.readyState === 1) {
      labelText.classList.add("oculto");
      load.classList.remove("oculto");
    } else if (ajax.readyState === 4 && ajax.status === 200) {
      load.classList.add("oculto");
      labelText.classList.remove("oculto");
      let res = ajax.response;
      if (res == "tamanho maximo excedido") {
        result.classList.remove('oculto');
        result.innerHTML = "Tamanho máximo de 2MB excedido!";
      } else if (res == "formato nao aceito") {
        result.classList.remove('oculto');
        result.innerHTML = "Só aceitamos extensões do tipo PNG, JPG ou JPEG!";
      } else if (res == "sucess") {
        result.classList.remove('oculto');
        result.style.color = "var(--green)";
        result.textContent = "Sua foto de perfil foi atualizada, atualize a página!";
      }
    }
  };
  let formData = new FormData();
  formData.append("img", inputFile.files[0], inputFile.files[0].name);
  ajax.send(formData);
};

inputFile.addEventListener("change", updateImg);