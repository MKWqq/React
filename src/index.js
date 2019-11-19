import "babel-polyfill";
import "es6-promise/auto";
import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { LocaleProvider, } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { AppContainer as HMRContainer, } from "react-hot-loader";
import { BrowserRouter, } from "react-router-dom";
import App from "./app/index";
import "./index.less";

moment.locale("zh-cn");

const render = (Component) => {
  ReactDOM.render(
    <HMRContainer>
      <BrowserRouter>
        <LocaleProvider locale={zhCN}>
          <Component />
        </LocaleProvider>
      </BrowserRouter>
    </HMRContainer>,
    document.getElementById("root"),
  );
};
render(App);
(function (doc, win) {
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      let scrollWidth = docEl.scrollWidth;
      if (!scrollWidth) return;
      docEl.style.fontSize = Math.floor(100 * (scrollWidth / 1920)) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

