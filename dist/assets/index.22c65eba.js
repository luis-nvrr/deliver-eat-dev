import{R as e,F as r,C as t,a as n,P as o,r as l,B as s,e as c,t as i,b as a,c as d}from"./vendor.d8fc5b22.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?r.credentials="include":"anonymous"===e.crossorigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();const u=()=>e.createElement(r,{flexDirection:"column",width:"100wh",height:"100vh",backgroundColor:"gray.100",justifyContent:"center",alignItems:"center"},e.createElement(t,null,e.createElement(n,{isIndeterminate:!0,color:"primary.500"}))),m=({children:e})=>l.exports.createElement(l.exports.Suspense,{fallback:l.exports.createElement(u,null)},l.exports.createElement(s,null,e));m.propTypes={children:o.node.isRequired};const p={},f=e.lazy((async()=>{var e,r;return await(e=()=>import("./ProtectedRoutes.ece47b3b.js"),r=["assets/ProtectedRoutes.ece47b3b.js","assets/ProtectedRoutes.4425861a.css","assets/vendor.d8fc5b22.js"],r&&0!==r.length?Promise.all(r.map((e=>{if((e=`/${e}`)in p)return;p[e]=!0;const r=e.endsWith(".css"),t=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${t}`))return;const n=document.createElement("link");return n.rel=r?"stylesheet":"modulepreload",r||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),r?new Promise(((e,r)=>{n.addEventListener("load",e),n.addEventListener("error",r)})):void 0}))).then((()=>e())):e())})),h=()=>e.createElement(f,null);var y=c({colors:{primary:i.colors.orange}});a.render(e.createElement(e.StrictMode,null,e.createElement(d,{theme:y},e.createElement(m,null,e.createElement(h,null)))),document.getElementById("root"));export{u as C};
