"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[569],{16606:function(e,r,t){t.d(r,{Z:function(){return g}});var n=t(45987),o=t(1413),i=t(29823),a=t(55931),l=t(72791),p=t(4942),c=t(66934),d=t(13400),s=t(73542),u=(0,c.ZP)("div")((function(e){var r=e.theme;return(0,p.Z)({backgroundColor:r.palette.primary.light,padding:10,height:"100vh",borderRadius:"20px",overflowY:"auto"},r.breakpoints.up("sm"),{height:"auto",padding:"55px",borderRadius:"200px"})})),h=(0,c.ZP)(d.Z)((function(e){var r=e.theme;return(0,p.Z)({position:"absolute",backgroundColor:r.palette.primary.main,borderRadius:"150px 200px 130px 170px",top:0,right:2,width:30,height:30,transition:"0.3s","&:hover":{backgroundColor:r.palette.primary.main,opacity:.8}},r.breakpoints.up("sm"),{top:-19,right:2})})),m=(0,c.ZP)(s.Z)((function(e){var r,t=e.theme;return{".MuiDialog-root":{padding:"0px"},".MuiDialog-container":{padding:"0px"},".MuiDialog-paper":(r={position:"absolute",top:0,overflow:"visible",backgroundColor:t.palette.primary.main,color:t.palette.primary.contrastText,boxSizing:"border-box",width:"100%",minHeight:"100vh",margin:"0px",maxWidth:"none",padding:"10px"},(0,p.Z)(r,t.breakpoints.up("sm"),{top:"50%",width:"518px",minHeight:"fit-content",borderRadius:"200px 210px 200px 155px",transform:"rotate(5deg) translateY(-50%)","& > *":{transform:"rotate(-5deg)"}}),(0,p.Z)(r,t.breakpoints.up("md"),{height:"auto",width:"573px"}),(0,p.Z)(r,t.breakpoints.up("lg"),{width:"618px"}),(0,p.Z)(r,t.breakpoints.up("xl"),{height:"fit-content",width:"750px"}),r)}})),x=t(80184),f=["children"],v=(0,l.forwardRef)((function(e,r){return(0,x.jsx)(a.Z,(0,o.Z)({direction:"down",ref:r,in:!0},e))})),Z=function(e){var r=e.children,t=(0,n.Z)(e,f);return(0,x.jsxs)(m,(0,o.Z)((0,o.Z)({},t),{},{TransitionComponent:v,keepMounted:!0,children:[(0,x.jsx)(u,{children:r}),t.onClose&&(0,x.jsx)(h,{onClick:function(e){var r;return null===(r=t.onClose)||void 0===r?void 0:r.call(t,e,"backdropClick")},children:(0,x.jsx)(i.Z,{})})]}))},g=(0,l.memo)(Z)},58569:function(e,r,t){t.r(r),t.d(r,{default:function(){return w}});var n=t(29439),o=t(16606),i=t(20385),a=t(15529),l=t(65762),p=t(14398),c=t(38153),d=t(50525),s=t(74165),u=t(15861),h=t(73418),m=t(91797),x=t(25983),f=t(38086),v=t(3046),Z=t(72791),g=t(39230),b=t(80184),k=function(){var e=(0,l.q)(),r=e.dialogsState.deleteTaskDialog,t=r.taskId,Z=r.todoListId,k=r.visible,w=e.dialogsActions.updateDeleteTaskDialog,W=(0,p.Z)(k,(function(){return w(c._w)})),S=(0,n.Z)(W,2),y=S[0],C=S[1],D=function(){var e=(0,v.Z)(),r=function(){var e=(0,u.Z)((0,s.Z)().mark((function e(r){var t,n,o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.todoListId,n=r.taskId,o=(0,x.o)((0,f.Xw)(t,n)),e.abrupt("return",(0,m.QW)(o).then((function(e){return e.data})));case 3:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,h.D)(r,{onSuccess:function(r){var t=r.id;return e(t)}})}(),P=(0,g.$G)().t;return(0,b.jsx)(o.Z,{open:y,onClose:C,children:(0,b.jsx)(a.Z,{image:(0,b.jsx)(i.D,{}),imageStylesOverride:{width:{xs:150},height:{xs:100}},headerText:P(d.w.DelteTaskWarning),actionButton:{children:P(d.w.DelteTask),onClick:function(){D.mutate({todoListId:Z,taskId:t}),C()}},reversed:!0})})},w=(0,Z.memo)(k)},29823:function(e,r,t){var n=t(64836);r.Z=void 0;var o=n(t(45649)),i=t(80184),a=(0,o.default)((0,i.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");r.Z=a},73542:function(e,r,t){t.d(r,{Z:function(){return C}});var n=t(4942),o=t(63366),i=t(87462),a=t(72791),l=t(63733),p=t(94419),c=t(18252),d=t(14036),s=t(88447),u=t(60627),h=t(35527),m=t(31402),x=t(66934),f=t(17780);var v=a.createContext({}),Z=t(52739),g=t(13967),b=t(80184),k=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],w=(0,x.ZP)(Z.Z,{name:"MuiDialog",slot:"Backdrop",overrides:function(e,r){return r.backdrop}})({zIndex:-1}),W=(0,x.ZP)(s.Z,{name:"MuiDialog",slot:"Root",overridesResolver:function(e,r){return r.root}})({"@media print":{position:"absolute !important"}}),S=(0,x.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:function(e,r){var t=e.ownerState;return[r.container,r["scroll".concat((0,d.Z)(t.scroll))]]}})((function(e){var r=e.ownerState;return(0,i.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===r.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===r.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),y=(0,x.ZP)(h.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:function(e,r){var t=e.ownerState;return[r.paper,r["scrollPaper".concat((0,d.Z)(t.scroll))],r["paperWidth".concat((0,d.Z)(String(t.maxWidth)))],t.fullWidth&&r.paperFullWidth,t.fullScreen&&r.paperFullScreen]}})((function(e){var r=e.theme,t=e.ownerState;return(0,i.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===t.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===t.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!t.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===t.maxWidth&&(0,n.Z)({maxWidth:"px"===r.breakpoints.unit?Math.max(r.breakpoints.values.xs,444):"max(".concat(r.breakpoints.values.xs).concat(r.breakpoints.unit,", 444px)")},"&.".concat(f.Z.paperScrollBody),(0,n.Z)({},r.breakpoints.down(Math.max(r.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})),t.maxWidth&&"xs"!==t.maxWidth&&(0,n.Z)({maxWidth:"".concat(r.breakpoints.values[t.maxWidth]).concat(r.breakpoints.unit)},"&.".concat(f.Z.paperScrollBody),(0,n.Z)({},r.breakpoints.down(r.breakpoints.values[t.maxWidth]+64),{maxWidth:"calc(100% - 64px)"})),t.fullWidth&&{width:"calc(100% - 64px)"},t.fullScreen&&(0,n.Z)({margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0},"&.".concat(f.Z.paperScrollBody),{margin:0,maxWidth:"100%"}))})),C=a.forwardRef((function(e,r){var t=(0,m.Z)({props:e,name:"MuiDialog"}),n=(0,g.Z)(),s={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},x=t["aria-describedby"],Z=t["aria-labelledby"],C=t.BackdropComponent,D=t.BackdropProps,P=t.children,M=t.className,j=t.disableEscapeKeyDown,B=void 0!==j&&j,T=t.fullScreen,R=void 0!==T&&T,I=t.fullWidth,F=void 0!==I&&I,A=t.maxWidth,N=void 0===A?"sm":A,Y=t.onBackdropClick,E=t.onClose,H=t.open,K=t.PaperComponent,L=void 0===K?h.Z:K,X=t.PaperProps,z=void 0===X?{}:X,q=t.scroll,G=void 0===q?"paper":q,O=t.TransitionComponent,Q=void 0===O?u.Z:O,$=t.transitionDuration,_=void 0===$?s:$,J=t.TransitionProps,U=(0,o.Z)(t,k),V=(0,i.Z)({},t,{disableEscapeKeyDown:B,fullScreen:R,fullWidth:F,maxWidth:N,scroll:G}),ee=function(e){var r=e.classes,t=e.scroll,n=e.maxWidth,o=e.fullWidth,i=e.fullScreen,a={root:["root"],container:["container","scroll".concat((0,d.Z)(t))],paper:["paper","paperScroll".concat((0,d.Z)(t)),"paperWidth".concat((0,d.Z)(String(n))),o&&"paperFullWidth",i&&"paperFullScreen"]};return(0,p.Z)(a,f.D,r)}(V),re=a.useRef(),te=(0,c.Z)(Z),ne=a.useMemo((function(){return{titleId:te}}),[te]);return(0,b.jsx)(W,(0,i.Z)({className:(0,l.Z)(ee.root,M),closeAfterTransition:!0,components:{Backdrop:w},componentsProps:{backdrop:(0,i.Z)({transitionDuration:_,as:C},D)},disableEscapeKeyDown:B,onClose:E,open:H,ref:r,onClick:function(e){re.current&&(re.current=null,Y&&Y(e),E&&E(e,"backdropClick"))},ownerState:V},U,{children:(0,b.jsx)(Q,(0,i.Z)({appear:!0,in:H,timeout:_,role:"presentation"},J,{children:(0,b.jsx)(S,{className:(0,l.Z)(ee.container),onMouseDown:function(e){re.current=e.target===e.currentTarget},ownerState:V,children:(0,b.jsx)(y,(0,i.Z)({as:L,elevation:24,role:"dialog","aria-describedby":x,"aria-labelledby":te},z,{className:(0,l.Z)(ee.paper,z.className),ownerState:V,children:(0,b.jsx)(v.Provider,{value:ne,children:P})}))})}))}))}))},17780:function(e,r,t){t.d(r,{D:function(){return i}});var n=t(75878),o=t(21217);function i(e){return(0,o.Z)("MuiDialog",e)}var a=(0,n.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);r.Z=a}}]);
//# sourceMappingURL=569.5c7ea7c3.chunk.js.map