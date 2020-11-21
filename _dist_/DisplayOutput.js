import React from "../web_modules/react.js";
import "./DisplayOutput.css.proxy.js";
export default class DisplayOutput2 extends React.Component {
  constructor(props) {
    super(props);
  }
  convertData(byte) {
    const KB = 1024;
    const MB = KB * KB;
    if (byte > MB) {
      return `${Math.round(byte / MB)} MB`;
    } else if (byte > KB) {
      return `${Math.round(byte / KB)} KB`;
    } else {
      return `${Math.round(byte)} B`;
    }
  }
  render() {
    const {output, type} = this.props;
    return type !== "image/gif" ? /* @__PURE__ */ React.createElement("figure", {
      className: "output"
    }, /* @__PURE__ */ React.createElement("img", {
      className: "output__file",
      src: output.url
    }), /* @__PURE__ */ React.createElement("figcaption", null, this.convertData(output.blob.size))) : /* @__PURE__ */ React.createElement("figure", {
      className: "output"
    }, /* @__PURE__ */ React.createElement("video", {
      className: "output__file",
      src: output.url,
      autoPlay: true,
      playsInline: true,
      muted: true,
      loop: true
    }), /* @__PURE__ */ React.createElement("figcaption", null, this.convertData(output.blob.size)));
  }
}
