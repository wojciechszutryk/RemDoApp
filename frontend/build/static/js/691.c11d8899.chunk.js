"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[691],{43896:function(e,t,o){o.d(t,{Z:function(){return S}});var r=o(4942),n=o(63366),l=o(87462),i=o(72791),a=o(63733),c=o(94419),s=o(95080),d=o(14036),u=o(31402),f=o(66934),v=o(75878),b=o(21217);function p(e){return(0,b.Z)("MuiTab",e)}var h=(0,v.Z)("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]),m=o(80184),Z=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],w=(0,f.ZP)(s.Z,{name:"MuiTab",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,o.label&&o.icon&&t.labelIcon,t["textColor".concat((0,d.Z)(o.textColor))],o.fullWidth&&t.fullWidth,o.wrapped&&t.wrapped]}})((function(e){var t,o,n,i=e.theme,a=e.ownerState;return(0,l.Z)({},i.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},a.label&&{flexDirection:"top"===a.iconPosition||"bottom"===a.iconPosition?"column":"row"},{lineHeight:1.25},a.icon&&a.label&&(0,r.Z)({minHeight:72,paddingTop:9,paddingBottom:9},"& > .".concat(h.iconWrapper),(0,l.Z)({},"top"===a.iconPosition&&{marginBottom:6},"bottom"===a.iconPosition&&{marginTop:6},"start"===a.iconPosition&&{marginRight:i.spacing(1)},"end"===a.iconPosition&&{marginLeft:i.spacing(1)})),"inherit"===a.textColor&&(t={color:"inherit",opacity:.6},(0,r.Z)(t,"&.".concat(h.selected),{opacity:1}),(0,r.Z)(t,"&.".concat(h.disabled),{opacity:(i.vars||i).palette.action.disabledOpacity}),t),"primary"===a.textColor&&(o={color:(i.vars||i).palette.text.secondary},(0,r.Z)(o,"&.".concat(h.selected),{color:(i.vars||i).palette.primary.main}),(0,r.Z)(o,"&.".concat(h.disabled),{color:(i.vars||i).palette.text.disabled}),o),"secondary"===a.textColor&&(n={color:(i.vars||i).palette.text.secondary},(0,r.Z)(n,"&.".concat(h.selected),{color:(i.vars||i).palette.secondary.main}),(0,r.Z)(n,"&.".concat(h.disabled),{color:(i.vars||i).palette.text.disabled}),n),a.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},a.wrapped&&{fontSize:i.typography.pxToRem(12)})})),S=i.forwardRef((function(e,t){var o=(0,u.Z)({props:e,name:"MuiTab"}),r=o.className,s=o.disabled,f=void 0!==s&&s,v=o.disableFocusRipple,b=void 0!==v&&v,h=o.fullWidth,S=o.icon,x=o.iconPosition,g=void 0===x?"top":x,y=o.indicator,C=o.label,B=o.onChange,M=o.onClick,W=o.onFocus,E=o.selected,P=o.selectionFollowsFocus,I=o.textColor,R=void 0===I?"inherit":I,T=o.value,N=o.wrapped,k=void 0!==N&&N,L=(0,n.Z)(o,Z),F=(0,l.Z)({},o,{disabled:f,disableFocusRipple:b,selected:E,icon:!!S,iconPosition:g,label:!!C,fullWidth:h,textColor:R,wrapped:k}),z=function(e){var t=e.classes,o=e.textColor,r=e.fullWidth,n=e.wrapped,l=e.icon,i=e.label,a=e.selected,s=e.disabled,u={root:["root",l&&i&&"labelIcon","textColor".concat((0,d.Z)(o)),r&&"fullWidth",n&&"wrapped",a&&"selected",s&&"disabled"],iconWrapper:["iconWrapper"]};return(0,c.Z)(u,p,t)}(F),A=S&&C&&i.isValidElement(S)?i.cloneElement(S,{className:(0,a.Z)(z.iconWrapper,S.props.className)}):S;return(0,m.jsxs)(w,(0,l.Z)({focusRipple:!b,className:(0,a.Z)(z.root,r),ref:t,role:"tab","aria-selected":E,disabled:f,onClick:function(e){!E&&B&&B(e,T),M&&M(e)},onFocus:function(e){P&&!E&&B&&B(e,T),W&&W(e)},ownerState:F,tabIndex:E?0:-1},L,{children:["top"===g||"start"===g?(0,m.jsxs)(i.Fragment,{children:[A,C]}):(0,m.jsxs)(i.Fragment,{children:[C,A]}),y]}))}))},18073:function(e,t,o){o.d(t,{Z:function(){return U}});var r,n=o(29439),l=o(4942),i=o(63366),a=o(87462),c=o(72791),s=(o(57441),o(63733)),d=o(94419),u=o(40536),f=o(66934),v=o(31402),b=o(13967),p=o(83199);function h(){if(r)return r;var e=document.createElement("div"),t=document.createElement("div");return t.style.width="10px",t.style.height="1px",e.appendChild(t),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),r="reverse",e.scrollLeft>0?r="default":(e.scrollLeft=1,0===e.scrollLeft&&(r="negative")),document.body.removeChild(e),r}function m(e,t){var o=e.scrollLeft;if("rtl"!==t)return o;switch(h()){case"negative":return e.scrollWidth-e.clientWidth+o;case"reverse":return e.scrollWidth-e.clientWidth-o;default:return o}}function Z(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}var w=o(40162),S=o(17602),x=o(80184),g=["onChange"],y={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};var C=o(76189),B=(0,C.Z)((0,x.jsx)("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft"),M=(0,C.Z)((0,x.jsx)("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight"),W=o(95080),E=o(75878),P=o(21217);function I(e){return(0,P.Z)("MuiTabScrollButton",e)}var R=(0,E.Z)("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),T=["className","slots","slotProps","direction","orientation","disabled"],N=(0,f.ZP)(W.Z,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,o.orientation&&t[o.orientation]]}})((function(e){var t=e.ownerState;return(0,a.Z)((0,l.Z)({width:40,flexShrink:0,opacity:.8},"&.".concat(R.disabled),{opacity:0}),"vertical"===t.orientation&&{width:"100%",height:40,"& svg":{transform:"rotate(".concat(t.isRtl?-90:90,"deg)")}})})),k=c.forwardRef((function(e,t){var o,r,n=(0,v.Z)({props:e,name:"MuiTabScrollButton"}),l=n.className,c=n.slots,f=void 0===c?{}:c,p=n.slotProps,h=void 0===p?{}:p,m=n.direction,Z=(0,i.Z)(n,T),w="rtl"===(0,b.Z)().direction,S=(0,a.Z)({isRtl:w},n),g=function(e){var t=e.classes,o={root:["root",e.orientation,e.disabled&&"disabled"]};return(0,d.Z)(o,I,t)}(S),y=null!=(o=f.StartScrollButtonIcon)?o:B,C=null!=(r=f.EndScrollButtonIcon)?r:M,W=(0,u.y)({elementType:y,externalSlotProps:h.startScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:S}),E=(0,u.y)({elementType:C,externalSlotProps:h.endScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:S});return(0,x.jsx)(N,(0,a.Z)({component:"div",className:(0,s.Z)(g.root,l),ref:t,role:null,ownerState:S,tabIndex:null},Z,{children:"left"===m?(0,x.jsx)(y,(0,a.Z)({},W)):(0,x.jsx)(C,(0,a.Z)({},E))}))})),L=o(89683),F=o(85860),z=o(98301),A=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","slots","slotProps","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],j=function(e,t){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:e.firstChild},H=function(e,t){return e===t?e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:e.lastChild},X=function(e,t,o){for(var r=!1,n=o(e,t);n;){if(n===e.firstChild){if(r)return;r=!0}var l=n.disabled||"true"===n.getAttribute("aria-disabled");if(n.hasAttribute("tabindex")&&!l)return void n.focus();n=o(e,n)}},Y=(0,f.ZP)("div",{name:"MuiTabs",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[(0,l.Z)({},"& .".concat(F.Z.scrollButtons),t.scrollButtons),(0,l.Z)({},"& .".concat(F.Z.scrollButtons),o.scrollButtonsHideMobile&&t.scrollButtonsHideMobile),t.root,o.vertical&&t.vertical]}})((function(e){var t=e.ownerState,o=e.theme;return(0,a.Z)({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},t.vertical&&{flexDirection:"column"},t.scrollButtonsHideMobile&&(0,l.Z)({},"& .".concat(F.Z.scrollButtons),(0,l.Z)({},o.breakpoints.down("sm"),{display:"none"})))})),D=(0,f.ZP)("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:function(e,t){var o=e.ownerState;return[t.scroller,o.fixed&&t.fixed,o.hideScrollbar&&t.hideScrollbar,o.scrollableX&&t.scrollableX,o.scrollableY&&t.scrollableY]}})((function(e){var t=e.ownerState;return(0,a.Z)({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},t.fixed&&{overflowX:"hidden",width:"100%"},t.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},t.scrollableX&&{overflowX:"auto",overflowY:"hidden"},t.scrollableY&&{overflowY:"auto",overflowX:"hidden"})})),O=(0,f.ZP)("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:function(e,t){var o=e.ownerState;return[t.flexContainer,o.vertical&&t.flexContainerVertical,o.centered&&t.centered]}})((function(e){var t=e.ownerState;return(0,a.Z)({display:"flex"},t.vertical&&{flexDirection:"column"},t.centered&&{justifyContent:"center"})})),V=(0,f.ZP)("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:function(e,t){return t.indicator}})((function(e){var t=e.ownerState,o=e.theme;return(0,a.Z)({position:"absolute",height:2,bottom:0,width:"100%",transition:o.transitions.create()},"primary"===t.indicatorColor&&{backgroundColor:(o.vars||o).palette.primary.main},"secondary"===t.indicatorColor&&{backgroundColor:(o.vars||o).palette.secondary.main},t.vertical&&{height:"100%",width:2,right:0})})),q=(0,f.ZP)((function(e){var t=e.onChange,o=(0,i.Z)(e,g),r=c.useRef(),n=c.useRef(null),l=function(){r.current=n.current.offsetHeight-n.current.clientHeight};return(0,w.Z)((function(){var e=(0,p.Z)((function(){var e=r.current;l(),e!==r.current&&t(r.current)})),o=(0,S.Z)(n.current);return o.addEventListener("resize",e),function(){e.clear(),o.removeEventListener("resize",e)}}),[t]),c.useEffect((function(){l(),t(r.current)}),[t]),(0,x.jsx)("div",(0,a.Z)({style:y,ref:n},o))}))({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),K={},G=c.forwardRef((function(e,t){var o=(0,v.Z)({props:e,name:"MuiTabs"}),r=(0,b.Z)(),f="rtl"===r.direction,w=o["aria-label"],g=o["aria-labelledby"],y=o.action,C=o.centered,B=void 0!==C&&C,M=o.children,W=o.className,E=o.component,P=void 0===E?"div":E,I=o.allowScrollButtonsMobile,R=void 0!==I&&I,T=o.indicatorColor,N=void 0===T?"primary":T,G=o.onChange,U=o.orientation,J=void 0===U?"horizontal":U,Q=o.ScrollButtonComponent,$=void 0===Q?k:Q,_=o.scrollButtons,ee=void 0===_?"auto":_,te=o.selectionFollowsFocus,oe=o.slots,re=void 0===oe?{}:oe,ne=o.slotProps,le=void 0===ne?{}:ne,ie=o.TabIndicatorProps,ae=void 0===ie?{}:ie,ce=o.TabScrollButtonProps,se=void 0===ce?{}:ce,de=o.textColor,ue=void 0===de?"primary":de,fe=o.value,ve=o.variant,be=void 0===ve?"standard":ve,pe=o.visibleScrollbar,he=void 0!==pe&&pe,me=(0,i.Z)(o,A),Ze="scrollable"===be,we="vertical"===J,Se=we?"scrollTop":"scrollLeft",xe=we?"top":"left",ge=we?"bottom":"right",ye=we?"clientHeight":"clientWidth",Ce=we?"height":"width",Be=(0,a.Z)({},o,{component:P,allowScrollButtonsMobile:R,indicatorColor:N,orientation:J,vertical:we,scrollButtons:ee,textColor:ue,variant:be,visibleScrollbar:he,fixed:!Ze,hideScrollbar:Ze&&!he,scrollableX:Ze&&!we,scrollableY:Ze&&we,centered:B&&!Ze,scrollButtonsHideMobile:!R}),Me=function(e){var t=e.vertical,o=e.fixed,r=e.hideScrollbar,n=e.scrollableX,l=e.scrollableY,i=e.centered,a=e.scrollButtonsHideMobile,c=e.classes,s={root:["root",t&&"vertical"],scroller:["scroller",o&&"fixed",r&&"hideScrollbar",n&&"scrollableX",l&&"scrollableY"],flexContainer:["flexContainer",t&&"flexContainerVertical",i&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",a&&"scrollButtonsHideMobile"],scrollableX:[n&&"scrollableX"],hideScrollbar:[r&&"hideScrollbar"]};return(0,d.Z)(s,F.m,c)}(Be),We=(0,u.y)({elementType:re.StartScrollButtonIcon,externalSlotProps:le.startScrollButtonIcon,ownerState:Be}),Ee=(0,u.y)({elementType:re.EndScrollButtonIcon,externalSlotProps:le.endScrollButtonIcon,ownerState:Be});var Pe=c.useState(!1),Ie=(0,n.Z)(Pe,2),Re=Ie[0],Te=Ie[1],Ne=c.useState(K),ke=(0,n.Z)(Ne,2),Le=ke[0],Fe=ke[1],ze=c.useState(!1),Ae=(0,n.Z)(ze,2),je=Ae[0],He=Ae[1],Xe=c.useState(!1),Ye=(0,n.Z)(Xe,2),De=Ye[0],Oe=Ye[1],Ve=c.useState(!1),qe=(0,n.Z)(Ve,2),Ke=qe[0],Ge=qe[1],Ue=c.useState({overflow:"hidden",scrollbarWidth:0}),Je=(0,n.Z)(Ue,2),Qe=Je[0],$e=Je[1],_e=new Map,et=c.useRef(null),tt=c.useRef(null),ot=function(){var e,t,o=et.current;if(o){var n=o.getBoundingClientRect();e={clientWidth:o.clientWidth,scrollLeft:o.scrollLeft,scrollTop:o.scrollTop,scrollLeftNormalized:m(o,r.direction),scrollWidth:o.scrollWidth,top:n.top,bottom:n.bottom,left:n.left,right:n.right}}if(o&&!1!==fe){var l=tt.current.children;if(l.length>0){var i=l[_e.get(fe)];0,t=i?i.getBoundingClientRect():null}}return{tabsMeta:e,tabMeta:t}},rt=(0,L.Z)((function(){var e,t,o=ot(),r=o.tabsMeta,n=o.tabMeta,i=0;if(we)t="top",n&&r&&(i=n.top-r.top+r.scrollTop);else if(t=f?"right":"left",n&&r){var a=f?r.scrollLeftNormalized+r.clientWidth-r.scrollWidth:r.scrollLeft;i=(f?-1:1)*(n[t]-r[t]+a)}var c=(e={},(0,l.Z)(e,t,i),(0,l.Z)(e,Ce,n?n[Ce]:0),e);if(isNaN(Le[t])||isNaN(Le[Ce]))Fe(c);else{var s=Math.abs(Le[t]-c[t]),d=Math.abs(Le[Ce]-c[Ce]);(s>=1||d>=1)&&Fe(c)}})),nt=function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).animation;void 0===t||t?function(e,t,o){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){},l=r.ease,i=void 0===l?Z:l,a=r.duration,c=void 0===a?300:a,s=null,d=t[e],u=!1,f=function(){u=!0};d===o?n(new Error("Element already at target position")):requestAnimationFrame((function r(l){if(u)n(new Error("Animation cancelled"));else{null===s&&(s=l);var a=Math.min(1,(l-s)/c);t[e]=i(a)*(o-d)+d,a>=1?requestAnimationFrame((function(){n(null)})):requestAnimationFrame(r)}}))}(Se,et.current,e,{duration:r.transitions.duration.standard}):et.current[Se]=e},lt=function(e){var t=et.current[Se];we?t+=e:(t+=e*(f?-1:1),t*=f&&"reverse"===h()?-1:1),nt(t)},it=function(){for(var e=et.current[ye],t=0,o=Array.from(tt.current.children),r=0;r<o.length;r+=1){var n=o[r];if(t+n[ye]>e){0===r&&(t=e);break}t+=n[ye]}return t},at=function(){lt(-1*it())},ct=function(){lt(it())},st=c.useCallback((function(e){$e({overflow:null,scrollbarWidth:e})}),[]),dt=(0,L.Z)((function(e){var t=ot(),o=t.tabsMeta,r=t.tabMeta;if(r&&o)if(r[xe]<o[xe]){var n=o[Se]+(r[xe]-o[xe]);nt(n,{animation:e})}else if(r[ge]>o[ge]){var l=o[Se]+(r[ge]-o[ge]);nt(l,{animation:e})}})),ut=(0,L.Z)((function(){Ze&&!1!==ee&&Ge(!Ke)}));c.useEffect((function(){var e,t,o=(0,p.Z)((function(){et.current&&rt()})),r=(0,S.Z)(et.current);return r.addEventListener("resize",o),"undefined"!==typeof ResizeObserver&&(e=new ResizeObserver(o),Array.from(tt.current.children).forEach((function(t){e.observe(t)}))),"undefined"!==typeof MutationObserver&&(t=new MutationObserver((function(t){t.forEach((function(t){t.removedNodes.forEach((function(t){var o;null==(o=e)||o.unobserve(t)})),t.addedNodes.forEach((function(t){var o;null==(o=e)||o.observe(t)}))})),o(),ut()}))).observe(tt.current,{childList:!0}),function(){var n,l;o.clear(),r.removeEventListener("resize",o),null==(n=t)||n.disconnect(),null==(l=e)||l.disconnect()}}),[rt,ut]),c.useEffect((function(){var e=Array.from(tt.current.children),t=e.length;if("undefined"!==typeof IntersectionObserver&&t>0&&Ze&&!1!==ee){var o=e[0],r=e[t-1],n={root:et.current,threshold:.99},l=new IntersectionObserver((function(e){He(!e[0].isIntersecting)}),n);l.observe(o);var i=new IntersectionObserver((function(e){Oe(!e[0].isIntersecting)}),n);return i.observe(r),function(){l.disconnect(),i.disconnect()}}}),[Ze,ee,Ke,null==M?void 0:M.length]),c.useEffect((function(){Te(!0)}),[]),c.useEffect((function(){rt()})),c.useEffect((function(){dt(K!==Le)}),[dt,Le]),c.useImperativeHandle(y,(function(){return{updateIndicator:rt,updateScrollButtons:ut}}),[rt,ut]);var ft=(0,x.jsx)(V,(0,a.Z)({},ae,{className:(0,s.Z)(Me.indicator,ae.className),ownerState:Be,style:(0,a.Z)({},Le,ae.style)})),vt=0,bt=c.Children.map(M,(function(e){if(!c.isValidElement(e))return null;var t=void 0===e.props.value?vt:e.props.value;_e.set(t,vt);var o=t===fe;return vt+=1,c.cloneElement(e,(0,a.Z)({fullWidth:"fullWidth"===be,indicator:o&&!Re&&ft,selected:o,selectionFollowsFocus:te,onChange:G,textColor:ue,value:t},1!==vt||!1!==fe||e.props.tabIndex?{}:{tabIndex:0}))})),pt=function(){var e={};e.scrollbarSizeListener=Ze?(0,x.jsx)(q,{onChange:st,className:(0,s.Z)(Me.scrollableX,Me.hideScrollbar)}):null;var t=Ze&&("auto"===ee&&(je||De)||!0===ee);return e.scrollButtonStart=t?(0,x.jsx)($,(0,a.Z)({slots:{StartScrollButtonIcon:re.StartScrollButtonIcon},slotProps:{startScrollButtonIcon:We},orientation:J,direction:f?"right":"left",onClick:at,disabled:!je},se,{className:(0,s.Z)(Me.scrollButtons,se.className)})):null,e.scrollButtonEnd=t?(0,x.jsx)($,(0,a.Z)({slots:{EndScrollButtonIcon:re.EndScrollButtonIcon},slotProps:{endScrollButtonIcon:Ee},orientation:J,direction:f?"left":"right",onClick:ct,disabled:!De},se,{className:(0,s.Z)(Me.scrollButtons,se.className)})):null,e}();return(0,x.jsxs)(Y,(0,a.Z)({className:(0,s.Z)(Me.root,W),ownerState:Be,ref:t,as:P},me,{children:[pt.scrollButtonStart,pt.scrollbarSizeListener,(0,x.jsxs)(D,{className:Me.scroller,ownerState:Be,style:(0,l.Z)({overflow:Qe.overflow},we?"margin".concat(f?"Left":"Right"):"marginBottom",he?void 0:-Qe.scrollbarWidth),ref:et,children:[(0,x.jsx)(O,{"aria-label":w,"aria-labelledby":g,"aria-orientation":"vertical"===J?"vertical":null,className:Me.flexContainer,ownerState:Be,onKeyDown:function(e){var t=tt.current,o=(0,z.Z)(t).activeElement;if("tab"===o.getAttribute("role")){var r="horizontal"===J?"ArrowLeft":"ArrowUp",n="horizontal"===J?"ArrowRight":"ArrowDown";switch("horizontal"===J&&f&&(r="ArrowRight",n="ArrowLeft"),e.key){case r:e.preventDefault(),X(t,o,H);break;case n:e.preventDefault(),X(t,o,j);break;case"Home":e.preventDefault(),X(t,null,j);break;case"End":e.preventDefault(),X(t,null,H)}}},ref:tt,role:"tablist",children:bt}),Re&&ft]}),pt.scrollButtonEnd]}))})),U=G},85860:function(e,t,o){o.d(t,{m:function(){return l}});var r=o(75878),n=o(21217);function l(e){return(0,n.Z)("MuiTabs",e)}var i=(0,r.Z)("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]);t.Z=i}}]);
//# sourceMappingURL=691.c11d8899.chunk.js.map