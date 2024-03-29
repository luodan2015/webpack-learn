// 模块化开发  当前流行的单页面入口应用 spa
// 引入模块 形成依赖
import { add } from './other'; // es module

import '@/index.css';
import css from '@/index.less';

import img from './images/image.png';

import axios from 'axios';

import counter from './counter';
import number from './number';

// Promise 浏览器不认识 => 需要引进 polyfill 垫片 ES6+的ECMA规范库
// * @babel/polyfill
// 不会做语法转换，垫片生成的语法是直接挂载到window对象上的，对于正常业务开发不会造成全局污染的问题，
// babel 官方不推荐使用 @babel/polyfill 了，因为@babel/polyfill依赖的core-js是2.x版本，而最新的已经到3.x版本（包含的新特性更全一些）了，
// 官方更推荐直接安装使用最新的core-js 和 regenerator-runtime
// 对于做开源 UI库 组件库 工具库使用@babel/polyfill才会存在全局污染的问题
// 不建议在此处直接导入@babel/polyfill 可以使用 配置项useBuiltIns: 'entry'来代替
// import '@babel/polyfill';

import React, { Component } from 'react';
import ReactDom from 'react-dom';

import _ from 'lodash';

console.log(_.join(['a', 'b', 'c'], '***'));

console.log('hello webpack !');

console.log(add(2, 3));

const div = `<div class="${css.test}">css modules</div>`;
document.write(div);

const pic = new Image();
// 图片的路径
pic.src = img;
const wrapper = document.getElementById('wrapper');
wrapper.append(pic);

axios.get('/api/info').then((res) => {
  console.log('res', res);
});

const btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);
btn.onclick = function () {
  const div = document.createElement('div');
  div.innerHTML = 'item';
  div.className = css.item;
  document.body.appendChild(div);
};

counter();
number();

// 是否启用了HMR功能
if (module.hot) {
  // 需要监听的js文件
  module.hot.accept('./number.js', function () {
    document.body.removeChild(document.getElementById('number'));
    number();
  });
}
// ! 如果是要实现框架的HMR，使用对应的hot loader就可以了

// es6
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map((item) => {
  console.log(item);
});

// react
class App extends Component {
  render() {
    return <div>hello react!!!</div>;
  }
}
ReactDom.render(<App />, document.getElementById('root'));
