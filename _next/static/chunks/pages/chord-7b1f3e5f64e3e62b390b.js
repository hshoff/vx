_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[60],{"/B0Q":function(n,e,r){"use strict";r.d(e,"b",(function(){return a})),r.d(e,"a",(function(){return i}));var t=r("W1cA");const a=Symbol("implicit");function i(){var n=new Map,e=[],r=[],o=a;function u(t){var i=t+"",u=n.get(i);if(!u){if(o!==a)return o;n.set(i,u=e.push(t))}return r[(u-1)%r.length]}return u.domain=function(r){if(!arguments.length)return e.slice();e=[],n=new Map;for(const t of r){const r=t+"";n.has(r)||n.set(r,e.push(t))}return u},u.range=function(n){return arguments.length?(r=Array.from(n),u):r.slice()},u.unknown=function(n){return arguments.length?(o=n,u):o},u.copy=function(){return i(e,r).unknown(o)},t.b.apply(u,arguments),u}},"1Wmu":function(n,e,r){"use strict";function t(n,e){n(e)}r.d(e,"a",(function(){return t}))},"9kyG":function(n,e,r){"use strict";r.d(e,"a",(function(){return s}));var t=r("ERkP"),a=r.n(t),i=r("O94r"),o=r.n(i),u=r("dGDr");function l(){return(l=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}return n}).apply(this,arguments)}function s(n){var e=n.className,r=n.data,t=n.innerRadius,i=n.outerRadius,s=n.cornerRadius,c=n.startAngle,f=n.endAngle,d=n.padAngle,p=n.padRadius,g=n.children,m=n.innerRef,h=function(n,e){if(null==n)return{};var r,t,a={},i=Object.keys(n);for(t=0;t<i.length;t++)r=i[t],e.indexOf(r)>=0||(a[r]=n[r]);return a}(n,["className","data","innerRadius","outerRadius","cornerRadius","startAngle","endAngle","padAngle","padRadius","children","innerRef"]),v=Object(u.a)({innerRadius:t,outerRadius:i,cornerRadius:s,startAngle:c,endAngle:f,padAngle:d,padRadius:p});return g?a.a.createElement(a.a.Fragment,null,g({path:v})):r||null!=c&&null!=f&&null!=t&&null!=i?a.a.createElement("path",l({ref:m,className:o()("visx-arc",e),d:v(r)||""},h)):(console.warn("[@visx/shape/Arc]: expected data because one of startAngle, endAngle, innerRadius, outerRadius is undefined. Bailing."),null)}},AqdV:function(n,e,r){"use strict";r.d(e,"a",(function(){return f})),r.d(e,"b",(function(){return x}));var t=r("ue4z"),a=Math.cos,i=Math.sin,o=Math.PI,u=o/2,l=2*o,s=Math.max;function c(n){return function(e,r){return n(e.source.value+e.target.value,r.source.value+r.target.value)}}var f=function(){var n=0,e=null,r=null,a=null;function i(i){var o,u,c,f,d,p,g=i.length,m=[],h=Object(t.e)(g),v=[],b=[],y=b.groups=new Array(g),x=new Array(g*g);for(o=0,d=-1;++d<g;){for(u=0,p=-1;++p<g;)u+=i[d][p];m.push(u),v.push(Object(t.e)(g)),o+=u}for(e&&h.sort((function(n,r){return e(m[n],m[r])})),r&&v.forEach((function(n,e){n.sort((function(n,t){return r(i[e][n],i[e][t])}))})),f=(o=s(0,l-n*g)/o)?n:l/g,u=0,d=-1;++d<g;){for(c=u,p=-1;++p<g;){var O=h[d],j=v[O][p],A=i[O][j],w=u,R=u+=A*o;x[j*g+O]={index:O,subindex:j,startAngle:w,endAngle:R,value:A}}y[O]={index:O,startAngle:c,endAngle:u,value:m[O]},u+=f}for(d=-1;++d<g;)for(p=d-1;++p<g;){var k=x[p*g+d],N=x[d*g+p];(k.value||N.value)&&b.push(k.value<N.value?{source:N,target:k}:{source:k,target:N})}return a?b.sort(a):b}return i.padAngle=function(e){return arguments.length?(n=s(0,e),i):n},i.sortGroups=function(n){return arguments.length?(e=n,i):e},i.sortSubgroups=function(n){return arguments.length?(r=n,i):r},i.sortChords=function(n){return arguments.length?(null==n?a=null:(a=c(n))._=n,i):a&&a._},i},d=Array.prototype.slice,p=function(n){return function(){return n}},g=r("1rRp");function m(n){return n.source}function h(n){return n.target}function v(n){return n.radius}function b(n){return n.startAngle}function y(n){return n.endAngle}var x=function(){var n=m,e=h,r=v,t=b,o=y,l=null;function s(){var s,c=d.call(arguments),f=n.apply(this,c),p=e.apply(this,c),m=+r.apply(this,(c[0]=f,c)),h=t.apply(this,c)-u,v=o.apply(this,c)-u,b=m*a(h),y=m*i(h),x=+r.apply(this,(c[0]=p,c)),O=t.apply(this,c)-u,j=o.apply(this,c)-u;if(l||(l=s=Object(g.a)()),l.moveTo(b,y),l.arc(0,0,m,h,v),h===O&&v===j||(l.quadraticCurveTo(0,0,x*a(O),x*i(O)),l.arc(0,0,x,O,j)),l.quadraticCurveTo(0,0,b,y),l.closePath(),s)return l=null,s+""||null}return s.radius=function(n){return arguments.length?(r="function"===typeof n?n:p(+n),s):r},s.startAngle=function(n){return arguments.length?(t="function"===typeof n?n:p(+n),s):t},s.endAngle=function(n){return arguments.length?(o="function"===typeof n?n:p(+n),s):o},s.source=function(e){return arguments.length?(n=e,s):n},s.target=function(n){return arguments.length?(e=n,s):e},s.context=function(n){return arguments.length?(l=null==n?null:n,s):l},s}},"Cf/J":function(n,e,r){"use strict";r.d(e,"a",(function(){return l}));var t=r("aWzz"),a=r.n(t),i=r("ERkP"),o=r.n(i);function u(){return(u=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}return n}).apply(this,arguments)}function l(n){var e=n.children,r=n.id,t=n.from,a=n.to,i=n.x1,l=n.y1,s=n.x2,c=n.y2,f=n.fromOffset,d=void 0===f?"0%":f,p=n.fromOpacity,g=void 0===p?1:p,m=n.toOffset,h=void 0===m?"100%":m,v=n.toOpacity,b=void 0===v?1:v,y=n.rotate,x=n.transform,O=n.vertical,j=void 0===O||O,A=function(n,e){if(null==n)return{};var r,t,a={},i=Object.keys(n);for(t=0;t<i.length;t++)r=i[t],e.indexOf(r)>=0||(a[r]=n[r]);return a}(n,["children","id","from","to","x1","y1","x2","y2","fromOffset","fromOpacity","toOffset","toOpacity","rotate","transform","vertical"]),w=i,R=s,k=l,N=c;return!j||w||R||k||N||(w="0",R="0",k="0",N="1"),o.a.createElement("defs",null,o.a.createElement("linearGradient",u({id:r,x1:w,y1:k,x2:R,y2:N,gradientTransform:y?"rotate("+y+")":x},A),!!e&&e,!e&&o.a.createElement("stop",{offset:d,stopColor:t,stopOpacity:g}),!e&&o.a.createElement("stop",{offset:h,stopColor:a,stopOpacity:b})))}l.propTypes={id:a.a.string.isRequired,from:a.a.string,to:a.a.string,x1:a.a.oneOfType([a.a.string,a.a.number]),x2:a.a.oneOfType([a.a.string,a.a.number]),y1:a.a.oneOfType([a.a.string,a.a.number]),y2:a.a.oneOfType([a.a.string,a.a.number]),fromOffset:a.a.oneOfType([a.a.string,a.a.number]),fromOpacity:a.a.oneOfType([a.a.string,a.a.number]),toOffset:a.a.oneOfType([a.a.string,a.a.number]),toOpacity:a.a.oneOfType([a.a.string,a.a.number]),rotate:a.a.oneOfType([a.a.string,a.a.number]),transform:a.a.string,children:a.a.node,vertical:a.a.bool}},"D+es":function(n,e,r){"use strict";r.d(e,"a",(function(){return o}));var t=r("/B0Q"),a=r("xx0A"),i=Object(a.b)("domain","range","reverse","unknown");function o(n){return i(Object(t.a)(),n)}},JmwF:function(n,e,r){"use strict";r.d(e,"a",(function(){return c}));var t=r("aWzz"),a=r.n(t),i=r("ERkP"),o=r.n(i),u=r("O94r"),l=r.n(u);function s(){return(s=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}return n}).apply(this,arguments)}function c(n){var e=n.top,r=void 0===e?0:e,t=n.left,a=void 0===t?0:t,i=n.transform,u=n.className,c=n.children,f=n.innerRef,d=function(n,e){if(null==n)return{};var r,t,a={},i=Object.keys(n);for(t=0;t<i.length;t++)r=i[t],e.indexOf(r)>=0||(a[r]=n[r]);return a}(n,["top","left","transform","className","children","innerRef"]);return o.a.createElement("g",s({ref:f,className:l()("visx-group",u),transform:i||"translate("+a+", "+r+")"},d),c)}c.propTypes={top:a.a.number,left:a.a.number,transform:a.a.string,className:a.a.string,children:a.a.node,innerRef:a.a.oneOfType([a.a.string,a.a.func,a.a.object])}},LlJZ:function(n,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/chord",function(){return r("dqlv")}])},P8FC:function(n,e,r){"use strict";r.d(e,"a",(function(){return w}));var t=r("yFcC"),a=r.n(t),i=r("ERkP"),o=r.n(i),u=r("9kyG"),l=r("JmwF"),s=r("aWzz"),c=r.n(s),f=r("AqdV");function d(n){var e=n.matrix,r=n.padAngle,t=n.sortGroups,a=n.sortSubgroups,i=n.sortChords,u=n.children,l=Object(f.a)();r&&l.padAngle(r),t&&l.sortGroups(t),a&&l.sortSubgroups(a),i&&l.sortChords(i);var s=l(e);return u?o.a.createElement(o.a.Fragment,null,u({chords:s})):o.a.createElement("g",null)}d.propTypes={matrix:c.a.arrayOf(c.a.arrayOf(c.a.number)).isRequired,padAngle:c.a.number,sortGroups:c.a.oneOfType([c.a.func,c.a.oneOf([null])]),sortSubgroups:c.a.oneOfType([c.a.func,c.a.oneOf([null])]),sortChords:c.a.oneOfType([c.a.func,c.a.oneOf([null])]),children:c.a.func.isRequired};var p=r("O94r"),g=r.n(p);function m(){return(m=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}return n}).apply(this,arguments)}function h(n,e){n(e)}function v(n){var e=n.chord,r=n.source,t=n.target,a=n.radius,i=n.startAngle,u=n.endAngle,l=n.children,s=n.className,c=function(n,e){if(null==n)return{};var r,t,a={},i=Object.keys(n);for(t=0;t<i.length;t++)r=i[t],e.indexOf(r)>=0||(a[r]=n[r]);return a}(n,["chord","source","target","radius","startAngle","endAngle","children","className"]),d=Object(f.b)();r&&d.source(r),t&&d.target(t),a&&h(d.radius,a),i&&h(d.startAngle,i),u&&h(d.endAngle,u);var p=d(e);return l?o.a.createElement(o.a.Fragment,null,l({path:p})):o.a.createElement("path",m({className:g()("visx-ribbon",s),d:p||""},c))}v.propTypes={source:c.a.func,target:c.a.func,radius:c.a.oneOfType([c.a.number,c.a.func]),startAngle:c.a.oneOfType([c.a.number,c.a.func]),endAngle:c.a.oneOfType([c.a.number,c.a.func]),children:c.a.func,className:c.a.string};var b=r("D+es"),y=r("Cf/J"),x=o.a.createElement,O=[[11975,5871,8916,2868],[1951,10048,2060,6171],[8010,16145,8090,8045],[1013,990,940,6907]];function j(n,e){return e<n?-1:e>n?1:e>=n?0:NaN}var A=Object(b.a)({domain:[0,1,2,3],range:["url(#gpinkorange)","url(#gpurplered)","url(#gpurplegreen)","url(#gbluelime)"]});function w(n){var e=n.width,r=n.height,t=n.centerSize,i=void 0===t?20:t,o=n.events,s=void 0!==o&&o;r-=77;var c=.5*Math.min(e,r)-(i+10),f=c-i;return e<10?null:x("div",{className:"jsx-2806452125 chords"},x("svg",{width:e,height:r,className:"jsx-2806452125"},x(y.a,{id:"gpinkorange",from:"#ff2fab",to:"#ffc62e",vertical:!1}),x(y.a,{id:"gpurplered",from:"#dc04ff",to:"#d04376",vertical:!1}),x(y.a,{id:"gpurplegreen",from:"#7324ff",to:"#52f091",vertical:!1}),x(y.a,{id:"gbluelime",from:"#04a6ff",to:"#00ddc6",vertical:!1}),x("rect",{width:e,height:r,fill:"#e4e3d8",rx:14,className:"jsx-2806452125"}),x(l.a,{top:r/2,left:e/2},x(d,{matrix:O,padAngle:.05,sortSubgroups:j},(function(n){var e=n.chords;return x("g",{className:"jsx-2806452125"},e.groups.map((function(n,e){return x(u.a,{key:"key-".concat(e),data:n,innerRadius:f,outerRadius:c,fill:A(e),onClick:function(){s&&alert("".concat(JSON.stringify(n)))}})})),e.map((function(n,e){return x(v,{key:"ribbon-".concat(e),chord:n,radius:f,fill:A(n.target.index),fillOpacity:.75,onClick:function(){s&&alert("".concat(JSON.stringify(n)))}})})))})))),x("div",{className:"jsx-2806452125 deets"},x("div",{className:"jsx-2806452125"},"Based on Mike Bostock's ",x("a",{href:"https://bl.ocks.org/mbostock/4062006",className:"jsx-2806452125"},"Chord Diagram"))),x(a.a,{id:"2806452125"},[".chords.jsx-2806452125{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}","svg.jsx-2806452125{margin:1rem 0;cursor:pointer;}",".deets.jsx-2806452125{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;font-size:12px;}",".deets.jsx-2806452125>div.jsx-2806452125{margin:0.25rem;}"]))}try{w.displayName="Example",w.__docgenInfo={description:"",displayName:"Example",props:{width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"number"}},centerSize:{defaultValue:{value:20},description:"",name:"centerSize",required:!1,type:{name:"number | undefined"}},events:{defaultValue:{value:!1},description:"",name:"events",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/sandboxes/visx-chord/Example.tsx#Example"]={docgenInfo:w.__docgenInfo,name:"Example",path:"src/sandboxes/visx-chord/Example.tsx#Example"})}catch(R){}},P8uG:function(n){n.exports=JSON.parse('{"name":"@visx/demo-chord","description":"Standalone visx chord demo.","main":"index.tsx","private":true,"dependencies":{"@babel/runtime":"^7.8.4","@types/react":"^16","@types/react-dom":"^16","@visx/chord":"latest","@visx/gradient":"latest","@visx/group":"latest","@visx/responsive":"latest","@visx/scale":"latest","@visx/shape":"latest","react":"^16","react-dom":"^16","react-scripts-ts":"3.1.0","typescript":"^3"},"keywords":["visualization","d3","react","visx"]}')},Vi0D:function(n,e,r){"use strict";r.d(e,"a",(function(){return l})),r.d(e,"b",(function(){return s})),r.d(e,"c",(function(){return c}));var t=r("+Y26"),a=r("M3gT"),i=r("Ddjo"),o=r("Xyxy"),u=r("Q4nK"),l={expand:t.a,diverging:a.a,none:i.a,silhouette:o.a,wiggle:u.a},s=Object.keys(l);function c(n){return n&&l[n]||l.none}},dGDr:function(n,e,r){"use strict";r.d(e,"a",(function(){return d})),r.d(e,"b",(function(){return p})),r.d(e,"c",(function(){return g})),r.d(e,"d",(function(){return m})),r.d(e,"e",(function(){return h})),r.d(e,"f",(function(){return v}));var t=r("mBAT"),a=r("KdQ8"),i=r("+pY8"),o=r("lg8u"),u=r("FVKn"),l=r("uvDt"),s=r("1Wmu"),c=r("oWfS"),f=r("Vi0D");function d(n){var e=void 0===n?{}:n,r=e.innerRadius,a=e.outerRadius,i=e.cornerRadius,o=e.startAngle,u=e.endAngle,l=e.padAngle,c=e.padRadius,f=Object(t.a)();return null!=r&&Object(s.a)(f.innerRadius,r),null!=a&&Object(s.a)(f.outerRadius,a),null!=i&&Object(s.a)(f.cornerRadius,i),null!=o&&Object(s.a)(f.startAngle,o),null!=u&&Object(s.a)(f.endAngle,u),null!=l&&Object(s.a)(f.padAngle,l),null!=c&&Object(s.a)(f.padRadius,c),f}function p(n){var e=void 0===n?{}:n,r=e.x,t=e.x0,i=e.x1,o=e.y,u=e.y0,l=e.y1,c=e.defined,f=e.curve,d=Object(a.a)();return r&&Object(s.a)(d.x,r),t&&Object(s.a)(d.x0,t),i&&Object(s.a)(d.x1,i),o&&Object(s.a)(d.y,o),u&&Object(s.a)(d.y0,u),l&&Object(s.a)(d.y1,l),c&&d.defined(c),f&&d.curve(f),d}function g(n){var e=void 0===n?{}:n,r=e.x,t=e.y,a=e.defined,o=e.curve,u=Object(i.a)();return r&&Object(s.a)(u.x,r),t&&Object(s.a)(u.y,t),a&&u.defined(a),o&&u.curve(o),u}function m(n){var e=void 0===n?{}:n,r=e.startAngle,t=e.endAngle,a=e.padAngle,i=e.value,u=e.sort,l=e.sortValues,c=Object(o.a)();return(null===u||null!=u)&&c.sort(u),(null===l||null!=l)&&c.sortValues(l),null!=i&&c.value(i),null!=a&&Object(s.a)(c.padAngle,a),null!=r&&Object(s.a)(c.startAngle,r),null!=t&&Object(s.a)(c.endAngle,t),c}function h(n){var e=void 0===n?{}:n,r=e.angle,t=e.radius,a=e.defined,i=e.curve,o=Object(u.a)();return r&&Object(s.a)(o.angle,r),t&&Object(s.a)(o.radius,t),a&&o.defined(a),i&&o.curve(i),o}function v(n){var e=n.keys,r=n.value,t=n.order,a=n.offset,i=Object(l.a)();return e&&i.keys(e),r&&Object(s.a)(i.value,r),t&&i.order(Object(c.c)(t)),a&&i.offset(Object(f.c)(a)),i}},dqlv:function(n,e,r){"use strict";r.r(e);var t=r("ERkP"),a=r.n(t),i=r("6wy5"),o=r("P8FC"),u=r("P8uG"),l=a.a.createElement;e.default=function(){return l(i.a,{component:o.a,title:"Chords",codeSandboxDirectoryName:"visx-chord",packageJson:u},"import React from 'react';\nimport { Arc } from '@visx/shape';\nimport { Group } from '@visx/group';\nimport { Chord, Ribbon } from '@visx/chord';\nimport { scaleOrdinal } from '@visx/scale';\nimport { LinearGradient } from '@visx/gradient';\n\nconst pink = '#ff2fab';\nconst orange = '#ffc62e';\nconst purple = '#dc04ff';\nconst purple2 = '#7324ff';\nconst red = '#d04376';\nconst green = '#52f091';\nconst blue = '#04a6ff';\nconst lime = '#00ddc6';\nconst bg = '#e4e3d8';\n\nconst dataMatrix = [\n  [11975, 5871, 8916, 2868],\n  [1951, 10048, 2060, 6171],\n  [8010, 16145, 8090, 8045],\n  [1013, 990, 940, 6907],\n];\n\nfunction descending(a: number, b: number): number {\n  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;\n}\n\nconst color = scaleOrdinal<number, string>({\n  domain: [0, 1, 2, 3],\n  range: ['url(#gpinkorange)', 'url(#gpurplered)', 'url(#gpurplegreen)', 'url(#gbluelime)'],\n});\n\nexport type ChordProps = {\n  width: number;\n  height: number;\n  centerSize?: number;\n  events?: boolean;\n};\n\nexport default function Example({ width, height, centerSize = 20, events = false }: ChordProps) {\n  height -= 77;\n  const outerRadius = Math.min(width, height) * 0.5 - (centerSize + 10);\n  const innerRadius = outerRadius - centerSize;\n\n  return width < 10 ? null : (\n    <div className=\"chords\">\n      <svg width={width} height={height}>\n        <LinearGradient id=\"gpinkorange\" from={pink} to={orange} vertical={false} />\n        <LinearGradient id=\"gpurplered\" from={purple} to={red} vertical={false} />\n        <LinearGradient id=\"gpurplegreen\" from={purple2} to={green} vertical={false} />\n        <LinearGradient id=\"gbluelime\" from={blue} to={lime} vertical={false} />\n        <rect width={width} height={height} fill={bg} rx={14} />\n        <Group top={height / 2} left={width / 2}>\n          <Chord matrix={dataMatrix} padAngle={0.05} sortSubgroups={descending}>\n            {({ chords }) => (\n              <g>\n                {chords.groups.map((group, i) => (\n                  <Arc\n                    key={`key-${i}`}\n                    data={group}\n                    innerRadius={innerRadius}\n                    outerRadius={outerRadius}\n                    fill={color(i)}\n                    onClick={() => {\n                      if (events) alert(`${JSON.stringify(group)}`);\n                    }}\n                  />\n                ))}\n                {chords.map((chord, i) => {\n                  return (\n                    <Ribbon\n                      key={`ribbon-${i}`}\n                      chord={chord}\n                      radius={innerRadius}\n                      fill={color(chord.target.index)}\n                      fillOpacity={0.75}\n                      onClick={() => {\n                        if (events) alert(`${JSON.stringify(chord)}`);\n                      }}\n                    />\n                  );\n                })}\n              </g>\n            )}\n          </Chord>\n        </Group>\n      </svg>\n      <div className=\"deets\">\n        <div>\n          Based on Mike Bostock's <a href=\"https://bl.ocks.org/mbostock/4062006\">Chord Diagram</a>\n        </div>\n      </div>\n      <style jsx>{`\n        .chords {\n          display: flex;\n          flex-direction: column;\n          user-select: none;\n        }\n        svg {\n          margin: 1rem 0;\n          cursor: pointer;\n        }\n        .deets {\n          display: flex;\n          flex-direction: row;\n          font-size: 12px;\n        }\n        .deets > div {\n          margin: 0.25rem;\n        }\n      `}</style>\n    </div>\n  );\n}\n")}},oWfS:function(n,e,r){"use strict";r.d(e,"a",(function(){return l})),r.d(e,"b",(function(){return s})),r.d(e,"c",(function(){return c}));var t=r("Zx3a"),a=r("c6zU"),i=r("yU24"),o=r("V+6I"),u=r("NKRu"),l={ascending:t.a,descending:a.a,insideout:i.a,none:o.a,reverse:u.a},s=Object.keys(l);function c(n){return n&&l[n]||l.none}},ue4z:function(n,e,r){"use strict";r.d(e,"a",(function(){return a})),r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return s})),r.d(e,"d",(function(){return c})),r.d(e,"e",(function(){return l})),r.d(e,"f",(function(){return f}));var t=function(n,e){return n<e?-1:n>e?1:n>=e?0:NaN},a=function(n){var e;return 1===n.length&&(e=n,n=function(n,r){return t(e(n),r)}),{left:function(e,r,t,a){for(null==t&&(t=0),null==a&&(a=e.length);t<a;){var i=t+a>>>1;n(e[i],r)<0?t=i+1:a=i}return t},right:function(e,r,t,a){for(null==t&&(t=0),null==a&&(a=e.length);t<a;){var i=t+a>>>1;n(e[i],r)>0?a=i:t=i+1}return t}}};var i=a(t);i.right,i.left;var o=function(n,e){var r,t,a,i=n.length,o=-1;if(null==e){for(;++o<i;)if(null!=(r=n[o])&&r>=r)for(t=a=r;++o<i;)null!=(r=n[o])&&(t>r&&(t=r),a<r&&(a=r))}else for(;++o<i;)if(null!=(r=e(n[o],o,n))&&r>=r)for(t=a=r;++o<i;)null!=(r=e(n[o],o,n))&&(t>r&&(t=r),a<r&&(a=r));return[t,a]},u=Array.prototype,l=(u.slice,u.map,function(n,e,r){n=+n,e=+e,r=(a=arguments.length)<2?(e=n,n=0,1):a<3?1:+r;for(var t=-1,a=0|Math.max(0,Math.ceil((e-n)/r)),i=new Array(a);++t<a;)i[t]=n+t*r;return i});Math.sqrt(50),Math.sqrt(10),Math.sqrt(2);var s=function(n,e){var r,t,a=n.length,i=-1;if(null==e){for(;++i<a;)if(null!=(r=n[i])&&r>=r)for(t=r;++i<a;)null!=(r=n[i])&&r>t&&(t=r)}else for(;++i<a;)if(null!=(r=e(n[i],i,n))&&r>=r)for(t=r;++i<a;)null!=(r=e(n[i],i,n))&&r>t&&(t=r);return t},c=function(n){for(var e,r,t,a=n.length,i=-1,o=0;++i<a;)o+=n[i].length;for(r=new Array(o);--a>=0;)for(e=(t=n[a]).length;--e>=0;)r[--o]=t[e];return r},f=function(n){if(!(a=n.length))return[];for(var e=-1,r=function(n,e){var r,t,a=n.length,i=-1;if(null==e){for(;++i<a;)if(null!=(r=n[i])&&r>=r)for(t=r;++i<a;)null!=(r=n[i])&&t>r&&(t=r)}else for(;++i<a;)if(null!=(r=e(n[i],i,n))&&r>=r)for(t=r;++i<a;)null!=(r=e(n[i],i,n))&&t>r&&(t=r);return t}(n,d),t=new Array(r);++e<r;)for(var a,i=-1,o=t[e]=new Array(a);++i<a;)o[i]=n[i][e];return t};function d(n){return n.length}}},[["LlJZ",0,2,1,3,4,6,7]]]);