(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[473],{3156:function(t,e,i){"use strict";i.d(e,{Z:function(){return P}});var a=i(3366),n=i(7462),r=i(7294),s=i(6010),o=i(8320),d=i(4867),u=i(4780),l=i(9628),p=i(182);let c=(0,p.ZP)();var x=i(6500),h=i(5893);let m=["className","component","disableGutters","fixed","maxWidth","classes"],g=(0,x.Z)(),f=c("div",{name:"MuiContainer",slot:"Root",overridesResolver:(t,e)=>{let{ownerState:i}=t;return[e.root,e[`maxWidth${(0,o.Z)(String(i.maxWidth))}`],i.fixed&&e.fixed,i.disableGutters&&e.disableGutters]}}),b=t=>(0,l.Z)({props:t,name:"MuiContainer",defaultTheme:g}),Z=(t,e)=>{let i=t=>(0,d.Z)(e,t),{classes:a,fixed:n,disableGutters:r,maxWidth:s}=t,l={root:["root",s&&`maxWidth${(0,o.Z)(String(s))}`,n&&"fixed",r&&"disableGutters"]};return(0,u.Z)(l,i,a)};var v=i(8216),k=i(948),W=i(1657);let _=function(t={}){let{createStyledComponent:e=f,useThemeProps:i=b,componentName:o="MuiContainer"}=t,d=e(({theme:t,ownerState:e})=>(0,n.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!e.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}}),({theme:t,ownerState:e})=>e.fixed&&Object.keys(t.breakpoints.values).reduce((e,i)=>{let a=t.breakpoints.values[i];return 0!==a&&(e[t.breakpoints.up(i)]={maxWidth:`${a}${t.breakpoints.unit}`}),e},{}),({theme:t,ownerState:e})=>(0,n.Z)({},"xs"===e.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},e.maxWidth&&"xs"!==e.maxWidth&&{[t.breakpoints.up(e.maxWidth)]:{maxWidth:`${t.breakpoints.values[e.maxWidth]}${t.breakpoints.unit}`}})),u=r.forwardRef(function(t,e){let r=i(t),{className:u,component:l="div",disableGutters:p=!1,fixed:c=!1,maxWidth:x="lg"}=r,g=(0,a.Z)(r,m),f=(0,n.Z)({},r,{component:l,disableGutters:p,fixed:c,maxWidth:x}),b=Z(f,o);return(0,h.jsx)(d,(0,n.Z)({as:l,ownerState:f,className:(0,s.Z)(b.root,u),ref:e},g))});return u}({createStyledComponent:(0,k.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(t,e)=>{let{ownerState:i}=t;return[e.root,e[`maxWidth${(0,v.Z)(String(i.maxWidth))}`],i.fixed&&e.fixed,i.disableGutters&&e.disableGutters]}}),useThemeProps:t=>(0,W.Z)({props:t,name:"MuiContainer"})});var P=_},2332:function(t,e,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ping",function(){return i(303)}])},303:function(t,e,i){"use strict";i.r(e);var a=i(5893),n=i(7294),r=i(6154),s=i(3156),o=i(7357),d=i(5861),u=i(1903),l=i(3321);let p=()=>{let[t,e]=(0,n.useState)(""),[i,p]=(0,n.useState)(null),[c,x]=(0,n.useState)(!1),h=async()=>{x(!0),p(null);try{let e=await r.Z.post("/api/ping",{ip:t}),i=e.data;p(i.message)}catch(t){p("Failed to ping the IP address")}finally{x(!1)}};return(0,a.jsx)(s.Z,{children:(0,a.jsxs)(o.Z,{my:4,children:[(0,a.jsx)(d.Z,{variant:"h4",gutterBottom:!0,children:"Ping an IP Address"}),(0,a.jsx)(u.Z,{label:"IP Address",value:t,onChange:t=>e(t.target.value),fullWidth:!0,margin:"normal"}),(0,a.jsx)(l.Z,{variant:"contained",color:"primary",onClick:h,disabled:c,children:c?"Pinging...":"Ping"}),i&&(0,a.jsxs)(d.Z,{variant:"h6",color:"textSecondary",gutterBottom:!0,children:["Result: ",i]})]})})};e.default=p}},function(t){t.O(0,[774,888,179],function(){return t(t.s=2332)}),_N_E=t.O()}]);