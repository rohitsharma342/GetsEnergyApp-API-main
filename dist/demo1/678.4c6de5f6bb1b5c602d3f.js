(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[678],{7678:(t,e,n)=>{"use strict";n.r(e),n.d(e,{UserModule:()=>T});var s=n(8583),i=n(3423),o=n(7237),r=n(7716),a=n(7521),c=n(9699),l=n(9866),d=n(3679);let g=(()=>{class t{constructor(t,e,n,s,i){this.userService=t,this.toast=e,this.spinner=n,this.dialogRef=s,this.data=i,this.quoteData=i.quoteData}ngOnInit(){}sendNotification(t){let e=Object.assign(Object.assign({},t.value),{deviceId:this.quoteData.deviceId});console.log(this.quoteData.phone,e),this.userService.sendNotificationToSingleUser(this.quoteData.phone,e).subscribe(t=>{t.status?(this.toast.success(t.message),this.closeModel()):this.toast.error(t.message)},t=>{console.log(t),this.toast.error(t.error.message)})}closeModel(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(r.Y36(a.b),r.Y36(c._W),r.Y36(l.t2),r.Y36(o.so),r.Y36(o.WI,8))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-send-notification-user"]],decls:26,vars:2,consts:[[1,"container","text-center"],[1,"my-3"],[3,"submit"],["form","ngForm"],[1,"row","mt-3"],[1,"col-md-5"],["for",""],[1,"col-md-7"],["type","text","ngModel","","name","title","placeholder","Enter title","required","",1,"form-control"],["ngModel","","name","message","placeholder","Enter message","required","",1,"form-control"],[1,"row",2,"margin-top","30px"],[1,"col-md-1"],[1,"d-grid","gap-2","col-10","mx-auto"],["type","submit",1,"btn","btn-success",3,"disabled"],["bdColor","rgba(0, 0, 0, 0.8)","size","medium","color","#fff","type","ball-spin-clockwise",3,"fullScreen"],[2,"color","white"]],template:function(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"div",0),r._UZ(1,"hr",1),r.TgZ(2,"form",2,3),r.NdJ("submit",function(){r.CHM(t);const n=r.MAs(3);return e.sendNotification(n)}),r.TgZ(4,"div",4),r.TgZ(5,"div",5),r.TgZ(6,"label",6),r._uU(7,"Title : "),r.qZA(),r.qZA(),r.TgZ(8,"div",7),r._UZ(9,"input",8),r.qZA(),r.qZA(),r.TgZ(10,"div",4),r.TgZ(11,"div",5),r.TgZ(12,"label",6),r._uU(13,"Message : "),r.qZA(),r.qZA(),r.TgZ(14,"div",7),r._UZ(15,"textarea",9),r.qZA(),r.qZA(),r.TgZ(16,"div",10),r._UZ(17,"div",11),r.TgZ(18,"div",12),r.TgZ(19,"button",13),r._uU(20,"Send Notification"),r.qZA(),r.qZA(),r._UZ(21,"div",11),r.qZA(),r.qZA(),r._UZ(22,"hr",1),r.qZA(),r.TgZ(23,"ngx-spinner",14),r.TgZ(24,"p",15),r._uU(25," Loading... "),r.qZA(),r.qZA()}if(2&t){const t=r.MAs(3);r.xp6(19),r.Q6J("disabled",!t.valid),r.xp6(4),r.Q6J("fullScreen",!0)}},directives:[d._Y,d.JL,d.F,d.Fj,d.JJ,d.On,d.Q7,l.Ro],styles:["label[_ngcontent-%COMP%]{font-weight:500;margin-top:10px;font-size:15px}"]}),t})();function u(t,e){if(1&t&&(r.TgZ(0,"div",3),r.TgZ(1,"a",4),r._uU(2),r.qZA(),r.qZA()),2&t){const t=e.$implicit;r.xp6(1),r.MGl("routerLink","/assessments/info/",t.assessmentNumber,""),r.xp6(1),r.hij(" ",t.assessmentNumber," ")}}let p=(()=>{class t{constructor(t,e,n){this.routerBtn=t,this.dialogRef=e,this.data=n,this.assessmentList=n.assessmentList,this.userName=n.userName}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)(r.Y36(i.F0),r.Y36(o.so),r.Y36(o.WI,8))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-user-assessment-list"]],decls:6,vars:2,consts:[[1,"container","text-center"],[1,"row"],["class","col-md-12",4,"ngFor","ngForOf"],[1,"col-md-12"],["target","_blank",2,"font-weight","500","font-size","16px","padding-bottom","5px",3,"routerLink"]],template:function(t,e){1&t&&(r.TgZ(0,"div",0),r.TgZ(1,"h3"),r.TgZ(2,"b"),r._uU(3),r.qZA(),r.qZA(),r.TgZ(4,"div",1),r.YNc(5,u,3,2,"div",2),r.qZA(),r.qZA()),2&t&&(r.xp6(3),r.hij("Assessments Created by ",e.userName," : "),r.xp6(2),r.Q6J("ngForOf",e.assessmentList))},directives:[s.sg,i.yS],styles:[""]}),t})();var m=n(5254),h=n(2533),f=n(2789);function Z(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"button",21),r.NdJ("click",function(){return r.CHM(t),r.oxw().searchUser()}),r._UZ(1,"i",22),r.qZA()}}function b(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"button",23),r.NdJ("click",function(){return r.CHM(t),r.oxw().removeSearchedList()}),r._uU(1," X"),r.qZA()}}function _(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"tr"),r.TgZ(1,"td",24),r.TgZ(2,"b"),r._uU(3),r.qZA(),r.qZA(),r.TgZ(4,"td",25),r.TgZ(5,"a",26),r._uU(6),r.ALo(7,"titlecase"),r.qZA(),r.qZA(),r.TgZ(8,"td"),r.TgZ(9,"a",26),r._uU(10),r.qZA(),r.qZA(),r.TgZ(11,"td"),r.TgZ(12,"a",26),r._uU(13),r.ALo(14,"date"),r.qZA(),r.qZA(),r.TgZ(15,"td",27),r.NdJ("click",function(){const e=r.CHM(t).$implicit;return r.oxw().showAssessmentsList(e)}),r.TgZ(16,"a",28),r._uU(17," View \xa0 "),r._UZ(18,"span",29),r.qZA(),r.qZA(),r.TgZ(19,"td",30),r.TgZ(20,"span",31),r.NdJ("click",function(){const e=r.CHM(t).$implicit;return r.oxw().sendNotificationDialog(e._id)}),r._uU(21,"Notification "),r._UZ(22,"span",32),r.qZA(),r.qZA(),r.qZA()}if(2&t){const t=e.$implicit,n=e.index;r.xp6(3),r.Oqu(n+1),r.xp6(3),r.hij(" ",r.lcZ(7,6,t.fullName)," "),r.xp6(4),r.hij(" ",t.email," "),r.xp6(3),r.hij(" ",r.xi3(14,8,t.creationTimeStamp,"medium")," "),r.xp6(5),r.Q6J("inlineSVG","./assets/media/icons/duotune/general/external-alt.svg"),r.xp6(4),r.Q6J("inlineSVG","./assets/media/icons/duotune/general/gen016.svg")}}const A=function(t){return{itemsPerPage:8,currentPage:t}};function v(t,e){1&t&&(r.TgZ(0,"div",19),r._uU(1," *Title is required! "),r.qZA())}function x(t,e){1&t&&(r.TgZ(0,"div",19),r._uU(1," *Message is required! "),r.qZA())}const q=[{path:"list",component:(()=>{class t{constructor(t,e,n,s,i,o){this.matDialog=t,this.userService=e,this.assessmentService=n,this.changeDetection=s,this.spinnerService=i,this.toast=o,this.p=1,this.allUsers=[],this.dummyUsers=[],this.searchName="",this.showSearchIcon=!0}ngOnInit(){this.spinnerService.show(),this.userService.allUsers().subscribe(t=>{t.status&&(this.allUsers=t.users,this.dummyUsers=t.users,this.changeDetection.detectChanges(),this.spinnerService.hide())})}searchUser(){0==this.searchName.length?this.toast.error("Enter valid search string"):(this.showSearchIcon=!1,this.spinnerService.show(),this.userService.getUsersByName({userName:this.searchName}).subscribe(t=>{this.allUsers=t.users,this.changeDetection.detectChanges(),this.spinnerService.hide()}))}removeSearchedList(){this.allUsers=this.dummyUsers,this.searchName="",this.showSearchIcon=!0}sendNotificationDialog(t){const e=new o.vA;e.disableClose=!1,e.id="send-notification-component",e.height="290px",e.width="490px",e.data={userId:t},e.panelClass="custom-container",this.matDialog.open(g,e)}showAssessmentsList(t){this.spinnerService.show(),this.assessmentService.getUserAssessments(t._id.toString()).subscribe(e=>{if(e.status)if(this.spinnerService.hide(),0==e.assessments.length)this.toast.error("No assessment created by this User");else{const n=new o.vA;n.disableClose=!1,n.id="user-assessment-list-component",n.width="460px",n.maxHeight="97vh",n.data={assessmentList:e.assessments,userName:t.fullName},n.panelClass="custom-container-show",this.matDialog.open(p,n)}})}}return t.\u0275fac=function(e){return new(e||t)(r.Y36(o.uw),r.Y36(a.b),r.Y36(m.e),r.Y36(r.sBO),r.Y36(l.t2),r.Y36(c._W))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-list-users"]],decls:34,vars:10,consts:[[1,"card","mb-5","mb-xl-8"],[1,"card-header","border-0","pt-5"],[1,"card-title","align-items-start","flex-column"],[1,"card-label","fw-bolder","fs-2","mb-1"],[1,"card-toolbar"],[1,"input-group","mb-3"],["type","text","name","searchName","placeholder","Search User by name","aria-describedby","button-addon2",1,"form-control",3,"ngModel","ngModelChange"],["class","btn btn-primary btn-outline-secondary","type","button","id","button-addon2",3,"click",4,"ngIf"],["class","btn btn-danger btn-outline-secondary","type","button","id","button-addon2",3,"click",4,"ngIf"],[1,"card-body","py-3"],[1,"table-responsive"],[1,"table","align-middle","gs-0","gy-4"],[1,"fw-bolder","text-muted","bg-light"],[1,"ps-4","min-w-50px"],[1,"min-w-100px","ps-4"],[1,"min-w-90px"],[4,"ngFor","ngForOf"],[1,"text-center"],[3,"pageChange"],["bdColor","rgba(0, 0, 0, 0.8)","size","medium","color","#fff","type","ball-spin-clockwise",3,"fullScreen"],[2,"color","white"],["type","button","id","button-addon2",1,"btn","btn-primary","btn-outline-secondary",3,"click"],[1,"fa","fa-search"],["type","button","id","button-addon2",1,"btn","btn-danger","btn-outline-secondary",3,"click"],[1,"ps-5"],[1,"min-w-70px","ps-4"],[1,"text-dark","fw-bolder","text-hover-primary","d-block","mb-1","fs-6"],[2,"padding-left","20px","cursor","pointer",3,"click"],[1,"fw-bolder","text-hover-primary","d-block","mb-1","fs-6","pl-2",2,"color","rgb(95, 95, 234)"],[1,"svg-icon","svg-icon-3",3,"inlineSVG"],[2,"cursor","pointer"],[1,"badge","badge-light-primary","fs-7","fw-bold",3,"click"],[3,"inlineSVG"]],template:function(t,e){1&t&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.TgZ(2,"h3",2),r.TgZ(3,"span",3),r._uU(4,"All Registered Users"),r.qZA(),r.qZA(),r.TgZ(5,"div",4),r.TgZ(6,"div",5),r.TgZ(7,"input",6),r.NdJ("ngModelChange",function(t){return e.searchName=t}),r.qZA(),r.YNc(8,Z,2,0,"button",7),r.YNc(9,b,2,0,"button",8),r.qZA(),r.qZA(),r.qZA(),r.TgZ(10,"div",9),r.TgZ(11,"div",10),r.TgZ(12,"table",11),r.TgZ(13,"thead"),r.TgZ(14,"tr",12),r.TgZ(15,"th",13),r._uU(16,"S.No."),r.qZA(),r.TgZ(17,"th",14),r._uU(18,"Full Name"),r.qZA(),r.TgZ(19,"th",15),r._uU(20,"Email"),r.qZA(),r.TgZ(21,"th",15),r._uU(22,"Registered On"),r.qZA(),r.TgZ(23,"th",15),r._uU(24,"Assessments"),r.qZA(),r._UZ(25,"th",15),r.qZA(),r.qZA(),r.TgZ(26,"tbody"),r.YNc(27,_,23,11,"tr",16),r.ALo(28,"paginate"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(29,"div",17),r.TgZ(30,"pagination-controls",18),r.NdJ("pageChange",function(t){return e.p=t}),r.qZA(),r.qZA(),r.TgZ(31,"ngx-spinner",19),r.TgZ(32,"p",20),r._uU(33," Loading... "),r.qZA(),r.qZA()),2&t&&(r.xp6(7),r.Q6J("ngModel",e.searchName),r.xp6(1),r.Q6J("ngIf",e.showSearchIcon),r.xp6(1),r.Q6J("ngIf",!e.showSearchIcon),r.xp6(18),r.Q6J("ngForOf",r.xi3(28,5,e.allUsers,r.VKq(8,A,e.p))),r.xp6(4),r.Q6J("fullScreen",!0))},directives:[d.Fj,d.JJ,d.On,s.O5,s.sg,h.LS,l.Ro,f.d$],pipes:[h._s,s.rS,s.uU],styles:['body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{width:100%;height:100%;margin:0;padding:0;font-family:Open Sans,sans-serif;color:#222}a[_ngcontent-%COMP%]{text-decoration:none}a[_ngcontent-%COMP%], li[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{font-size:14px}.twelve[_ngcontent-%COMP%]{width:100%}.eleven[_ngcontent-%COMP%]{width:91.53%}.ten[_ngcontent-%COMP%]{width:83.06%}.nine[_ngcontent-%COMP%]{width:74.6%}.eight[_ngcontent-%COMP%]{width:66.13%}.seven[_ngcontent-%COMP%]{width:57.66%}.six[_ngcontent-%COMP%]{width:49.2%}.five[_ngcontent-%COMP%]{width:40.73%}.four[_ngcontent-%COMP%]{width:32.26%}.three[_ngcontent-%COMP%]{width:23.8%}.two[_ngcontent-%COMP%]{width:15.33%}.one[_ngcontent-%COMP%]{width:6.866%}.col[_ngcontent-%COMP%]{display:block;float:left;margin:1% 0 1% 1.6%}.col[_ngcontent-%COMP%]:first-of-type{margin-left:0}.container[_ngcontent-%COMP%]{width:100%;max-width:940px;margin:0 auto;position:relative;text-align:center}.cf[_ngcontent-%COMP%]:after, .cf[_ngcontent-%COMP%]:before{content:" ";display:table}.cf[_ngcontent-%COMP%]:after{clear:both}.cf[_ngcontent-%COMP%]{*zoom:1}.pagination[_ngcontent-%COMP%]{padding:30px 0}.pagination[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0;padding:0;list-style-type:none}.pagination[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;padding:10px 18px;color:#222}.p1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:40px;height:40px;line-height:40px;padding:0;text-align:center}.p1[_ngcontent-%COMP%]   a.is-active[_ngcontent-%COMP%]{background-color:#2ecc71;border-radius:100%;color:#fff}']}),t})()},{path:"send-notification",component:(()=>{class t{constructor(t,e){this.userService=t,this.toastr=e}ngOnInit(){}onSubmit(t){this.userService.sendNotificationToAllUsers({title:t.value.title,message:t.value.message}).subscribe(e=>{e.status?(this.toastr.info(e.message,"Success",{timeOut:2500,progressBar:!0,progressAnimation:"increasing",positionClass:"toast-top-right"}),t.reset()):this.toastr.error(e.message,"Error Occured",{timeOut:2500,progressBar:!0,progressAnimation:"increasing",positionClass:"toast-top-right"})})}}return t.\u0275fac=function(e){return new(e||t)(r.Y36(a.b),r.Y36(c._W))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-send-notification-all"]],decls:31,vars:3,consts:[[1,"container-fluid","dash_cus"],[1,"container"],[1,"row"],[1,"col-sm-2"],[1,"col-sm-8"],[1,"user_info","px-5"],[1,"col-sm-12"],[3,"ngSubmit"],["form","ngForm"],[1,"form-group","row"],["for","newName",1,"col-md-3","col-form-label"],[1,"col-md-9"],["type","text","name","title","placeholder","Enter Title....","ngModel","","required","",1,"form-control","cus_input"],["titleRef","ngModel"],["class","errorDiv",4,"ngIf"],["type","text","name","message","ngModel","","placeholder","Enter Message....","required","",1,"form-control","cus_input"],["messageRef","ngModel"],[1,"form-group","row","mt-5"],["type","submit",1,"form-control","cus_input_btn",3,"disabled"],[1,"errorDiv"]],template:function(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.TgZ(2,"div",2),r._UZ(3,"div",3),r.TgZ(4,"div",4),r.TgZ(5,"div",5),r.TgZ(6,"div",6),r.TgZ(7,"h2"),r._uU(8,"Send Notification To All Users"),r.qZA(),r.qZA(),r.TgZ(9,"div",6),r.TgZ(10,"form",7,8),r.NdJ("ngSubmit",function(){r.CHM(t);const n=r.MAs(11);return e.onSubmit(n)}),r.TgZ(12,"div",9),r.TgZ(13,"label",10),r._uU(14,"Title"),r.qZA(),r.TgZ(15,"div",11),r._UZ(16,"input",12,13),r.YNc(18,v,2,0,"div",14),r.qZA(),r.qZA(),r.TgZ(19,"div",9),r.TgZ(20,"label",10),r._uU(21,"Message"),r.qZA(),r.TgZ(22,"div",11),r._UZ(23,"input",15,16),r.YNc(25,x,2,0,"div",14),r.qZA(),r.qZA(),r.TgZ(26,"div",17),r._UZ(27,"label",10),r.TgZ(28,"div",11),r.TgZ(29,"button",18),r._uU(30,"Send"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()}if(2&t){const t=r.MAs(11),e=r.MAs(17),n=r.MAs(24);r.xp6(18),r.Q6J("ngIf",(null==e.errors?null:e.errors.required)&&e.touched),r.xp6(7),r.Q6J("ngIf",(null==n.errors?null:n.errors.required)&&n.touched),r.xp6(4),r.Q6J("disabled",!t.valid)}},directives:[d._Y,d.JL,d.F,d.Fj,d.JJ,d.On,d.Q7,s.O5],styles:[".dash_cus[_ngcontent-%COMP%]{margin-top:15px;background:#ebeff2;padding:80px 0 70px}.user_info[_ngcontent-%COMP%]{background:#fff;padding:40px 0;box-shadow:0 8px 16px 0 #0003,0 6px 20px 0 #00000030;overflow:hidden}.user_info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:26px;margin-top:0;font-family:Montserrat,Helvetica,Arial,Lucida,sans-serif!important;padding-bottom:5px;border-bottom:1px solid #ebeff2}input.form-control.cus_input[_ngcontent-%COMP%]{border-radius:0}input.form-control.cus_input[_ngcontent-%COMP%]:focus{box-shadow:none}label.col-md-3.col-form-label[_ngcontent-%COMP%]{font-size:18px;font-weight:400;font-family:Montserrat,Helvetica,Arial,Lucida,sans-serif!important}button.form-control.cus_input_btn[_ngcontent-%COMP%]{background:#0194ca}button.form-control.cus_input_btn[_ngcontent-%COMP%], button[_ngcontent-%COMP%]:disabled.form-control.cus_input_btn{color:#fff;border-radius:0;border-color:#0194ca;font-family:Montserrat,Helvetica,Arial,Lucida,sans-serif!important;cursor:pointer}button[_ngcontent-%COMP%]:disabled.form-control.cus_input_btn{background:#66c7eb}input.form-control.cus_input_btn[_ngcontent-%COMP%]:hover{box-shadow:0 8px 16px 0 #0003,0 6px 20px 0 #00000030}p.membership_detail[_ngcontent-%COMP%]{font-size:18px;font-weight:600;font-family:Montserrat,Helvetica,Arial,Lucida,sans-serif!important;border-bottom:1px solid #ebeff2}p.membership_detail[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:300;margin-left:15px}input.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}.errorDiv[_ngcontent-%COMP%]{color:#cc5151}"]}),t})()}];let M=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[i.Bz.forChild(q)],i.Bz]}),t})(),T=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[s.ez,f.vi,o.Is,d.u5,d.UX,c.Rh.forRoot(),l.ef,h.JX,M]]}),t})()}}]);