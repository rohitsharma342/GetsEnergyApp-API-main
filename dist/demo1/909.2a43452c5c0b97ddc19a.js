(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[909],{5909:(e,t,n)=>{"use strict";n.r(t),n.d(t,{BannerModule:()=>J});var o=n(8583),i=n(3423),r=n(7237),a=n(7716),s=n(1841),d=n(9765),c=n(2340),g=n(89);const l=`${c.N.apiUrl}`;let u=(()=>{class e{constructor(e,t){var n;this.http=e,this.authService=t,this.listeners=new d.xQ,this.httpHeaders=new s.WM({Authorization:`Bearer ${null===(n=this.authService.getAuthFromLocalStorage())||void 0===n?void 0:n.authToken}`})}listen(){return this.listeners.asObservable()}filter(e){this.listeners.next(e)}getAllBanners(){return this.http.get(`${l}/banners`,{headers:this.httpHeaders})}addBanner(e){return this.http.post(`${l}/banners/create`,e,{headers:this.httpHeaders})}editSingleBanner(e,t){return this.http.patch(`${l}/banners/${e}`,t,{headers:this.httpHeaders})}deleteSingleBanner(e){return this.http.delete(`${l}/banners/${e}`,{headers:this.httpHeaders})}}return e.\u0275fac=function(t){return new(t||e)(a.LFG(s.eN),a.LFG(g.e8))},e.\u0275prov=a.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var h=n(6906),p=n(9699),Z=n(9866),m=n(3679);function f(e,t){if(1&e&&(a.TgZ(0,"option",26),a._uU(1),a.qZA()),2&e){const e=t.$implicit;a.Q6J("value",e.productCode),a.xp6(1),a.Oqu(e.productCode)}}function b(e,t){if(1&e){const e=a.EpF();a.TgZ(0,"div",4),a.TgZ(1,"div",5),a.TgZ(2,"label",6),a._uU(3,"Product Code : "),a.qZA(),a.qZA(),a.TgZ(4,"div",15),a.TgZ(5,"select",23),a.NdJ("ngModelChange",function(t){return a.CHM(e),a.oxw().defaultProduct=t}),a.TgZ(6,"option",24),a._uU(7,"Select Product"),a.qZA(),a.YNc(8,f,2,2,"option",25),a.qZA(),a.qZA(),a.qZA()}if(2&e){const e=a.oxw();a.xp6(5),a.Q6J("ngModel",e.defaultProduct),a.xp6(3),a.Q6J("ngForOf",e.allProducts)}}function C(e,t){if(1&e){const e=a.EpF();a.TgZ(0,"div",4),a.TgZ(1,"div",5),a.TgZ(2,"label",6),a._uU(3,"Category : "),a.qZA(),a.qZA(),a.TgZ(4,"div",15),a.TgZ(5,"select",27),a.NdJ("ngModelChange",function(t){return a.CHM(e),a.oxw().defaultCategory=t}),a.TgZ(6,"option",28),a._uU(7,"Select Category"),a.qZA(),a.TgZ(8,"option",29),a._uU(9,"Cladding Panels"),a.qZA(),a.TgZ(10,"option",30),a._uU(11,"Cladding Mosaic"),a.qZA(),a.TgZ(12,"option",31),a._uU(13,"Cladding Tiles"),a.qZA(),a.qZA(),a.qZA(),a.qZA()}if(2&e){const e=a.oxw();a.xp6(5),a.Q6J("ngModel",e.defaultCategory)}}let v=(()=>{class e{constructor(e,t,n,o,i,r){this.bannerService=e,this.authHttpService=t,this.toast=n,this.spinner=o,this.dialogRef=i,this.data=r,this.defaultCategory="",this.defaultProduct="-1",this.showProductCode="",this.allProducts=[]}ngOnInit(){}selectImage(e){this.spinner.show(),this.newImage=e.target.files[0];const t=new FormData;t.append("newImage",this.newImage),this.authHttpService.uploadSingleImage(t).subscribe(e=>{e.status?(this.newImage=e.imageUrl,this.toast.info("Image uploaded successfully")):this.toast.error(e.message),this.spinner.hide()})}handleChange(e){this.showProductCode=e.target.value}addNewBanner(e){let t={};e.value.bannerImageUrl=this.newImage,t=Object.assign(Object.assign({},e.value),"code"==this.showProductCode?{category:"-1"}:"category"==this.showProductCode?{productCode:"-1"}:{category:"-1",productCode:"-1"}),console.log(t),this.bannerService.addBanner(t).subscribe(e=>{e.status?(this.toast.success(e.message),this.closeModel()):this.toast.error(e.message)},e=>{console.log(e),this.toast.error(e.error.message)})}closeModel(){this.dialogRef.close(),this.bannerService.filter("Added")}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(u),a.Y36(h.U),a.Y36(p._W),a.Y36(Z.t2),a.Y36(r.so),a.Y36(r.WI,8))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-add-banner"]],decls:37,vars:4,consts:[[1,"container","text-center"],[1,"my-3"],[3,"submit"],["form","ngForm"],[1,"row","mt-3"],[1,"col-md-4"],["for",""],[1,"col-md-8","my-3",2,"font-size","13.5px"],[1,"row"],[1,"col-md-5"],["type","radio","ngModel","","name","bannerType","value","code","required","",3,"change"],["type","radio","ngModel","","name","bannerType","value","category","required","",3,"change"],[1,"col-md-3"],["type","radio","ngModel","","name","bannerType","value","none","required","",3,"change"],["class","row mt-3",4,"ngIf"],[1,"col-md-8"],["type","file","ngModel","","name","bannerImageUrl","required","",1,"form-control",3,"change"],[1,"row",2,"margin-top","30px"],[1,"col-md-1"],[1,"d-grid","gap-2","col-10","mx-auto"],["type","submit",1,"btn","btn-success",3,"disabled"],["bdColor","rgba(0, 0, 0, 0.8)","size","medium","color","#fff","type","ball-spin-clockwise",3,"fullScreen"],[2,"color","white"],["name","productCode","required","",1,"form-control",3,"ngModel","ngModelChange"],["value","-1"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["name","category","required","",1,"form-control",3,"ngModel","ngModelChange"],["value",""],["value","0"],["value","1"],["value","2"]],template:function(e,t){if(1&e){const e=a.EpF();a.TgZ(0,"div",0),a._UZ(1,"hr",1),a.TgZ(2,"form",2,3),a.NdJ("submit",function(){a.CHM(e);const n=a.MAs(3);return t.addNewBanner(n)}),a.TgZ(4,"div",4),a.TgZ(5,"div",5),a.TgZ(6,"label",6),a._uU(7,"Banner Type : "),a.qZA(),a.qZA(),a.TgZ(8,"div",7),a.TgZ(9,"div",8),a.TgZ(10,"div",9),a.TgZ(11,"input",10),a.NdJ("change",function(e){return t.handleChange(e)}),a.qZA(),a._uU(12," Product Code "),a.qZA(),a.TgZ(13,"div",5),a.TgZ(14,"input",11),a.NdJ("change",function(e){return t.handleChange(e)}),a.qZA(),a._uU(15," Category "),a.qZA(),a.TgZ(16,"div",12),a.TgZ(17,"input",13),a.NdJ("change",function(e){return t.handleChange(e)}),a.qZA(),a._uU(18," None "),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.YNc(19,b,9,2,"div",14),a.YNc(20,C,14,1,"div",14),a.TgZ(21,"div",4),a.TgZ(22,"div",5),a.TgZ(23,"label",6),a._uU(24,"Upload Image : "),a.qZA(),a.qZA(),a.TgZ(25,"div",15),a.TgZ(26,"input",16),a.NdJ("change",function(e){return t.selectImage(e)}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(27,"div",17),a._UZ(28,"div",18),a.TgZ(29,"div",19),a.TgZ(30,"button",20),a._uU(31,"Submit"),a.qZA(),a.qZA(),a._UZ(32,"div",18),a.qZA(),a.qZA(),a._UZ(33,"hr",1),a.qZA(),a.TgZ(34,"ngx-spinner",21),a.TgZ(35,"p",22),a._uU(36," Loading... "),a.qZA(),a.qZA()}if(2&e){const e=a.MAs(3);a.xp6(19),a.Q6J("ngIf","code"==t.showProductCode),a.xp6(1),a.Q6J("ngIf","category"==t.showProductCode),a.xp6(10),a.Q6J("disabled",!e.valid),a.xp6(4),a.Q6J("fullScreen",!0)}},directives:[m._Y,m.JL,m.F,m._,m.Fj,m.JJ,m.On,m.Q7,o.O5,Z.Ro,m.EJ,m.YN,m.Kr,o.sg],styles:["label[_ngcontent-%COMP%]{font-weight:500;margin-top:10px;font-size:15px}"]}),e})(),A=(()=>{class e{constructor(e,t,n,o){this.toast=e,this.bannerService=t,this.dialogRef=n,this.data=o,this.bannerId=o.bannerId}ngOnInit(){}closeModel(){this.dialogRef.close(),this.bannerService.filter("Deleted")}deleteSingleBanner(){this.bannerService.deleteSingleBanner(this.bannerId).subscribe(e=>{e.status?(this.toast.success(e.message,"",{timeOut:2500,progressBar:!0,progressAnimation:"increasing",positionClass:"toast-top-right"}),this.closeModel()):this.toast.error(e.message,"Error Occured",{timeOut:2500,progressBar:!0,progressAnimation:"increasing",positionClass:"toast-top-right"})},e=>{this.toast.error(e,"Error Occured",{timeOut:2500,progressBar:!0,progressAnimation:"increasing",positionClass:"toast-top-right"})})}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(p._W),a.Y36(u),a.Y36(r.so),a.Y36(r.WI,8))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-del-banner"]],decls:9,vars:0,consts:[[1,"my-2",2,"color","rgb(139, 138, 138)"],[1,"text-center","mt-2",2,"font-size","17px"],[1,"text-center","p-2","m-2"],["mat-raised-button","","id","model-cancel-button",1,"btn","btn-primary","m-4",3,"click"],["mat-raised-button","","id","model-cancel-button",1,"btn","btn-danger","m-4",3,"click"]],template:function(e,t){1&e&&(a._UZ(0,"hr",0),a.TgZ(1,"h6",1),a._uU(2,"Are you sure you want to delete this Banner?"),a.qZA(),a.TgZ(3,"div",2),a.TgZ(4,"button",3),a.NdJ("click",function(){return t.deleteSingleBanner()}),a._uU(5,"Confirm"),a.qZA(),a.TgZ(6,"button",4),a.NdJ("click",function(){return t.closeModel()}),a._uU(7,"Cancel"),a.qZA(),a.qZA(),a._UZ(8,"hr",0))},styles:[""]}),e})();function q(e,t){if(1&e&&(a.TgZ(0,"option",29),a._uU(1),a.qZA()),2&e){const e=t.$implicit;a.Q6J("value",e.productCode),a.xp6(1),a.Oqu(e.productCode)}}function T(e,t){if(1&e){const e=a.EpF();a.TgZ(0,"div",4),a.TgZ(1,"div",5),a.TgZ(2,"label",6),a._uU(3,"Product Code : "),a.qZA(),a.qZA(),a.TgZ(4,"div",15),a.TgZ(5,"select",26),a.NdJ("ngModelChange",function(t){return a.CHM(e),a.oxw().bannerData.productCode=t}),a.TgZ(6,"option",27),a._uU(7,"Select Product"),a.qZA(),a.YNc(8,q,2,2,"option",28),a.qZA(),a.qZA(),a.qZA()}if(2&e){const e=a.oxw();a.xp6(5),a.Q6J("ngModel",e.bannerData.productCode),a.xp6(3),a.Q6J("ngForOf",e.allProducts)}}function w(e,t){if(1&e){const e=a.EpF();a.TgZ(0,"div",4),a.TgZ(1,"div",5),a.TgZ(2,"label",6),a._uU(3,"Category : "),a.qZA(),a.qZA(),a.TgZ(4,"div",15),a.TgZ(5,"select",30),a.NdJ("ngModelChange",function(t){return a.CHM(e),a.oxw().bannerData.category=t}),a.TgZ(6,"option",31),a._uU(7,"Select Category"),a.qZA(),a.TgZ(8,"option",32),a._uU(9,"Cladding Panels"),a.qZA(),a.TgZ(10,"option",33),a._uU(11,"Cladding Mosaic"),a.qZA(),a.TgZ(12,"option",34),a._uU(13,"Cladding Tiles"),a.qZA(),a.qZA(),a.qZA(),a.qZA()}if(2&e){const e=a.oxw();a.xp6(5),a.Q6J("ngModel",e.bannerData.category)}}let _=(()=>{class e{constructor(e,t,n,o,i,r){this.bannerService=e,this.authHttpService=t,this.toast=n,this.spinner=o,this.dialogRef=i,this.data=r,this.defaultCategory="",this.showProductCode="",this.allProducts=[],this.bannerData=r.bannerData,-1==this.bannerData.category&&-1==this.bannerData.productCode?this.showProductCode="none":-1==this.bannerData.category?this.showProductCode="code":-1==this.bannerData.productCode&&(this.showProductCode="category"),console.log(this.bannerData)}ngOnInit(){}selectImage(e){this.spinner.show(),this.newImage=e.target.files[0];const t=new FormData;t.append("newImage",this.newImage),this.authHttpService.uploadSingleImage(t).subscribe(e=>{e.status?(this.newImage=e.imageUrl,this.bannerData.bannerImageUrl=this.newImage,this.toast.info("Image uploaded successfully")):this.toast.error(e.message),this.spinner.hide()})}handleChange(e){this.showProductCode=e.target.value}editBanner(e){let t={};e.value.bannerImageUrl=this.bannerData.bannerImageUrl,t=Object.assign(Object.assign({},e.value),"code"==this.showProductCode?{category:"-1"}:"category"==this.showProductCode?{productCode:"-1"}:{category:"-1",productCode:"-1"}),console.log(t),this.bannerService.editSingleBanner(this.bannerData._id,t).subscribe(e=>{e.status?(this.toast.success(e.message),this.closeModel()):(this.spinner.hide(),this.toast.error(e.message))},e=>{console.log(e),this.spinner.hide(),this.toast.error(e.error.message)})}closeModel(){this.dialogRef.close(),this.bannerService.filter("Added")}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(u),a.Y36(h.U),a.Y36(p._W),a.Y36(Z.t2),a.Y36(r.so),a.Y36(r.WI,8))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-edit-banner"]],decls:41,vars:8,consts:[[1,"container","text-center"],[1,"my-3"],[3,"submit"],["form","ngForm"],[1,"row","mt-3"],[1,"col-md-4"],["for",""],[1,"col-md-8","my-3",2,"font-size","13.5px"],[1,"row"],[1,"col-md-5"],["type","radio","name","bannerType","value","code","required","",3,"ngModel","change","ngModelChange"],["type","radio","name","bannerType","value","category","required","",3,"ngModel","change","ngModelChange"],[1,"col-md-3"],["type","radio","name","bannerType","value","none","required","",3,"ngModel","change","ngModelChange"],["class","row mt-3",4,"ngIf"],[1,"col-md-8"],[1,"col-md-12"],["type","file","ngModel","","name","bannerImageUrl",1,"form-control",3,"change"],[1,"col-md-12","mt-2"],["onerror","this.src='./assets/media/svg/brand-logos/bebo.svg'","alt","",1,"bakImage",3,"src"],[1,"row",2,"margin-top","30px"],[1,"col-md-1"],[1,"d-grid","gap-2","col-10","mx-auto"],["type","submit",1,"btn","btn-success",3,"disabled"],["bdColor","rgba(0, 0, 0, 0.8)","size","medium","color","#fff","type","ball-spin-clockwise",3,"fullScreen"],[2,"color","white"],["name","productCode","required","",1,"form-control",3,"ngModel","ngModelChange"],["value","-1"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["name","category","required","",1,"form-control",3,"ngModel","ngModelChange"],["value",""],["value","0"],["value","1"],["value","2"]],template:function(e,t){if(1&e){const e=a.EpF();a.TgZ(0,"div",0),a._UZ(1,"hr",1),a.TgZ(2,"form",2,3),a.NdJ("submit",function(){a.CHM(e);const n=a.MAs(3);return t.editBanner(n)}),a.TgZ(4,"div",4),a.TgZ(5,"div",5),a.TgZ(6,"label",6),a._uU(7,"Banner Type : "),a.qZA(),a.qZA(),a.TgZ(8,"div",7),a.TgZ(9,"div",8),a.TgZ(10,"div",9),a.TgZ(11,"input",10),a.NdJ("change",function(e){return t.handleChange(e)})("ngModelChange",function(e){return t.showProductCode=e}),a.qZA(),a._uU(12," Product Code "),a.qZA(),a.TgZ(13,"div",5),a.TgZ(14,"input",11),a.NdJ("change",function(e){return t.handleChange(e)})("ngModelChange",function(e){return t.showProductCode=e}),a.qZA(),a._uU(15," Category "),a.qZA(),a.TgZ(16,"div",12),a.TgZ(17,"input",13),a.NdJ("change",function(e){return t.handleChange(e)})("ngModelChange",function(e){return t.showProductCode=e}),a.qZA(),a._uU(18," None "),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.YNc(19,T,9,2,"div",14),a.YNc(20,w,14,1,"div",14),a.TgZ(21,"div",4),a.TgZ(22,"div",5),a.TgZ(23,"label",6),a._uU(24,"Change Image : "),a.qZA(),a.qZA(),a.TgZ(25,"div",15),a.TgZ(26,"div",8),a.TgZ(27,"div",16),a.TgZ(28,"input",17),a.NdJ("change",function(e){return t.selectImage(e)}),a.qZA(),a.qZA(),a.TgZ(29,"div",18),a._UZ(30,"img",19),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(31,"div",20),a._UZ(32,"div",21),a.TgZ(33,"div",22),a.TgZ(34,"button",23),a._uU(35,"Save Changes"),a.qZA(),a.qZA(),a._UZ(36,"div",21),a.qZA(),a.qZA(),a._UZ(37,"hr",1),a.qZA(),a.TgZ(38,"ngx-spinner",24),a.TgZ(39,"p",25),a._uU(40," Loading... "),a.qZA(),a.qZA()}if(2&e){const e=a.MAs(3);a.xp6(11),a.Q6J("ngModel",t.showProductCode),a.xp6(3),a.Q6J("ngModel",t.showProductCode),a.xp6(3),a.Q6J("ngModel",t.showProductCode),a.xp6(2),a.Q6J("ngIf","code"==t.showProductCode),a.xp6(1),a.Q6J("ngIf","category"==t.showProductCode),a.xp6(10),a.s9C("src",t.bannerData.bannerImageUrl,a.LSH),a.xp6(4),a.Q6J("disabled",!e.valid),a.xp6(4),a.Q6J("fullScreen",!0)}},directives:[m._Y,m.JL,m.F,m._,m.Fj,m.Q7,m.JJ,m.On,o.O5,Z.Ro,m.EJ,m.YN,m.Kr,o.sg],styles:["label[_ngcontent-%COMP%]{font-weight:500;margin-top:10px;font-size:15px}.bakImage[_ngcontent-%COMP%]{height:120px;width:140px}"]}),e})();var x=n(2789),M=n(2533);let y=(()=>{class e{transform(e,t){return e?t?(t=t.toLowerCase(),e.filter(function(e){return JSON.stringify(e).toLowerCase().includes(t)})):e:null}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=a.Yjl({name:"bannerFilter",type:e,pure:!0}),e})();function P(e,t){if(1&e){const e=a.EpF();a.TgZ(0,"tr"),a.TgZ(1,"td",25),a.TgZ(2,"b"),a._uU(3),a.qZA(),a.qZA(),a.TgZ(4,"td"),a.TgZ(5,"div",26),a._UZ(6,"img",27),a.qZA(),a.qZA(),a.TgZ(7,"td"),a.TgZ(8,"div",28),a.TgZ(9,"div",29),a.TgZ(10,"a",30),a._uU(11),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(12,"td"),a.TgZ(13,"a",31),a._uU(14),a.qZA(),a.qZA(),a.TgZ(15,"td"),a.TgZ(16,"a",31),a._uU(17),a.ALo(18,"date"),a.qZA(),a.qZA(),a.TgZ(19,"td",21),a.TgZ(20,"a",32),a.NdJ("click",function(){const t=a.CHM(e).$implicit;return a.oxw().editBannerDialog(t)}),a._UZ(21,"span",10),a.qZA(),a.TgZ(22,"a",33),a.NdJ("click",function(){const t=a.CHM(e).$implicit;return a.oxw().deleteBannerDialog(t._id)}),a._UZ(23,"span",10),a.qZA(),a.qZA(),a.qZA()}if(2&e){const e=t.$implicit,n=t.index;a.xp6(3),a.Oqu(n+1),a.xp6(3),a.s9C("src",e.bannerImageUrl,a.LSH),a.xp6(5),a.hij(" ",-1==e.productCode?"NA":e.productCode," "),a.xp6(3),a.hij(" ",-1==e.category?"NA":0==e.category?"Cladding Panels":1==e.category?"Cladding Mosaic":"Cladding Tiles"," "),a.xp6(3),a.hij(" ",a.xi3(18,7,e.creationTimeStamp,"medium")," "),a.xp6(4),a.Q6J("inlineSVG","./assets/media/icons/duotune/art/art005.svg"),a.xp6(2),a.Q6J("inlineSVG","./assets/media/icons/duotune/general/gen027.svg")}}const U=function(e){return{itemsPerPage:8,currentPage:e}},O=[{path:"list",component:(()=>{class e{constructor(e,t,n,o){this.matDialog=e,this.bannerService=t,this.changeDetection=n,this.spinnerService=o,this.filteredStatus="",this.p=1,this.allBanners=[],this.searchName="",this.showSearchIcon=!0,this.bannerService.listen().subscribe(e=>{this.ngOnInit()})}ngOnInit(){this.spinnerService.show(),this.bannerService.getAllBanners().subscribe(e=>{e.status&&(this.allBanners=e.banners,this.changeDetection.detectChanges(),this.spinnerService.hide())})}addBannerDialog(){const e=new r.vA;e.disableClose=!1,e.id="add-banner-component",e.height="395px",e.width="570px",e.panelClass="custom-container1",e.data={},this.matDialog.open(v,e)}editBannerDialog(e){const t=new r.vA;t.disableClose=!1,t.id="edit-banner-component",t.width="570px",t.panelClass="custom-container1",t.data={bannerData:e},this.matDialog.open(_,t)}deleteBannerDialog(e){const t=new r.vA;t.disableClose=!1,t.id="del-banner-component",t.height="190px",t.width="510px",t.panelClass="custom-container",t.data={bannerId:e},this.matDialog.open(A,t)}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(r.uw),a.Y36(u),a.Y36(a.sBO),a.Y36(Z.t2))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-list-banners"]],decls:38,vars:12,consts:[[1,"card","mb-5","mb-xl-8"],[1,"card-header","border-0","pt-5"],[1,"card-title","align-items-start","flex-column"],[1,"card-label","fw-bolder","fs-2","mb-1"],[1,"card-toolbar"],[1,"input-group","mb-3"],[1,"form-group"],[1,"fa","fa-search","form-control-icon","mt-2"],["type","text","placeholder","Search Banner by code",1,"form-control",3,"ngModel","ngModelChange"],[1,"btn","btn-sm","btn-light-primary",3,"click"],[1,"svg-icon","svg-icon-3",3,"inlineSVG"],[1,"card-body","py-3"],[1,"table-responsive"],[1,"table","align-middle","gs-0","gy-4"],[1,"fw-bolder","text-muted","bg-light"],[1,"ps-4","min-w-50px"],[1,"min-w-100px"],[2,"width","290px"],[1,"min-w-90px"],[1,"min-w-70px","rounded-end"],[4,"ngFor","ngForOf"],[1,"text-center"],[3,"pageChange"],["bdColor","rgba(0, 0, 0, 0.8)","size","medium","color","#fff","type","ball-spin-clockwise",3,"fullScreen"],[2,"color","white"],[1,"ps-4"],[1,"symbol","symbol-65px","me-5"],["onerror","this.src='./assets/media/svg/brand-logos/bebo.svg'","alt","",1,"",3,"src"],[1,"d-flex","align-items-center"],[1,"d-flex","justify-content-start","flex-column"],[1,"text-dark","fw-bolder","text-hover-primary","mb-1","fs-6"],[1,"text-dark","fw-bolder","text-hover-primary","d-block","mb-1","fs-6"],[1,"btn","btn-icon","btn-bg-light","btn-active-color-primary","btn-sm","me-1",3,"click"],[1,"btn","btn-icon","btn-bg-light","btn-active-color-primary","btn-sm",3,"click"]],template:function(e,t){1&e&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"h3",2),a.TgZ(3,"span",3),a._uU(4,"All Banners"),a.qZA(),a.qZA(),a.TgZ(5,"div",4),a.TgZ(6,"div",5),a.TgZ(7,"div",6),a._UZ(8,"span",7),a.TgZ(9,"input",8),a.NdJ("ngModelChange",function(e){return t.filteredStatus=e}),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(10,"div",4),a.TgZ(11,"a",9),a.NdJ("click",function(){return t.addBannerDialog()}),a._UZ(12,"span",10),a._uU(13," Add Banner "),a.qZA(),a.qZA(),a.qZA(),a.TgZ(14,"div",11),a.TgZ(15,"div",12),a.TgZ(16,"table",13),a.TgZ(17,"thead"),a.TgZ(18,"tr",14),a.TgZ(19,"th",15),a._uU(20,"S.No."),a.qZA(),a._UZ(21,"th",16),a.TgZ(22,"th",16),a._uU(23,"Product Code"),a.qZA(),a.TgZ(24,"th",17),a._uU(25,"Category"),a.qZA(),a.TgZ(26,"th",18),a._uU(27,"Created On"),a.qZA(),a._UZ(28,"th",19),a.qZA(),a.qZA(),a.TgZ(29,"tbody"),a.YNc(30,P,24,10,"tr",20),a.ALo(31,"paginate"),a.ALo(32,"bannerFilter"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(33,"div",21),a.TgZ(34,"pagination-controls",22),a.NdJ("pageChange",function(e){return t.p=e}),a.qZA(),a.qZA(),a.TgZ(35,"ngx-spinner",23),a.TgZ(36,"p",24),a._uU(37," Loading... "),a.qZA(),a.qZA()),2&e&&(a.xp6(9),a.Q6J("ngModel",t.filteredStatus),a.xp6(3),a.Q6J("inlineSVG","./assets/media/icons/duotune/arrows/arr075.svg"),a.xp6(18),a.Q6J("ngForOf",a.xi3(31,4,a.xi3(32,7,t.allBanners,t.filteredStatus),a.VKq(10,U,t.p))),a.xp6(5),a.Q6J("fullScreen",!0))},directives:[m.Fj,m.JJ,m.On,x.d$,o.sg,M.LS,Z.Ro],pipes:[M._s,y,o.uU],styles:['body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{width:100%;height:100%;margin:0;padding:0;font-family:Open Sans,sans-serif;color:#222}a[_ngcontent-%COMP%]{text-decoration:none}a[_ngcontent-%COMP%], li[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{font-size:14px}.twelve[_ngcontent-%COMP%]{width:100%}.eleven[_ngcontent-%COMP%]{width:91.53%}.ten[_ngcontent-%COMP%]{width:83.06%}.nine[_ngcontent-%COMP%]{width:74.6%}.eight[_ngcontent-%COMP%]{width:66.13%}.seven[_ngcontent-%COMP%]{width:57.66%}.six[_ngcontent-%COMP%]{width:49.2%}.five[_ngcontent-%COMP%]{width:40.73%}.four[_ngcontent-%COMP%]{width:32.26%}.three[_ngcontent-%COMP%]{width:23.8%}.two[_ngcontent-%COMP%]{width:15.33%}.one[_ngcontent-%COMP%]{width:6.866%}.col[_ngcontent-%COMP%]{display:block;float:left;margin:1% 0 1% 1.6%}.col[_ngcontent-%COMP%]:first-of-type{margin-left:0}.container[_ngcontent-%COMP%]{width:100%;max-width:940px;margin:0 auto;position:relative;text-align:center}.cf[_ngcontent-%COMP%]:after, .cf[_ngcontent-%COMP%]:before{content:" ";display:table}.cf[_ngcontent-%COMP%]:after{clear:both}.cf[_ngcontent-%COMP%]{*zoom:1}.pagination[_ngcontent-%COMP%]{padding:30px 0}.pagination[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0;padding:0;list-style-type:none}.pagination[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;padding:10px 18px;color:#222}.p1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:40px;height:40px;line-height:40px;padding:0;text-align:center}.p1[_ngcontent-%COMP%]   a.is-active[_ngcontent-%COMP%]{background-color:#2ecc71;border-radius:100%;color:#fff}.form-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{padding-left:2.375rem}.form-group[_ngcontent-%COMP%]   .form-control-icon[_ngcontent-%COMP%]{position:absolute;z-index:2;display:block;width:2.375rem;line-height:2.375rem;text-align:center;pointer-events:none;color:#aaa}']}),e})()}];let S=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[i.Bz.forChild(O)],i.Bz]}),e})(),J=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[o.ez,x.vi,r.Is,m.u5,m.UX,p.Rh.forRoot(),Z.ef,M.JX,S]]}),e})()}}]);