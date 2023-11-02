"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[103],{49522:function(e,r,n){n.d(r,{A:function(){return o},z:function(){return i}});var t=n(4942),a=n(66934),s=n(20890),i=(0,a.ZP)("section")((function(e){var r,n=e.theme;return r={display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",gap:"20px",padding:"128px 16px 60px 16px"},(0,t.Z)(r,n.breakpoints.up("sm"),{padding:"128px 42px 60px 42px"}),(0,t.Z)(r,n.breakpoints.up("md"),{padding:"128px 64px 60px 64px",flexDirection:"row",alignItems:"flex-start",gap:"100px"}),(0,t.Z)(r,n.breakpoints.up("lg"),{padding:"180px 128px 60px 128px",gap:"200px"}),r})),o=(0,a.ZP)(s.Z)((function(e){return{color:e.theme.palette.primary.contrastText}}))},89166:function(e,r,n){n.d(r,{G:function(){return i},S:function(){return s}});var t=n(4942),a=n(66934),s=(0,a.ZP)("div")((function(e){var r=e.theme;return(0,t.Z)({display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"-1px -1px 15px rgba(0, 0, 0, 0.05), 1px 1px 15px rgba(0, 0, 0, 0.05)",borderRadius:"30px",background:r.palette.primary.main,width:"100%",maxWidth:524,gap:"20px",padding:"30px 5% 10px 5%"},r.breakpoints.up("sm"),{boxSizing:"border-box",padding:"45px 55px 60px 55px"})})),i=(0,a.ZP)("form")((function(e){return{display:"flex",flexDirection:"column",width:"100%",gap:"20px",marginTop:"16px",color:e.theme.palette.primary.main}}))},103:function(e,r,n){n.r(r),n.d(r,{default:function(){return L}});var t=n(29439),a=n(34855),s=n(56196),i=n(50525),o=n(49522),c=n(72791),l=n(39230),u=n(57689),d=n(13239),p=n(41178),m=n(66934),f=n(20890),x=(0,m.ZP)(f.Z)((function(e){return{fontSize:"12px",color:e.theme.palette.warning.main,margin:0}})),g=n(94141),v=n(74165),h=n(15861),w=n(73418),Z=n(91797),k=n(25983),y=n(69061),S=n(57177),b=n(61134),j=n(89166),P=n(80184),R=function(e){var r,n,t=e.setIsRegistering,o=e.defaultEmail,c=(0,l.$G)().t,m=(0,S.D)().setSnackbar,f=function(){var e=(0,a.x)().setCurrentUser,r=(0,k.o)(y.CU,y.dG),n=function(){var e=(0,h.Z)((0,v.Z)().mark((function e(n){return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,Z.sg)(r,n).then((function(e){return e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,w.D)(n,{onSuccess:function(r){e(r)}})}(),R=(0,u.s0)(),D=(0,b.cI)({defaultValues:{email:o}}),C=D.control,E=D.setError,M=D.formState.errors,N=D.handleSubmit;return(0,P.jsxs)(j.G,{onSubmit:N((function(e){e.email?e.password?f.mutate(e,{onSuccess:function(){R(s.i.RemindersPage.path),m({message:c(i.w.LoginSuccess)})},onError:function(e){var r;m({message:(null===(r=e.response)||void 0===r?void 0:r.data)||e.message,severity:"error"})}}):E("password",{message:c(i.w.PasswordRequired)}):E("email",{message:c(i.w.EmailRequired)})})),children:[(0,P.jsx)(g.M,{name:"email",control:C,type:"email",placeholder:c(i.w.Email)}),(null===(r=M.email)||void 0===r?void 0:r.message)&&(0,P.jsx)(x,{children:M.email.message}),(0,P.jsx)(g.M,{name:"password",control:C,type:"password",placeholder:c(i.w.Password)}),(null===(n=M.password)||void 0===n?void 0:n.message)&&(0,P.jsx)(x,{children:M.password.message}),(0,P.jsxs)(p.z,{type:"submit",children:[f.isLoading&&(0,P.jsx)(d.Z,{size:"20px"}),c(i.w.LoginButtonText)]}),(0,P.jsx)(p.z,{onClick:function(){t(!0)},children:c(i.w.RegisterButtonText)})]})},D=(0,c.memo)(R),C=n(1413),E=n(50219),M=function(e){var r,n,t,o,c=e.setIsRegistering,m=e.defaultEmail,f=(0,l.$G)().t,R=(0,E.G)().language,D=(0,S.D)().setSnackbar,M=function(){var e=(0,a.x)().setCurrentUser,r=(0,k.o)(y.CU,y.XD),n=function(){var e=(0,h.Z)((0,v.Z)().mark((function e(n){return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,Z.sg)(r,n).then((function(e){return e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,w.D)((function(e){return n(e)}),{onSuccess:function(r){e(r)}})}(),N=(0,u.s0)(),z=(0,b.cI)({defaultValues:{email:m}}),I=z.control,G=z.setError,L=z.formState.errors,T=z.handleSubmit;return(0,P.jsxs)(j.G,{onSubmit:T((function(e){e.email?e.displayName?e.password?(e.passwordRepeat||G("passwordRepeat",{message:f(i.w.PasswordRequired)}),e.password!==e.passwordRepeat&&G("passwordRepeat",{message:f(i.w.PasswordsNoMatch)}),M.mutate((0,C.Z)((0,C.Z)({},e),{},{language:R}),{onSuccess:function(){N(s.i.RemindersPage.path),D({message:f(i.w.LoginSuccess)})},onError:function(e){var r;D({message:(null===(r=e.response)||void 0===r?void 0:r.data)||e.message,severity:"error"})}})):G("password",{message:f(i.w.PasswordRequired)}):G("displayName",{message:f(i.w.DisplayNameRequired)}):G("email",{message:f(i.w.EmailRequired)})})),children:[(0,P.jsx)(g.M,{name:"displayName",control:I,placeholder:f(i.w.DisplayName)}),(null===(r=L.displayName)||void 0===r?void 0:r.message)&&(0,P.jsx)(x,{children:L.displayName.message}),(0,P.jsx)(g.M,{name:"email",control:I,type:"email",placeholder:f(i.w.Email)}),(null===(n=L.email)||void 0===n?void 0:n.message)&&(0,P.jsx)(x,{children:L.email.message}),(0,P.jsx)(g.M,{name:"password",control:I,type:"password",placeholder:f(i.w.Password)}),(null===(t=L.password)||void 0===t?void 0:t.message)&&(0,P.jsx)(x,{children:L.password.message}),(0,P.jsx)(g.M,{name:"passwordRepeat",control:I,type:"password",placeholder:f(i.w.PasswordRepeat)}),(null===(o=L.passwordRepeat)||void 0===o?void 0:o.message)&&(0,P.jsx)(x,{children:L.passwordRepeat.message}),(0,P.jsxs)(p.z,{type:"submit",children:[M.isLoading&&(0,P.jsx)(d.Z,{size:"20px"}),f(i.w.RegisterButtonText)]}),(0,P.jsx)(p.z,{onClick:function(){c(!1)},children:f(i.w.LoginButtonText)})]})},N=(0,c.memo)(M),z=function(e){var r=e.defaultEmail,n=(0,l.$G)().t,d=(0,c.useState)(!1),p=(0,t.Z)(d,2),m=p[0],f=p[1],x=(0,a.x)().currentUser,g=(0,u.s0)();return(0,c.useEffect)((function(){x&&g(s.i.RemindersPage.path)}),[x,g]),(0,P.jsxs)(j.S,{children:[(0,P.jsx)(o.A,{children:n(i.w.LoginPanelHeader)}),m?(0,P.jsx)(N,{setIsRegistering:f,defaultEmail:r}):(0,P.jsx)(D,{setIsRegistering:f,defaultEmail:r})]})},I=n(11087),G=function(){var e=(0,l.$G)().t,r=(0,I.lr)(),n=(0,t.Z)(r,1)[0],o=(0,a.x)().currentUser,d=(0,u.s0)(),p=n.get("email")||void 0;return(0,c.useLayoutEffect)((function(){var r="".concat(e(i.w.PageTitleMain)).concat(e(i.w.PageTitleHome));document.title=r})),(0,c.useEffect)((function(){o&&d(s.i.HomePage.path)}),[o,d]),(0,P.jsx)(P.Fragment,{children:(0,P.jsx)(z,{defaultEmail:p})})},L=(0,c.memo)(G)},13239:function(e,r,n){n.d(r,{Z:function(){return N}});var t=n(30168),a=n(63366),s=n(87462),i=n(72791),o=n(63733),c=n(94419),l=n(52554),u=n(14036),d=n(31402),p=n(66934),m=n(75878),f=n(21217);function x(e){return(0,f.Z)("MuiCircularProgress",e)}(0,m.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var g,v,h,w,Z,k,y,S,b=n(80184),j=["className","color","disableShrink","size","style","thickness","value","variant"],P=44,R=(0,l.F4)(Z||(Z=g||(g=(0,t.Z)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),D=(0,l.F4)(k||(k=v||(v=(0,t.Z)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),C=(0,p.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(e,r){var n=e.ownerState;return[r.root,r[n.variant],r["color".concat((0,u.Z)(n.color))]]}})((function(e){var r=e.ownerState,n=e.theme;return(0,s.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:n.transitions.create("transform")},"inherit"!==r.color&&{color:(n.vars||n).palette[r.color].main})}),(function(e){return"indeterminate"===e.ownerState.variant&&(0,l.iv)(y||(y=h||(h=(0,t.Z)(["\n      animation: "," 1.4s linear infinite;\n    "]))),R)})),E=(0,p.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(e,r){return r.svg}})({display:"block"}),M=(0,p.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(e,r){var n=e.ownerState;return[r.circle,r["circle".concat((0,u.Z)(n.variant))],n.disableShrink&&r.circleDisableShrink]}})((function(e){var r=e.ownerState,n=e.theme;return(0,s.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:n.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(e){var r=e.ownerState;return"indeterminate"===r.variant&&!r.disableShrink&&(0,l.iv)(S||(S=w||(w=(0,t.Z)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),D)})),N=i.forwardRef((function(e,r){var n=(0,d.Z)({props:e,name:"MuiCircularProgress"}),t=n.className,i=n.color,l=void 0===i?"primary":i,p=n.disableShrink,m=void 0!==p&&p,f=n.size,g=void 0===f?40:f,v=n.style,h=n.thickness,w=void 0===h?3.6:h,Z=n.value,k=void 0===Z?0:Z,y=n.variant,S=void 0===y?"indeterminate":y,R=(0,a.Z)(n,j),D=(0,s.Z)({},n,{color:l,disableShrink:m,size:g,thickness:w,value:k,variant:S}),N=function(e){var r=e.classes,n=e.variant,t=e.color,a=e.disableShrink,s={root:["root",n,"color".concat((0,u.Z)(t))],svg:["svg"],circle:["circle","circle".concat((0,u.Z)(n)),a&&"circleDisableShrink"]};return(0,c.Z)(s,x,r)}(D),z={},I={},G={};if("determinate"===S){var L=2*Math.PI*((P-w)/2);z.strokeDasharray=L.toFixed(3),G["aria-valuenow"]=Math.round(k),z.strokeDashoffset="".concat(((100-k)/100*L).toFixed(3),"px"),I.transform="rotate(-90deg)"}return(0,b.jsx)(C,(0,s.Z)({className:(0,o.Z)(N.root,t),style:(0,s.Z)({width:g,height:g},I,v),ownerState:D,ref:r,role:"progressbar"},G,R,{children:(0,b.jsx)(E,{className:N.svg,ownerState:D,viewBox:"".concat(22," ").concat(22," ").concat(P," ").concat(P),children:(0,b.jsx)(M,{className:N.circle,style:z,ownerState:D,cx:P,cy:P,r:(P-w)/2,fill:"none",strokeWidth:w})})}))}))}}]);
//# sourceMappingURL=103.2cc49d4c.chunk.js.map