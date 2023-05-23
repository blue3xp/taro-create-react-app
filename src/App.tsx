import React, { useEffect } from "react";
import Test from "./test";
import logo from "./logo.svg";
import "./App.css";
import {
  defineCustomElements,
  applyPolyfills,
} from "@tarojs/components/loader";
import Taro from "@tarojs/taro";
function App() {
  useEffect(() => {
    debugger;
    applyPolyfills().then(function () {
      debugger;
      defineCustomElements(window);
    });

    Taro.initPxTransform({
      designWidth: 750,
      deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
      },
    });
  }, []);
  return (
    <div className="App">
      <p>this is react component</p>
      <Test></Test>
    </div>
  );
}

export default App;
