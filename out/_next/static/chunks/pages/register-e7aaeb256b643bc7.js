(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[495],{9368:function(e,t,o){"use strict";o.d(t,{Z:function(){return B}});var n=o(3366),r=o(7462),a=o(7294),i=o(6010),l=o(4780),s=o(1796),p=o(3573),d=o(8169),c=o(5893),u=(0,d.Z)((0,c.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),m=(0,d.Z)((0,c.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),x=(0,d.Z)((0,c.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),h=o(8216),f=o(1657),g=o(948),b=o(1588),Z=o(4867);function y(e){return(0,Z.Z)("MuiCheckbox",e)}let v=(0,b.Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),j=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],M=e=>{let{classes:t,indeterminate:o,color:n}=e,a={root:["root",o&&"indeterminate",`color${(0,h.Z)(n)}`]},i=(0,l.Z)(a,y,t);return(0,r.Z)({},t,i)},C=(0,g.ZP)(p.Z,{shouldForwardProp:e=>(0,g.FO)(e)||"classes"===e,name:"MuiCheckbox",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:o}=e;return[t.root,o.indeterminate&&t.indeterminate,"default"!==o.color&&t[`color${(0,h.Z)(o.color)}`]]}})(({theme:e,ownerState:t})=>(0,r.Z)({color:(e.vars||e).palette.text.secondary},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${"default"===t.color?e.vars.palette.action.activeChannel:e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,s.Fq)("default"===t.color?e.palette.action.active:e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==t.color&&{[`&.${v.checked}, &.${v.indeterminate}`]:{color:(e.vars||e).palette[t.color].main},[`&.${v.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),k=(0,c.jsx)(m,{}),I=(0,c.jsx)(u,{}),w=(0,c.jsx)(x,{}),S=a.forwardRef(function(e,t){var o,l;let s=(0,f.Z)({props:e,name:"MuiCheckbox"}),{checkedIcon:p=k,color:d="primary",icon:u=I,indeterminate:m=!1,indeterminateIcon:x=w,inputProps:h,size:g="medium",className:b}=s,Z=(0,n.Z)(s,j),y=m?x:u,v=m?x:p,S=(0,r.Z)({},s,{color:d,indeterminate:m,size:g}),B=M(S);return(0,c.jsx)(C,(0,r.Z)({type:"checkbox",inputProps:(0,r.Z)({"data-indeterminate":m},h),icon:a.cloneElement(y,{fontSize:null!=(o=y.props.fontSize)?o:g}),checkedIcon:a.cloneElement(v,{fontSize:null!=(l=v.props.fontSize)?l:g}),ownerState:S,ref:t,className:(0,i.Z)(B.root,b)},Z,{classes:B}))});var B=S},6276:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/register",function(){return o(5803)}])},6456:function(e,t,o){"use strict";var n=o(5893),r=o(7294),a=o(948),i=o(1903);let l=(0,a.ZP)(i.Z)(e=>{let{theme:t}=e;return{alignItems:"flex-start","& .MuiInputLabel-root":{transform:"none",lineHeight:1.154,position:"relative",marginBottom:t.spacing(1),fontSize:t.typography.body2.fontSize,color:"".concat(t.palette.text.primary," !important")},"& .MuiInputBase-root":{borderRadius:8,backgroundColor:"transparent !important",border:"1px solid rgba(".concat(t.palette.customColors.main,", 0.2)"),transition:t.transitions.create(["border-color","box-shadow"],{duration:t.transitions.duration.shorter}),"&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover":{borderColor:"rgba(".concat(t.palette.customColors.main,", 0.28)")},"&:before, &:after":{display:"none"},"&.MuiInputBase-sizeSmall":{borderRadius:6},"&.Mui-error":{borderColor:t.palette.error.main},"&.Mui-focused":{boxShadow:t.shadows[2],"& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder":{transform:"translateX(4px)"},"&.MuiInputBase-colorPrimary":{borderColor:t.palette.primary.main},"&.MuiInputBase-colorSecondary":{borderColor:t.palette.secondary.main},"&.MuiInputBase-colorInfo":{borderColor:t.palette.info.main},"&.MuiInputBase-colorSuccess":{borderColor:t.palette.success.main},"&.MuiInputBase-colorWarning":{borderColor:t.palette.warning.main},"&.MuiInputBase-colorError":{borderColor:t.palette.error.main},"&.Mui-error":{borderColor:t.palette.error.main}},"&.Mui-disabled":{backgroundColor:"".concat(t.palette.action.selected," !important")},"& .MuiInputAdornment-root":{marginTop:"0 !important"}},"& .MuiInputBase-input":{color:t.palette.text.secondary,"&:not(textarea)":{padding:"15.5px 13px"},"&:not(textarea).MuiInputBase-inputSizeSmall":{padding:"7.5px 13px"},"&:not(.MuiInputBase-readOnly):not([readonly])::placeholder":{transition:t.transitions.create(["opacity","transform"],{duration:t.transitions.duration.shorter})},"&.MuiInputBase-inputAdornedStart:not(.MuiAutocomplete-input)":{paddingLeft:0},"&.MuiInputBase-inputAdornedEnd:not(.MuiAutocomplete-input)":{paddingRight:0}},"& .MuiFormHelperText-root":{lineHeight:1.154,margin:t.spacing(1,0,0),color:t.palette.text.secondary,fontSize:t.typography.body2.fontSize,"&.Mui-error":{color:t.palette.error.main}},"& .MuiSelect-select:focus, & .MuiNativeSelect-select:focus":{backgroundColor:"transparent"},"& .MuiSelect-filled .MuiChip-root":{height:22},"& .MuiAutocomplete-input":{paddingLeft:"6px !important",paddingTop:"7.5px !important",paddingBottom:"7.5px !important","&.MuiInputBase-inputSizeSmall":{paddingLeft:"6px !important",paddingTop:"2.5px !important",paddingBottom:"2.5px !important"}},"& .MuiAutocomplete-inputRoot":{paddingTop:"8px !important",paddingLeft:"8px !important",paddingBottom:"8px !important","&:not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart":{paddingLeft:"13px !important"},"&.MuiInputBase-sizeSmall":{paddingTop:"5px !important",paddingLeft:"5px !important",paddingBottom:"5px !important","& .MuiAutocomplete-tag":{margin:2,height:22}}},"& .MuiInputBase-multiline":{padding:"15.25px 13px","&.MuiInputBase-sizeSmall":{padding:"7.25px 13px"},"& textarea.MuiInputBase-inputSizeSmall:placeholder-shown":{overflowX:"hidden"}},"& + .react-datepicker__close-icon":{top:11,"&:after":{fontSize:"1.6rem !important"}}}}),s=(0,r.forwardRef)((e,t)=>{let{size:o="small",InputLabelProps:r,...a}=e;return(0,n.jsx)(l,{size:o,inputRef:t,...a,variant:"filled",InputLabelProps:{...r,shrink:!0}})});t.Z=s},5803:function(e,t,o){"use strict";o.r(t);var n=o(5893),r=o(7294),a=o(1664),i=o.n(a),l=o(3321),s=o(7720),p=o(9368),d=o(5861),c=o(3946),u=o(7357),m=o(8396),x=o(948),h=o(2734),f=o(7109),g=o(480),b=o(6456),Z=o(3730),y=o(7340),v=o(3918),j=o(2374);let M=(0,x.ZP)("img")(e=>{let{theme:t}=e;return{zIndex:2,maxHeight:600,marginTop:t.spacing(12),marginBottom:t.spacing(12),[t.breakpoints.down(1540)]:{maxHeight:550},[t.breakpoints.down("lg")]:{maxHeight:500}}}),C=(0,x.ZP)(u.Z)(e=>{let{theme:t}=e;return{width:"100%",[t.breakpoints.up("md")]:{maxWidth:450},[t.breakpoints.up("lg")]:{maxWidth:600},[t.breakpoints.up("xl")]:{maxWidth:750}}}),k=(0,x.ZP)(i())(e=>{let{theme:t}=e;return{textDecoration:"none",color:"".concat(t.palette.primary.main," !important")}}),I=(0,x.ZP)(g.Z)(e=>{let{theme:t}=e;return{marginTop:t.spacing(1.5),marginBottom:t.spacing(1.75),"& .MuiFormControlLabel-label":{color:t.palette.text.secondary}}}),w=()=>{let[e,t]=(0,r.useState)(!1),o=(0,h.Z)(),{settings:a}=(0,v.r)(),x=(0,m.Z)(o.breakpoints.down("md")),{skin:g}=a;return(0,n.jsxs)(u.Z,{className:"content-right",sx:{backgroundColor:"background.paper"},children:[x?null:(0,n.jsxs)(u.Z,{sx:{flex:1,display:"flex",position:"relative",alignItems:"center",borderRadius:"20px",justifyContent:"center",backgroundColor:"customColors.bodyBg",margin:e=>e.spacing(8,0,8,8)},children:[(0,n.jsx)(M,{alt:"register-illustration",src:"/images/pages/".concat("bordered"===g?"auth-v2-register-illustration-bordered":"auth-v2-register-illustration","-").concat(o.palette.mode,".png")}),(0,n.jsx)(j.Z,{})]}),(0,n.jsx)(C,{children:(0,n.jsx)(u.Z,{sx:{p:[6,12],height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,n.jsxs)(u.Z,{sx:{width:"100%",maxWidth:400},children:[(0,n.jsxs)("svg",{width:34,viewBox:"0 0 32 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",fill:o.palette.primary.main,d:"M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"}),(0,n.jsx)("path",{fill:"#161616",opacity:.06,fillRule:"evenodd",clipRule:"evenodd",d:"M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"}),(0,n.jsx)("path",{fill:"#161616",opacity:.06,fillRule:"evenodd",clipRule:"evenodd",d:"M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",fill:o.palette.primary.main,d:"M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"})]}),(0,n.jsxs)(u.Z,{sx:{my:6},children:[(0,n.jsx)(d.Z,{variant:"h3",sx:{mb:1.5},children:"Adventure starts here \uD83D\uDE80"}),(0,n.jsx)(d.Z,{sx:{color:"text.secondary"},children:"Make your app management easy and fun!"})]}),(0,n.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:e=>e.preventDefault(),children:[(0,n.jsx)(b.Z,{autoFocus:!0,fullWidth:!0,sx:{mb:4},label:"Username",placeholder:"johndoe"}),(0,n.jsx)(b.Z,{fullWidth:!0,label:"Email",sx:{mb:4},placeholder:"user@email.com"}),(0,n.jsx)(b.Z,{fullWidth:!0,label:"Password",id:"auth-login-v2-password",type:e?"text":"password",InputProps:{endAdornment:(0,n.jsx)(f.Z,{position:"end",children:(0,n.jsx)(c.Z,{edge:"end",onMouseDown:e=>e.preventDefault(),onClick:()=>t(!e),children:(0,n.jsx)(Z.Z,{fontSize:"1.25rem",icon:e?"tabler:eye":"tabler:eye-off"})})})}}),(0,n.jsx)(I,{control:(0,n.jsx)(p.Z,{}),sx:{mb:4,mt:1.5,"& .MuiFormControlLabel-label":{fontSize:o.typography.body2.fontSize}},label:(0,n.jsxs)(u.Z,{sx:{display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"center"},children:[(0,n.jsx)(d.Z,{sx:{color:"text.secondary"},children:"I agree to"}),(0,n.jsx)(d.Z,{component:k,href:"/",onClick:e=>e.preventDefault(),sx:{ml:1},children:"privacy policy & terms"})]})}),(0,n.jsx)(l.Z,{fullWidth:!0,type:"submit",variant:"contained",sx:{mb:4},children:"Sign up"}),(0,n.jsxs)(u.Z,{sx:{display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"center"},children:[(0,n.jsx)(d.Z,{sx:{color:"text.secondary",mr:2},children:"Already have an account?"}),(0,n.jsx)(d.Z,{component:k,href:"/login",children:"Sign in instead"})]}),(0,n.jsx)(s.Z,{sx:{color:"text.disabled","& .MuiDivider-wrapper":{px:6},fontSize:o.typography.body2.fontSize,my:e=>"".concat(e.spacing(6)," !important")},children:"or"}),(0,n.jsxs)(u.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)(c.Z,{href:"/",component:i(),sx:{color:"#497ce2"},onClick:e=>e.preventDefault(),children:(0,n.jsx)(Z.Z,{icon:"mdi:facebook"})}),(0,n.jsx)(c.Z,{href:"/",component:i(),sx:{color:"#1da1f2"},onClick:e=>e.preventDefault(),children:(0,n.jsx)(Z.Z,{icon:"mdi:twitter"})}),(0,n.jsx)(c.Z,{href:"/",component:i(),onClick:e=>e.preventDefault(),sx:{color:e=>"light"===e.palette.mode?"#272727":"grey.300"},children:(0,n.jsx)(Z.Z,{icon:"mdi:github"})}),(0,n.jsx)(c.Z,{href:"/",component:i(),sx:{color:"#db4437"},onClick:e=>e.preventDefault(),children:(0,n.jsx)(Z.Z,{icon:"mdi:google"})})]})]})]})})})]})};w.getLayout=e=>(0,n.jsx)(y.Z,{children:e}),w.guestGuard=!0,t.default=w},2374:function(e,t,o){"use strict";var n=o(5893),r=o(8396),a=o(948),i=o(2734);let l=(0,a.ZP)("img")(e=>{let{theme:t}=e;return{bottom:0,height:300,width:"100%",position:"absolute",[t.breakpoints.down(1540)]:{height:250}}}),s=e=>{let{image:t,height:o,className:a}=e,s=(0,i.Z)(),p=(0,r.Z)(s.breakpoints.down("md"));return p?null:(0,n.jsx)(n.Fragment,{children:t?"string"==typeof t?(0,n.jsx)(l,{alt:"mask",src:t,className:a,...o&&{height:o}}):t:(0,n.jsx)(l,{alt:"mask",className:a,...o&&{height:o},src:"/images/pages/auth-v2-mask-".concat(s.palette.mode,".png")})})};t.Z=s}},function(e){e.O(0,[774,888,179],function(){return e(e.s=6276)}),_N_E=e.O()}]);