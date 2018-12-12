import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../app/component/index/Index.jsx';
import Header from '../app/component/common/Header';
import Footer from '../app/component/common/Footer';
import { BackTop } from 'antd';
import 'antd/lib/back-top/style/css'
ReactDOM.render([<Header key="Header"/>,<div key="Content" className="a-content"><Index /></div>,<Footer key="Footer"/>,<BackTop key="backTop" />],document.getElementById('app'));