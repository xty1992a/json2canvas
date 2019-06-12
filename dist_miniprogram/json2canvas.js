!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("cax")):"function"==typeof define&&define.amd?define(["cax"],t):"object"==typeof exports?exports.json2canvas=t(require("cax")):e.json2canvas=t(e.cax)}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(t,n){t.exports=e},function(e,t,n){"use strict";n.r(t),n.d(t,"draw",function(){return u});var r=n(0),o=n.n(r);const i="undefined"!=typeof wx&&!wx.createCanvas,a={rect:"rect",circle:"circle",image:"image",text:"text",group:"group"};let l=null,c=new Map;function u(e,t,n=null,r){e.scale||(e.scale=1);const u=[e.width*e.scale,e.height*e.scale,t];(l=i?new o.a.Stage(...u,n):new o.a.Stage(...u)).scale=e.scale;let h=function e(t){let n=[];let r=[];t.children.forEach(t=>{t.type===a.image?-1===r.indexOf(t.url)&&(r.push(t.url),n.push(function(e){return new Promise((t,n)=>{if(i)wx.getImageInfo({src:e,success(n){new o.a.Bitmap(n.path.startsWith("http")?n.path:e,function(){t({url:e,bitmap:this})})},fail(n){console.error(n),t({url:e,bitmap:null})}});else{const n=new Image;n.onload=function(){new o.a.Bitmap(e,function(){t({url:e,bitmap:this})})},n.onerror=function(n){console.error(n),t({url:e,bitmap:null})},n.src=e}})}(t.url))):t.type===a.group&&n.push(...e(t))});return n}(e);Promise.all(h).then(t=>{t.forEach(({url:e,bitmap:t})=>{c.set(e,t)}),function e({option:t,parent:n}){const r=new o.a.Group;t.width&&(r.width=t.width);t.height&&(r.height=t.height);s(r,t,n);t.children.forEach(t=>{let n=null,i={option:t,parent:r};switch(t.type){case a.group:e(i);break;case a.rect:n=function({option:e,parent:t}){const n=new o.a.Graphics;if(n.beginPath().rect(0,0,e.width,e.height).closePath(),e.fillStyle)n.fillStyle(e.fillStyle),n.fill();else if(e.linearGradient&&e.colors){n.createLinearGradient(...e.linearGradient);for(let t=0;t<e.colors.length;t++)n.addColorStop(...e.colors[t]);n.fillGradient(),n.fill()}else e.strokeStyle&&(n.strokeStyle(e.strokeStyle),n.stroke());return s(n,e,t),n}(i);break;case a.circle:n=function({option:e,parent:t}){const n=new o.a.Circle(e.r,e);return s(n,e,t),n.draw(),n}(i);break;case a.image:n=function({option:e,parent:t}){let n=c.get(e.url);if(n.used&&(n=n.clone()),n){n.used=!0;let r=n.width;if(n.scale=e.width/r,s(n,e,t),e.isCircular){const e=new o.a.Graphics;e.arc(r/2,r/2,r/2,0,2*Math.PI),n.clip(e)}return n}return null}(i);break;case a.text:n=function({option:e,parent:t}){let n=f(e);if(e.maxWidth&&n.getWidth()>e.maxWidth){let r="",o=e.y,i=1;for(let a=0;a<e.text.length;a++)if(r+=[e.text[a]],n.text=r,n.getWidth()>e.maxWidth){if(i===e.maxLine&&a!==e.text.length){let n=f(e);n.text=r.substring(0,r.length-1)+"...",p({ele:n,option:e,value:"x",parent:t}),n.y=o,t.add(n),r="";break}let n=f(e);n.text=r,p({ele:n,option:e,value:"x",parent:t}),n.y=o,t.add(n),r="",o+=e.lineHeight||0,i++}n.text=r,p({ele:n,option:e,value:"x",parent:t}),n.y=o}else s(n,e,t);return n}(i)}n&&r.add(n)});l.add(r)}({option:e}),l.children.reverse(),l.update(),setTimeout(()=>{r&&r()},800)})}function s(e,t,n){p({ele:e,option:t,value:"x",parent:n}),p({ele:e,option:t,value:"y",parent:n})}function p({ele:e,option:t,value:n,parent:r}){switch(t[n]){case"center":switch(t.type){case a.image:e[n]=(r.width-e.width*e.scale)/2;break;case a.text:e[n]=(r.width-e.getWidth())/2}break;case"bottom":switch(t.type){case a.image:e[n]=(r?r.height:t.height/t.scale)-e.height*e.scale;break;case a.rect:case a.group:e[n]=(r?r.height:t.height/t.scale)-t.height}break;default:switch(t.type){case a.circle:e[n]=t[n]+t.r;break;default:e[n]=t[n]||0}}}function f(e){const t=new o.a.Text(e.text,{font:e.font,color:e.color,baseline:"top"});return e.shadow&&(t.shadow=e.shadow),t}}])});