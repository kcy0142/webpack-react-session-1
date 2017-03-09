import './css/style.css';
import webpack from './images/webpack.svg';
import syaku from './images/syaku.png';

const app = document.getElementById('app');

app.innerHTML = '<img src="' + webpack + '" />';
app.innerHTML += '<br/><img src="' + syaku + '" />';
