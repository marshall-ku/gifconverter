// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".option:not(.loaded) {\r\n    opacity: 0;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.option__preview {\r\n    margin-bottom: 1rem;\r\n}\r\n\r\n.option.loaded > .option__preview > video {\r\n    display: block;\r\n    max-width: 80vw;\r\n    max-height: calc(100vh - 9.2rem - 150px);\r\n}\r\n\r\n.option__input {\r\n    max-width: 250px;\r\n    margin: 0 auto 0.8rem auto;\r\n}\r\n\r\n.option__input > div {\r\n    text-align: left;\r\n    font-size: 0.55rem;\r\n    padding: 0 5px;\r\n    margin-bottom: 0.15rem;\r\n    line-height: 0.7rem;\r\n}\r\n\r\n.option__input > input {\r\n    width: 100%;\r\n    background: 0;\r\n    border: 0;\r\n    outline: 0;\r\n    font-family: inherit;\r\n    font-size: 0.8rem;\r\n    line-height: 1.2rem;\r\n    padding: 2.5px 5px;\r\n    border-radius: 5px;\r\n    background: rgba(255, 255, 255, 0.15);\r\n    transition: background 0.25s;\r\n}\r\n\r\n.option__input > input:focus {\r\n    background: rgba(255, 255, 255, 0.4);\r\n}\r\n\r\n.option__convert {\r\n    display: block;\r\n    margin: 0 auto;\r\n    cursor: pointer;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}