"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[313],{51540:function(e,n,t){t.d(n,{Z:function(){return d}});var r=t(66934),i=(0,r.ZP)("div",{shouldForwardProp:function(e){return"spacingTop"!==e&&"spacingBottom"!==e}})((function(e){return{display:"flex",alignItems:"center",width:"100%",height:"20px",marginTop:e.spacingTop,marginBottom:e.spacingBottom}})),o=(0,r.ZP)("div",{shouldForwardProp:function(e){return"color"!==e}})((function(e){var n=e.theme,t=e.color;return{flexGrow:1,height:"9px",borderBottom:"2px solid ".concat(n.palette.primary.contrastText),borderColor:n.palette[t||"primary"].contrastText}})),a=(0,r.ZP)("div",{shouldForwardProp:function(e){return"color"!==e}})((function(e){var n=e.theme,t=e.color;return{paddingLeft:"20px",paddingRight:"20px",color:n.palette[t||"primary"].contrastText}})),s=t(80184),d=function(e){var n=e.text,t=e.variant,r=e.spacingBottom,d=e.spacingTop;return(0,s.jsxs)(i,{spacingBottom:r,spacingTop:d,children:[(0,s.jsx)(o,{color:t}),(0,s.jsx)(a,{color:t,children:n}),(0,s.jsx)(o,{color:t})]})}},64694:function(e,n,t){t.d(n,{f:function(){return l}});var r=t(74165),i=t(15861),o=t(12917),a=t(91797),s=t(25983),d=t(86426),c=t(69061),l=function(e){var n=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,a.R1)((0,s.o)(c.CU+d.RR)).then((function(e){return e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,o.a)([c.CU+d.RR],n,e)}},97938:function(e,n,t){t.d(n,{Z:function(){return D}});var r=t(1413),i=t(93433),o=t(45987),a=t(29170),s=t(34855),d=t(50525),c=t(85170),l=t(72791),u=t(61134),v=t(39230),p=t(64694),f=t(66934),x=t(81918),m=t(25286),h=(0,f.ZP)(x.Z)((function(e){var n=e.theme;return{zIndex:1,backgroundColor:n.palette.primary.main,color:n.palette.secondary.contrastText,margin:"0 2px"}})),Z=(0,f.ZP)(m.Z)({"& .MuiFormControl-root":{height:"unset"}}),g=t(80184),j=["name","defaultValues"],w=function(e){var n=e.name,t=e.defaultValues,f=(0,o.Z)(e,j),x=(0,v.$G)().t,m=(0,u.qo)(),w=(0,u.Gc)().setValue,D=m[n],y=(0,s.x)().currentUser,C=(0,p.f)(),b=(0,l.useMemo)((function(){var e,n=new Set;return null===(e=C.data)||void 0===e||e.forEach((function(e){e.state===c.X.Accepted&&(n.add(e.creator.email),n.add(e.user.email))})),Array.from(n)}),[C.data]),R=(0,l.useMemo)((function(){return Array.from(new Set([].concat((0,i.Z)(b),(0,i.Z)(t.map((function(e){return e.email}))))))}),[b,t]),A=(0,l.useMemo)((function(){var e,n=new Map;return null===(e=C.data)||void 0===e||e.forEach((function(e){e.state===c.X.Accepted&&(n.set(e.creator.email,e.creator),n.set(e.user.email,e.user))})),t.forEach((function(e){n.set(e.email,e)})),n}),[t,C.data]),I=null===D||void 0===D?void 0:D.map((function(e){return e.email}));return(0,g.jsx)(Z,(0,r.Z)((0,r.Z)({},f),{},{renderTags:function(){return null===D||void 0===D?void 0:D.map((function(e,t){return(0,g.jsx)(h,{label:e.email,disabled:e.email===(null===y||void 0===y?void 0:y.email)||!(!e.email||b.includes(e.email)),onDelete:function(){var t=null===D||void 0===D?void 0:D.filter((function(n){return n!==e}));w(n,t)}},t)}))},multiple:!0,options:R.filter((function(e){return!(null!==I&&void 0!==I&&I.includes(e))})),onChange:function(e,t){var r=[];t.forEach((function(e){var n=A.get(e);n&&r.push(n)})),w(n,r)},defaultValue:t.map((function(e){return e.email})),renderInput:function(e){return(0,g.jsx)(a.n,(0,r.Z)((0,r.Z)({},e),{},{InputLabelProps:void 0}))},noOptionsText:x(d.w.NoCollaborantOption)}))},D=(0,l.memo)(w)},1313:function(e,n,t){t.r(n),t.d(n,{default:function(){return we}});var r=t(1413),i=t(29439),o=t(41178),a=t(16606),s=t(65762),d=t(14398),c=t(38153),l=t(50525),u=t(74165),v=t(15861),p=t(73418),f=t(91797),x=t(25983),m=t(87050),h=t(56607),Z=t(89845),g=t(5698),j=t(72791),w=t(61134),D=t(39230),y=t(81131),C=t(90580),b=t(55818),R=t(20068),A=t(3721),I=t(20890),S=t(1638),k=t(51540),T=t(42027),P=t(97938),L=t(80184),G=function(e){var n=e.expandedAccordion,t=e.handleAccordionChange,r=e.defaultFormValues,i=(0,D.$G)().t;return(0,L.jsxs)(S.s,{expanded:"access"===n,onChange:t("access"),disableGutters:!0,children:[(0,L.jsxs)(b.Z,{expandIcon:(0,L.jsx)(y.Z,{}),children:[(0,L.jsx)(R.Z,{title:i(l.w.ManageAccessReminderDescription),children:(0,L.jsx)("div",{children:(0,L.jsx)(C.Z,{sx:{transform:"translate(-5px, -3px)"}})})}),i(l.w.ManageAccess)]}),(0,L.jsx)(A.Z,{children:(0,L.jsxs)(T.Gq,{children:[(0,L.jsx)(k.Z,{text:i(l.w.ManageAccess),spacingBottom:-5,spacingTop:-5}),(0,L.jsx)(I.Z,{children:i(l.w.CurrentOwners)}),(0,L.jsx)(P.Z,{name:"assignedOwners",defaultValues:null===r||void 0===r?void 0:r.assignedOwners}),(0,L.jsx)(I.Z,{children:i(l.w.CurrentUsers)}),(0,L.jsx)(P.Z,{name:"assignedUsers",defaultValues:null===r||void 0===r?void 0:r.assignedUsers})]})})]})},O=(0,j.memo)(G),M=t(60383),V=t(38086),E=t(35362),z=t(5878),B=function(e){var n=e.expandedAccordion,t=e.handleAccordionChange,r=e.editReminderData,i=e.defaultFormValues,a=e.onClose,s=(0,D.$G)().t,d=function(){var e=(0,z.Z)(),n=function(){var e=(0,v.Z)((0,u.Z)().mark((function e(n){var t,r,i;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.todoListId,r=n.taskId,i=(0,x.o)(E.kJ+(0,E.qB)(t)+m.cB+(0,V.p8)(r)),e.abrupt("return",(0,f.QW)(i).then((function(e){return e.data})));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,p.D)(n,{onSuccess:e})}();return(0,L.jsxs)(S.s,{expanded:"delete"===n,onChange:t("delete"),disableGutters:!0,children:[(0,L.jsxs)(b.Z,{expandIcon:(0,L.jsx)(y.Z,{}),children:[(0,L.jsx)(R.Z,{title:s(l.w.DeleteReminderDescription),children:(0,L.jsx)("div",{children:(0,L.jsx)(M.Z,{sx:{transform:"translate(-4px, -4px)"}})})}),s(l.w.DeleteReminder)]}),(0,L.jsxs)(A.Z,{sx:{display:"flex",flexDirection:"column",gap:"10px",justifyContent:"center"},children:[(0,L.jsx)(I.Z,{children:s(l.w.DeleteReminderWarning)}),(0,L.jsx)(o.z,{onClick:function(){var e,n,t=null!==(e=null===i||void 0===i?void 0:i.todoListId)&&void 0!==e?e:null===r||void 0===r?void 0:r.todoListId,o=null!==(n=null===r||void 0===r?void 0:r.taskId)&&void 0!==n?n:null===i||void 0===i?void 0:i.taskId;t&&(d.mutate({todoListId:t,taskId:o}),a())},children:s(l.w.DeleteReminder)})]})]})},F=(0,j.memo)(B),q=t(85108),N=t(94141),U=t(65340),J=function(e){var n,t,r=e.expandedAccordion,i=e.handleAccordionChange,o=e.editReminderData,a=e.onSubmit,s=(0,D.$G)().t,d=(0,w.Gc)(),c=d.handleSubmit,u=d.control,v=d.formState.errors,p=d.setFocus,f=(!!v.name||!!v.text)&&"general"!==r;return(0,j.useEffect)((function(){p("name")}),[p]),(0,L.jsxs)(S.s,{expanded:"general"===r,onChange:i("general"),disableGutters:!0,children:[(0,L.jsxs)(b.Z,{expandIcon:(0,L.jsx)(y.Z,{}),children:[(0,L.jsx)(R.Z,{title:s(l.w.GeneralInfoReminderDescription),children:(0,L.jsx)("div",{children:(0,L.jsx)(q.Z,{sx:{transform:"translate(-4px, -2px)"},color:f?"error":void 0})})}),(0,L.jsx)(I.Z,{children:s(l.w.GeneralInfo)})]}),(0,L.jsx)(A.Z,{children:(0,L.jsxs)(T.Gq,{onSubmit:c(a),children:[(0,L.jsx)(k.Z,{text:o?"".concat(s(l.w.EditReminder),": ").concat(o.text):s(l.w.CreateReminder),spacingBottom:15,spacingTop:-5}),(0,L.jsx)(N.M,{autoFocus:!0,name:"name",required:!0,error:!!v.name,helperText:"required"===(null===(n=v.name)||void 0===n?void 0:n.type)&&s(l.w.FieldRequired),control:u,placeholder:s(l.w.ReminderName)}),(0,L.jsx)(N.M,{name:"text",required:!0,error:!!v.text,helperText:"required"===(null===(t=v.text)||void 0===t?void 0:t.type)&&s(l.w.FieldRequired),control:u,placeholder:s(l.w.ReminderDescription)}),(0,L.jsx)(U.Z,{})]})})]})},$=(0,j.memo)(J),H=t(70002),W=t(9685),X=t(53201),Q=function(){var e=(0,w.qo)(),n=(0,D.$G)().t,t=e.startDate,r=e.finishDate,i={year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"};return(0,L.jsxs)(L.Fragment,{children:[t&&(0,L.jsxs)(I.Z,{sx:{display:"flex",justifyContent:"space-between"},children:[(0,L.jsxs)("span",{children:[n(l.w.StartDate),":"]}),(0,L.jsx)("strong",{style:{fontWeight:800},children:new Date(t).toLocaleString("pl-PL",i)})]}),r&&(0,L.jsxs)(I.Z,{sx:{display:"flex",justifyContent:"space-between"},children:[(0,L.jsxs)("span",{children:[n(l.w.FinishDate),":"]}),(0,L.jsx)("strong",{style:{fontWeight:800},children:new Date(r).toLocaleString("pl-PL",i)})]})]})},K=(0,j.memo)(Q),Y=function(e){var n=e.expandedAccordion,t=e.handleAccordionChange,r=(0,D.$G)().t,i=(0,w.Gc)().control;return(0,L.jsxs)(S.s,{expanded:"notify"===n,onChange:t("notify"),disableGutters:!0,children:[(0,L.jsxs)(b.Z,{expandIcon:(0,L.jsx)(y.Z,{}),children:[(0,L.jsx)(R.Z,{title:r(l.w.SetNotificationDescription),children:(0,L.jsx)("div",{children:(0,L.jsx)(H.Z,{sx:{transform:"translate(-3px, -4px)"}})})}),r(l.w.SetNotification)]}),(0,L.jsx)(A.Z,{children:(0,L.jsxs)(T.Gq,{children:[(0,L.jsx)(k.Z,{text:r(l.w.SetNotification),spacingBottom:5,spacingTop:-5}),(0,L.jsx)(K,{}),(0,L.jsx)(W.x,{name:"notify",control:i,label:r(l.w.NotifyMe)}),(0,L.jsx)(X.Z,{control:i})]})})]})},_=(0,j.memo)(Y),ee=t(88093),ne=t(93433),te=t(84206),re=t(23786),ie=t(57064),oe=t(49900),ae=t(98195),se=t(61428),de=t(4942),ce=t(12917),le=t(47797),ue=function(){var e=function(e){var n=function(){var n=(0,v.Z)((0,u.Z)().mark((function n(){return(0,u.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,f.R1)((0,x.o)(E.kJ,"",e?(0,de.Z)({},E.Fq,"true"):void 0)).then((function(e){return e.data}));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,ce.a)([E.kJ,e?E.Fq:""],n)}(!0),n=(0,D.$G)().t,t=(0,j.useMemo)((function(){var n,t=new Map;return null===(n=e.data)||void 0===n||n.forEach((function(e){t.set(e.id,{name:e.name,members:Array.from(new Set([].concat((0,ne.Z)(e.assignedOwners.map((function(e){return e.displayName}))),(0,ne.Z)(e.assignedUsers.map((function(e){return e.displayName})))))).join(", ")})})),t}),[e.data]);return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(k.Z,{text:n(l.w.ScopeChoose),spacingBottom:15}),(0,L.jsx)(w.Qr,{name:"todoListId",render:function(r){var i,o,a=r.field,s=a.onChange,d=a.value;return(0,L.jsxs)(T.Wf,{style:{height:"54px"},children:[!d||"reminder"===d&&(0,L.jsx)(le.Z,{}),(0,L.jsxs)(ae.P,{label:n(l.w.Reminder),value:d,renderValue:function(e){var r;return(null===(r=t.get(e))||void 0===r?void 0:r.name)||n(l.w.Reminder)},onChange:function(e){var n;s(null===(n=e.target)||void 0===n?void 0:n.value)},children:[(0,L.jsxs)(re.Z,{value:"reminder",children:[(0,L.jsx)(ie.Z,{children:(0,L.jsx)(te.Z,{color:"secondary"})}),(0,L.jsx)(oe.Z,{secondaryTypographyProps:{style:{whiteSpace:"normal"}},primary:n(l.w.Reminder),secondary:n(l.w.ReminderInfo)})]},"reminder"),(0,L.jsx)(k.Z,{text:n(l.w.OrChooseTodoList)}),null!==(i=null===(o=e.data)||void 0===o?void 0:o.map((function(e){var n;return(0,L.jsxs)(re.Z,{value:e.id,children:[(0,L.jsx)(ie.Z,{children:(0,L.jsx)(se.Z,{type:e.icon})}),(0,L.jsx)(oe.Z,{primaryTypographyProps:{style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},secondaryTypographyProps:{style:{whiteSpace:"normal"}},primary:e.name,secondary:(null===(n=t.get(e.id))||void 0===n?void 0:n.members)||""})]},e.id)})))&&void 0!==i?i:[]]})]})}})]})},ve=(0,j.memo)(ue),pe=function(e){var n=e.expandedAccordion,t=e.handleAccordionChange,r=(0,D.$G)().t;return(0,L.jsxs)(S.s,{expanded:"scope"===n,onChange:t("scope"),disableGutters:!0,children:[(0,L.jsxs)(b.Z,{expandIcon:(0,L.jsx)(y.Z,{}),children:[(0,L.jsx)(R.Z,{title:r(l.w.ScopeDescription),children:(0,L.jsx)("div",{children:(0,L.jsx)(ee.Z,{sx:{transform:"translate(-5px, -3px)"}})})}),r(l.w.ScopeChoose)]}),(0,L.jsx)(A.Z,{children:(0,L.jsx)(ve,{})})]})},fe=(0,j.memo)(pe),xe=t(97892),me=t.n(xe),he=t(62683),Ze=t(66355),ge=function(e,n){var t,r,i,o=null!==(t=null===e||void 0===e?void 0:e.startDate)&&void 0!==t?t:null===n||void 0===n?void 0:n.startDate,a=null!==(r=null===e||void 0===e?void 0:e.notifyDate)&&void 0!==r?r:null===n||void 0===n?void 0:n.notifyDate,s=a?new Date(a):o?new Date(new Date(o).getTime()-9e5):null,d=null!==(i=null===e||void 0===e?void 0:e.finishDate)&&void 0!==i?i:null===n||void 0===n?void 0:n.finishDate,c=s?(0,Ze.R)(new Date(s),o&&new Date(o),d&&new Date(d)):null;return{text:(null===e||void 0===e?void 0:e.text)||(null===n||void 0===n?void 0:n.text)||"",name:(null===e||void 0===e?void 0:e.name)||(null===n||void 0===n?void 0:n.name)||"",icon:(null===e||void 0===e?void 0:e.icon)||(null===n||void 0===n?void 0:n.icon)||he.J.Reminder,startDate:(null===e||void 0===e?void 0:e.startDate)||(null===n||void 0===n?void 0:n.startDate)||me()().toDate(),finishDate:(null===e||void 0===e?void 0:e.finishDate)||(null===n||void 0===n?void 0:n.finishDate)||me()().add(1,"hour").toDate(),assignedOwners:(null===e||void 0===e?void 0:e.assignedOwners)||(null===n||void 0===n?void 0:n.assignedOwners)||[],assignedUsers:(null===e||void 0===e?void 0:e.assignedUsers)||(null===n||void 0===n?void 0:n.assignedUsers)||[],todoListId:(null===e||void 0===e?void 0:e.todoListId)||(null===n||void 0===n?void 0:n.todoListId)||"reminder",notify:!!a,minsAccordingToTimePoint:(null===c||void 0===c?void 0:c.minsAccordingToTimePoint)||15,beforeOrAfter:(null===c||void 0===c?void 0:c.beforeOrAfter)||"Before",timePoint:(null===c||void 0===c?void 0:c.timePoint)||"Start",notifyDate:s}},je=function(){var e=(0,s.q)(),n=e.dialogsState.reminderDialog,t=n.editReminderData,y=n.visible,C=n.defaultData,b=e.dialogsActions.updateReminderDialog,R=function(){var e=(0,Z.Z)(),n=function(){var e=(0,v.Z)((0,u.Z)().mark((function e(n){var t;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,x.o)(m.cB),e.abrupt("return",(0,f.sg)(t,(0,h.J)(n)).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,p.D)(n,{onSuccess:e})}(),A=(0,g.O)(),I=(0,D.$G)().t,S=(0,d.Z)(y,(function(){return b(c.g2)})),k=(0,i.Z)(S,2),T=k[0],P=k[1],G=(0,j.useState)("general"),M=(0,i.Z)(G,2),V=M[0],E=M[1],z=function(e){return function(){E(V===e?"":e)}},B=ge(C,t),q=(0,w.cI)({defaultValues:B}),N=function(e){var n=e.assignedOwners.map((function(e){return e.email})),i=e.assignedUsers.map((function(e){return e.email}));if(t)A.mutate({todoListId:t.todoListId,taskId:t.taskId,data:(0,r.Z)((0,r.Z)({},e),{},{assignedOwners:n,assignedUsers:i})});else{if(!e.startDate||!e.finishDate||!e.text||!e.icon)return;var o=(0,r.Z)((0,r.Z)({},e),{},{assignedOwners:n,assignedUsers:i,text:e.text,name:e.text,icon:e.icon,startDate:e.startDate,finishDate:e.finishDate});R.mutate(o)}b(c.g2),P()};return(0,L.jsx)(a.Z,{open:T,onClose:P,children:(0,L.jsxs)(w.RV,(0,r.Z)((0,r.Z)({},q),{},{children:[(0,L.jsx)($,{expandedAccordion:V,handleAccordionChange:z,editReminderData:t,onSubmit:N}),!t&&(0,L.jsx)(fe,{expandedAccordion:V,handleAccordionChange:z}),(0,L.jsx)(O,{expandedAccordion:V,handleAccordionChange:z,defaultFormValues:B}),(0,L.jsx)(_,{expandedAccordion:V,handleAccordionChange:z}),!!t&&(0,L.jsx)(F,{expandedAccordion:V,onClose:P,handleAccordionChange:z,defaultFormValues:B,editReminderData:t}),(0,L.jsx)(o.z,{onClick:q.handleSubmit(N),sx:{margin:"0 auto"},children:I(t?l.w.Save:l.w.CreateReminder)})]}))})},we=(0,j.memo)(je)},47797:function(e,n,t){t.d(n,{Z:function(){return x}});var r=t(29439),i=t(13400),o=t(62683),a=t(61428),s=t(72791),d=t(61134),c=t(66934),l=t(15473),u=(0,c.ZP)("div")((function(e){return{display:"flex",flexWrap:"wrap",gap:"10px",padding:10,borderRadius:10,background:e.theme.palette.primary.main}})),v=(0,c.ZP)(l.ZP)((function(e){return{"& .MuiPopover-paper":{borderRadius:10,background:e.theme.palette.primary.main}}})),p=t(80184),f=function(){var e=(0,s.useState)(null),n=(0,r.Z)(e,2),t=n[0],c=n[1],l=(0,d.Gc)(),f=l.setValue,x=l.getValues,m=function(){return c(null)};return(0,p.jsxs)("div",{children:[(0,p.jsx)(i.Z,{onClick:function(e){c(e.currentTarget)},children:(0,p.jsx)(a.Z,{type:x("icon")})}),(0,p.jsx)(v,{open:Boolean(t),anchorEl:t,onClose:m,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},children:(0,p.jsx)(u,{children:Object.values(o.J).map((function(e){return(0,p.jsx)(a.Z,{type:e,onClick:function(){f("icon",e),m()}},e)}))})})]})},x=(0,s.memo)(f)},5698:function(e,n,t){t.d(n,{O:function(){return p}});var r=t(74165),i=t(15861),o=t(73418),a=t(91797),s=t(25983),d=t(87050),c=t(56607),l=t(38086),u=t(35362),v=t(90769),p=function(){var e=(0,v.Z)(),n=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(n){var t,i,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.todoListId,i=n.taskId,o=n.data,e.abrupt("return",(0,a.pE)((0,s.o)(u.kJ+(0,u.qB)(t)+d.cB+(0,l.p8)(i)),(0,c.J)(o)).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,o.D)(n,{onSuccess:e})}},85170:function(e,n,t){t.d(n,{X:function(){return r}});var r=function(e){return e.Pending="PENDING",e.Accepted="ACCEPTED",e.Rejected="REJECTED",e.ReOpened="REOPENED",e.Blocked="BLOCKED",e}({})},60383:function(e,n,t){var r=t(64836);n.Z=void 0;var i=r(t(45649)),o=t(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteForever");n.Z=a},84206:function(e,n,t){var r=t(64836);n.Z=void 0;var i=r(t(45649)),o=t(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M12 22H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2v6h-2v-2H5v10h7v2zm10.13-5.01.71-.71c.39-.39.39-1.02 0-1.41l-.71-.71a.9959.9959 0 0 0-1.41 0l-.71.71 2.12 2.12zm-.71.71-5.3 5.3H14v-2.12l5.3-5.3 2.12 2.12z"}),"EditCalendar");n.Z=a},70002:function(e,n,t){var r=t(64836);n.Z=void 0;var i=r(t(45649)),o=t(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"}),"NotificationsNone");n.Z=a},90580:function(e,n,t){var r=t(64836);n.Z=void 0;var i=r(t(45649)),o=t(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"}),"Share");n.Z=a},88093:function(e,n,t){var r=t(64836);n.Z=void 0;var i=r(t(45649)),o=t(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"}),"Widgets");n.Z=a}}]);
//# sourceMappingURL=313.d3ed59fc.chunk.js.map