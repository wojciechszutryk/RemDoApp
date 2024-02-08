"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[813],{46304:function(e,t,n){n.d(t,{O:function(){return c}});var r=n(1413),i=n(66934),a=n(43896),o=n(80184),c=(0,i.ZP)((function(e){return(0,o.jsx)(a.Z,(0,r.Z)({disableRipple:!0},e))}))((function(e){var t=e.theme;return{textTransform:"none",color:t.palette.secondary.main,fontWeight:800,"&:hover":{color:t.palette.secondary.light},"&.Mui-selected":{color:t.palette.primary.contrastText},"&.Mui-focusVisible":{backgroundColor:t.palette.primary.contrastText}}}))},28163:function(e,t,n){var r=n(1413),i=n(45987),a=n(97552),o=n(72791),c=n(80184),s=["width","children","value","index","key","offsetTop"],u=function(e){var t=e.width,n=e.children,o=e.value,u=e.index,l=e.key,d=e.offsetTop,h=(0,i.Z)(e,s);return(0,c.jsx)(a.E.div,{style:{position:"absolute",top:null!==d&&void 0!==d?d:0},initial:{opacity:0,translateX:0===u?-1*t:t,zIndex:0},exit:{opacity:0,translateX:0===u?t:-1*t,zIndex:1},animate:{opacity:1,translateX:0},transition:{duration:.3},children:(0,c.jsx)("div",(0,r.Z)((0,r.Z)({role:"tabpanel",style:{width:"".concat(t,"px"),padding:"15px"},hidden:o!==u,id:"tabpanel-".concat(u)},h),{},{children:(0,c.jsx)("div",{children:n})}))},l)};t.Z=(0,o.memo)(u)},18813:function(e,t,n){n.r(t),n.d(t,{default:function(){return Le}});var r=n(29439),i=n(95193),a=n(13239),o=n(18073),c=n(46304),s=n(83791),u=n(65762),l=n(14398),d=n(56196),h=n(50525),x=n(86426),f=n(72791),p=n(39230),Z=n(57689),v=n(28163),j=n(90493),m=n(94721),g=n(22885),w=n(81131),b=n(20653),C=n(56125),y=n(66905),k=n(34855),R=n(33093),S=n(1413),U=n(13368),E=n(43416),I=n(20890),D=n(64554),A=n(15021),O=n(41178),P=n(85170),T=n(74165),X=n(15861),F=n(73418),z=n(91797),N=n(25983),B=n(57177),L=n(69061),W=n(96403),G=function(){var e=(0,W.NL)();return(0,f.useCallback)((function(t,n){e.setQueryData([L.CU+x.RR],(function(e){var r=(0,S.Z)((0,S.Z)({},n),t);return e?e.map((function(e){return e.id===r.id?r:e})):[r]}))}),[e])},M=function(){var e=(0,W.NL)();return(0,f.useCallback)((function(t,n){e.setQueryData([L.CU+x.RR],(function(e){return e?e.filter((function(e){return e.id!==n})):[]}))}),[e])},Q=n(93433),$=function(){var e=(0,W.NL)();return(0,f.useCallback)((function(t,n,r){e.setQueryData([L.CU+x.RR],(function(e){var i=(0,S.Z)((0,S.Z)({},t),{},{user:n,creator:r});return e?e.findIndex((function(e){return e.id==i.id}))>-1?e:[].concat((0,Q.Z)(e),[i]):[i]}))}),[e])},H=function(){var e=(0,B.D)().setSnackbar,t=(0,k.x)().currentUser,n=$(),r=function(){var e=(0,X.Z)((0,T.Z)().mark((function e(t){var n;return(0,T.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,N.o)(L.CU+(0,L.yz)(t.id)+x.AK),e.abrupt("return",(0,z.sg)(n,{}).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,F.D)((function(e){return r(e)}),{onSuccess:function(e,r){t&&n(e,r,t)},onError:function(t){e({severity:"error",message:null===t||void 0===t?void 0:t.toString()})}})},K=function(){var e=(0,W.NL)();return(0,f.useCallback)((function(t,n){e.setQueryData([L.CU+x.RR],(function(e){var r=(0,S.Z)((0,S.Z)({},n),t);return e?e.map((function(e){return e.id===r.id?r:e})):[r]}))}),[e])},J=n(45987),Y=n(64558),q=n(5479),V=n(3155),_=n(64658),ee=n(72664),te=n(77146),ne=n(80184),re=["state"],ie=function(e){var t=e.state,n=(0,J.Z)(e,re);return(0,ne.jsx)(te.w,(0,S.Z)((0,S.Z)({},n),{},{disableHover:!0,children:function(){switch(t){case P.X.ReOpened:return(0,ne.jsx)(_.Z,{});case P.X.Accepted:return(0,ne.jsx)(q.Z,{});case P.X.Rejected:return(0,ne.jsx)(ee.Z,{});case P.X.Blocked:return(0,ne.jsx)(Y.Z,{});default:return(0,ne.jsx)(V.Z,{})}}()}))},ae=(0,f.memo)(ie),oe={variant:"outlined",color:"secondary"},ce={textAlign:"center"},se=function(e){var t=e.collaborant,n=(0,k.x)().currentUser,r=(0,p.$G)().t,i=function(){var e=(0,k.x)().currentUser,t=(0,B.D)().setSnackbar,n=G();if(!e)throw new Error("No current user");var r=function(){var t=(0,X.Z)((0,T.Z)().mark((function t(n){var r,i;return(0,T.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.id===n.creator.id,i=(0,N.o)(L.CU+(0,L.yz)(r?n.user.id:n.creator.id)+x.AK+x.oy),t.abrupt("return",(0,z.pE)(i,{}).then((function(e){return e.data})));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,F.D)((function(e){return r(e)}),{onSuccess:n,onError:function(e){t({severity:"error",message:null===e||void 0===e?void 0:e.toString()})}})}(),a=function(){var e=(0,k.x)().currentUser,t=(0,B.D)().setSnackbar,n=K();if(!e)throw new Error("No current user");var r=function(){var t=(0,X.Z)((0,T.Z)().mark((function t(n){var r,i;return(0,T.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.id===n.creator.id,i=(0,N.o)(L.CU+(0,L.yz)(r?n.user.id:n.creator.id)+x.AK+x.d),t.abrupt("return",(0,z.pE)(i,{}).then((function(e){return e.data})));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,F.D)((function(e){return r(e)}),{onSuccess:n,onError:function(e){t({severity:"error",message:null===e||void 0===e?void 0:e.toString()})}})}(),o=function(){var e=(0,k.x)().currentUser,t=(0,B.D)().setSnackbar,n=M();if(!e)throw new Error("No current user");var r=function(){var e=(0,X.Z)((0,T.Z)().mark((function e(t){var n;return(0,T.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,N.o)(L.CU+x.RR,(0,x.np)(t)),e.abrupt("return",(0,z.QW)(n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,F.D)((function(e){return r(e)}),{onSuccess:n,onError:function(e){t({severity:"error",message:null===e||void 0===e?void 0:e.toString()})}})}(),c=H(),s=t.creator.id===(null===n||void 0===n?void 0:n.id),u=t.user.id===(null===n||void 0===n?void 0:n.id);if(!s&&!u)return(0,ne.jsx)(ne.Fragment,{});var l=(0,ne.jsx)(ne.Fragment,{});return t.state===P.X.Pending?l=s?(0,ne.jsx)(I.Z,(0,S.Z)((0,S.Z)({},ce),{},{children:r(h.w.WaitingForAcceptance)})):(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(I.Z,(0,S.Z)((0,S.Z)({},ce),{},{children:r(h.w.WaitingForAcceptance)})),(0,ne.jsxs)(D.Z,{sx:{display:"flex",gap:2},children:[(0,ne.jsx)(O.z,(0,S.Z)((0,S.Z)({},oe),{},{onClick:function(){return i.mutate(t)},startIcon:(0,ne.jsx)(ae,{state:P.X.Accepted}),children:r(h.w.Accept)})),(0,ne.jsx)(O.z,(0,S.Z)((0,S.Z)({},oe),{},{onClick:function(){return a.mutate(t)},startIcon:(0,ne.jsx)(ae,{state:P.X.Rejected}),children:r(h.w.Reject)}))]})," "]}):t.state===P.X.ReOpened?l=s?(0,ne.jsx)(I.Z,(0,S.Z)((0,S.Z)({},ce),{},{children:r(h.w.WaitingForAcceptance)})):(0,ne.jsxs)(D.Z,{sx:{display:"flex",gap:2},children:[(0,ne.jsxs)(O.z,(0,S.Z)((0,S.Z)({},oe),{},{onClick:function(){return i.mutate(t)},children:[(0,ne.jsx)(ae,{state:P.X.Accepted}),r(h.w.Accept)]})),(0,ne.jsx)(O.z,(0,S.Z)((0,S.Z)({},oe),{},{onClick:function(){return a.mutate(t)},startIcon:(0,ne.jsx)(ae,{state:P.X.Blocked}),children:r(h.w.Block)}))]}):t.state===P.X.Accepted?l=(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(I.Z,(0,S.Z)((0,S.Z)({},ce),{},{children:r(h.w.AlreadyCollaborant)})),(0,ne.jsx)(O.z,(0,S.Z)((0,S.Z)({},oe),{},{onClick:function(){return o.mutate(t.id)},startIcon:(0,ne.jsx)(U.Z,{}),children:r(h.w.DeleteCollaboration)}))]}):t.state===P.X.Rejected?l=s?(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(I.Z,(0,S.Z)((0,S.Z)({},ce),{},{children:r(h.w.UserRejectedCollaboration)})),(0,ne.jsx)(O.z,(0,S.Z)((0,S.Z)({},oe),{},{onClick:function(){return c.mutate(t.user)},startIcon:(0,ne.jsx)(ae,{state:P.X.ReOpened}),children:r(h.w.InviteAgain)}))]}):(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(I.Z,(0,S.Z)((0,S.Z)({},ce),{},{children:r(h.w.YouRejectedButCanAccept)})),(0,ne.jsx)(O.z,(0,S.Z)((0,S.Z)({},oe),{},{onClick:function(){return i.mutate(t)},startIcon:(0,ne.jsx)(ae,{state:P.X.Accepted}),children:r(h.w.Accept)}))]}):t.state===P.X.Blocked&&(l=s?(0,ne.jsx)(I.Z,(0,S.Z)((0,S.Z)({},ce),{},{children:r(h.w.CollaborationBlocked)})):(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(I.Z,(0,S.Z)((0,S.Z)({},ce),{},{children:r(h.w.YouBlockedButCanUnblock)})),(0,ne.jsx)(O.z,(0,S.Z)((0,S.Z)({},oe),{},{onClick:function(){return o.mutate(t.id)},startIcon:(0,ne.jsx)(E.Z,{}),children:r(h.w.Unblock)}))]})),(0,ne.jsx)(A.ZP,{sx:{display:"flex",flexWrap:"wrap",gap:1,justifyContent:"center"},children:l})},ue=(0,f.memo)(se),le=n(66934),de=(0,le.ZP)(A.ZP,{shouldForwardProp:function(e){return"highlighted"!==e}})((function(e){var t=e.highlighted,n=e.theme;return(0,S.Z)({cursor:"pointer"},t&&{borderRadius:10,boxShadow:"inset 0px 0px 0px 1px ".concat(n.palette.secondary.contrastText)})})),he=function(e){var t=e.collaborant,n=(0,f.useState)(!1),i=(0,r.Z)(n,2),a=i[0],o=i[1],c=(0,k.x)().currentUser,s=(0,Z.UO)().collaborationId,u=t.user.id===(null===c||void 0===c?void 0:c.id),l=t.creator.id===(null===c||void 0===c?void 0:c.id);if(!u&&!l)return(0,ne.jsx)(ne.Fragment,{});var d=u?t.creator:t.user;return(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(de,{onClick:function(){o(!a)},highlighted:s==t.id,children:[(0,ne.jsxs)(b.Z,{sx:{position:"relative"},children:[(0,ne.jsx)(y.Z,{userData:d}),(0,ne.jsx)(ae,{state:t.state,sx:{position:"absolute",top:-5,right:5,transform:"scale(0.8)"}})]}),(0,ne.jsx)(R.yW,{primary:d.displayName,secondary:d.email}),a?(0,ne.jsx)(g.Z,{}):(0,ne.jsx)(w.Z,{})]}),(0,ne.jsx)(C.Z,{in:a,timeout:"auto",unmountOnExit:!0,children:(0,ne.jsx)(ue,{collaborant:t})})]})},xe=n(20385),fe=n(15529),pe=function(e){var t=e.handleOpenInviteTab,n=(0,p.$G)().t;return(0,ne.jsx)(fe.Z,{image:(0,ne.jsx)(xe.D,{}),imageStylesOverride:{width:{xs:150},height:{xs:100}},headerText:n(h.w.YouHaveNoCollaborants),actionButton:{children:n(h.w.InviteCollaborants),onClick:function(){return t()}},reversed:!0})},Ze=(0,f.memo)(pe),ve=function(e){var t=e.collaborants,n=e.handleOpenInviteTab;return!t||t.length<1?(0,ne.jsx)(Ze,{handleOpenInviteTab:n}):(0,ne.jsx)(j.Z,{children:t.map((function(e,n){return(0,ne.jsxs)(ne.Fragment,{children:[n>0&&n<t.length-1&&(0,ne.jsx)(m.Z,{}),(0,ne.jsx)(he,{collaborant:e},e.id)]})}))})},je=(0,f.memo)(ve),me=n(13244),ge=n(83199),we=n(57482),be=n(20068),Ce=(0,le.ZP)(I.Z)((function(e){var t=e.theme;return{"& > mark":{backgroundColor:t.palette.primary.contrastText,color:t.palette.primary.main}}})),ye=["text","highlightLength","highlightStartIndex"],ke=function(e){var t=e.text,n=e.highlightLength,r=e.highlightStartIndex,i=(0,J.Z)(e,ye);return(0,ne.jsxs)(Ce,(0,S.Z)((0,S.Z)({},i),{},{children:[t.slice(0,r),(0,ne.jsx)("mark",{children:t.substring(r,r+n)}),t.substring(r+n)]}))},Re=(0,f.memo)(ke),Se=n(29170),Ue=n(50362),Ee=n(4942),Ie=n(12917),De=n(10982),Ae=function(){var e=(0,p.$G)().t;return(0,ne.jsx)(fe.Z,{image:(0,ne.jsx)(De.x,{}),imageStylesOverride:{width:{xs:150},height:{xs:100}},headerText:e(h.w.EmptySearchResults),reversed:!0})},Oe=(0,f.memo)(Ae),Pe=n(49900),Te=(0,le.ZP)(j.Z)({width:"100%",maxWidth:360}),Xe=(0,le.ZP)(Pe.Z)({"& span, & p":{overflow:"hidden",whiteSpace:"norap",textOverflow:"ellipsis"}}),Fe=function(e){var t,n,i=e.userCollaborants,a=(0,f.useState)(""),o=(0,r.Z)(a,2),c=o[0],s=o[1],u=(0,k.x)().currentUser,l=(0,p.$G)().t,d=H(),x=function(e,t){var n=function(){var t=(0,X.Z)((0,T.Z)().mark((function t(){return(0,T.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,z.R1)((0,N.o)(L.CU,void 0,(0,Ee.Z)({},"searchPhrase",e))).then((function(e){return e.data}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(0,Ie.a)([L.CU,e],n,t)}(c,{enabled:!1}),Z=(0,f.useCallback)((0,ge.Z)((function(){x.refetch()}),400),[]);(0,f.useEffect)((function(){c.length>0&&x.isStale&&Z()}),[Z,x.isStale,c]);var v=(0,f.useMemo)((function(){var e=new Map;return i.forEach((function(t){t.creator.id===(null===u||void 0===u?void 0:u.id)?e.set(t.user.id,t):e.set(t.creator.id,t)})),e}),[null===u||void 0===u?void 0:u.id,i]);return(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Se.n,{placeholder:l(h.w.SearchForUser),onChange:function(e){s(e.target.value)}}),x.isFetching?(0,ne.jsx)(we.Z,{sx:{marginTop:"5px"}}):(0,ne.jsx)("div",{style:{marginTop:9}}),x.data&&(null===(t=x.data)||void 0===t?void 0:t.length)>0?(0,ne.jsx)(Te,{children:null===(n=x.data)||void 0===n?void 0:n.map((function(e){var t=v.get(e.id);return t?(0,ne.jsx)(he,{collaborant:t}):(0,ne.jsxs)(A.ZP,{dense:!0,children:[(0,ne.jsx)(b.Z,{children:(0,ne.jsx)(Ue.Z,{userData:e})}),(0,ne.jsx)(Xe,{primary:(0,ne.jsx)(Re,{text:e.displayName,highlightLength:c.length,highlightStartIndex:e.displayName.indexOf(c)}),secondary:(0,ne.jsx)(Re,{text:e.email,highlightLength:c.length,highlightStartIndex:e.email.indexOf(c)})}),e.id!==(null===u||void 0===u?void 0:u.id)&&(0,ne.jsx)(be.Z,{title:l(h.w.InviteUser),children:(0,ne.jsx)("div",{children:(0,ne.jsx)(me.Z,{sx:{cursor:"pointer"},onClick:function(){d.mutate(e)}})})})]},e.id)}))}):(0,ne.jsx)(Oe,{})]})},ze=(0,f.memo)(Fe),Ne=n(64694),Be=function(){var e=(0,u.q)(),t=e.dialogsState.collaborantsDrawer.visible,n=e.dialogsActions.updateCollaborantsDrawer,j=(0,Z.TH)(),m=(0,Z.s0)(),g=(0,l.Z)(t,(function(){n({visible:!1}),j.pathname.includes(x.RR)&&m(d.i.HomePage.path)})),w=(0,r.Z)(g,2),b=w[0],C=w[1],y=(0,i.Z)("(max-width:500px)")?300:450,k=(0,f.useState)(0),S=(0,r.Z)(k,2),U=S[0],E=S[1],I=(0,Ne.f)(),D=(0,p.$G)().t;if(I.isLoading)return(0,ne.jsx)(a.Z,{});return(0,ne.jsxs)(R.Jn,{open:b,onClose:C,anchor:"right",children:[(0,ne.jsx)(R.nR,{style:{width:"".concat(y,"px"),zIndex:1},children:(0,ne.jsxs)(o.Z,{value:U,onChange:function(e,t){E(t)},children:[(0,ne.jsx)(c.O,{label:D(h.w.Collaborants),value:0,id:"CollaborantsList"}),(0,ne.jsx)(c.O,{label:D(h.w.CollaborantsSearch),value:1,id:"CollaborantsSearch"})]})}),(0,ne.jsxs)(s.M,{children:[(0,ne.jsx)(v.Z,{value:0,index:U,width:y,offsetTop:30,children:(0,ne.jsx)(je,{collaborants:I.data||[],handleOpenInviteTab:function(){return E(1)}})},"".concat(U,"-0")),(0,ne.jsx)(v.Z,{value:1,index:U,width:y,offsetTop:50,children:(0,ne.jsx)(ze,{userCollaborants:I.data||[]})},"".concat(U,"-1"))]})]})},Le=(0,f.memo)(Be)},64694:function(e,t,n){n.d(t,{f:function(){return l}});var r=n(74165),i=n(15861),a=n(12917),o=n(91797),c=n(25983),s=n(86426),u=n(69061),l=function(e){var t=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,o.R1)((0,c.o)(u.CU+s.RR)).then((function(e){return e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,a.a)([u.CU+s.RR],t,e)}},33093:function(e,t,n){n.d(t,{Jn:function(){return c},nR:function(){return s},yW:function(){return u}});var r=n(4942),i=n(66934),a=n(73974),o=n(49900),c=(0,i.ZP)(a.ZP)({padding:10}),s=(0,i.ZP)("div")((function(e){var t,n=e.theme;return t={width:"300px"},(0,r.Z)(t,n.breakpoints.up("sm"),{width:"450px"}),(0,r.Z)(t,"borderBottom",1),(0,r.Z)(t,"borderColor","divider"),t})),u=(0,i.ZP)(o.Z)((function(e){var t=e.theme;return{borderBottom:1,borderColor:"divider","& span":(0,r.Z)({width:"158px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.breakpoints.up("sm"),{width:"308px"})}}))},85170:function(e,t,n){n.d(t,{X:function(){return r}});var r=function(e){return e.Pending="PENDING",e.Accepted="ACCEPTED",e.Rejected="REJECTED",e.ReOpened="REOPENED",e.Blocked="BLOCKED",e}({})}}]);
//# sourceMappingURL=813.2d740f33.chunk.js.map