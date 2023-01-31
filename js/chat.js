const form = document.getElementById("formMessage"),
  inputMessage = document.getElementById("inputMessage"),
  btnSend = document.getElementById("sendMessage"),
  chatBox = document.getElementById("chatBox"),
  btnMenu = document.getElementById("btnMenu"),
  menu = document.getElementById("menu"),
  btnFullScreen = document.getElementById("btnFullScreen");

const scrollBottom = () => {
  chatBox.scrollTop = chatBox.scrollHeight;
};

const submitMessage = () => {
  let ajax = new XMLHttpRequest();
  ajax.open("POST", "../php/sendmessage.php", true);
  ajax.onreadystatechange = () => {
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        res = ajax.response;
        if (res == "messagem enviada") {
          inputMessage.value = "";
          scrollBottom();
        }
      }
    }
  };
  let formData = new FormData(form);
  ajax.send(formData);
};

const getMessages = () => {
  let ajax = new XMLHttpRequest();
  ajax.open("POST", "../php/getmessages.php", true);
  ajax.onreadystatechange = () => {
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        let res = ajax.response;
        chatBox.innerHTML = res;
        if (!chatBox.classList.contains("active")) {
          scrollBottom();
        }
      }
    }
  };
  let formData = new FormData(form);
  ajax.send(formData);
};

const toggleMenu = () => {
  if (!menu.classList.contains("active")) {
    menu.classList.add("active");
  } else {
    menu.classList.remove("active");
  }
};

const fullScreen = () => {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (document.documentElement.requestFullscreen) {
      btnFullScreen.innerHTML = "Sair do modo tela cheia";
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      btnFullScreen.innerHTML = "Sair do modo tela cheia";
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      btnFullScreen.innerHTML = "Sair do modo tela cheia";
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      btnFullScreen.innerHTML = "Sair do modo tela cheia";
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.exitFullscreen) {
      btnFullScreen.innerHTML = "Tela cheia";
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      btnFullScreen.innerHTML = "Tela cheia";
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      btnFullScreen.innerHTML = "Tela cheia";
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      btnFullScreen.innerHTML = "Tela cheia";
      document.webkitExitFullscreen();
    }
  }
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
  }
};

form.onsubmit = (event) => {
  event.preventDefault();
};

chatBox.onmouseenter = () => {
  chatBox.classList.add("active");
};

chatBox.onmouseleave = () => {
  chatBox.classList.remove("active");
};

chatBox.addEventListener("touchmove", () => {
  chatBox.classList.add("active");
});

chatBox.addEventListener("click", () => {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
  }
});

btnMenu.addEventListener("click", toggleMenu);
btnFullScreen.addEventListener("click", fullScreen);
btnSend.addEventListener("click", submitMessage);
setInterval(getMessages, 500);
