!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");function a(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n.style.backgroundColor=a(),d=setInterval((function(){n.style.backgroundColor=a()}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(d)})),e.disabled=!0;var d=null}();
//# sourceMappingURL=01-color-switcher.49f1970c.js.map