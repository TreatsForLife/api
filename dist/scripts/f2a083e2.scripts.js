var Utils={isBchmn:document.location.host.search("bchmn.com")>-1,isHeroku:document.location.host.search("herokuapp.com")>-1,findIdInArray:function(a,b,c){"undefined"==typeof c&&(c="_id");for(var d,e=0;d=a[e];e++)if(d[c]==b)return d;return!1}},Consts={api_root:Utils.isBchmn?"http://tfl.bchmn.com/":Utils.isHeroku?"http://treatsforlife-api.herokuapp.com/":"http://localhost:3000/"};Array.prototype.findById=function(a,b){"undefined"==typeof b&&(b="_id");for(var c,d=0;c=this[d];d++)if(c[b]==a)return c;return!1},angular.module("adminApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/users",{templateUrl:"views/users.html",controller:"UsersCtrl"}).when("/media",{templateUrl:"views/media.html",controller:"MediaCtrl"}).when("/media/:id",{templateUrl:"views/media.html",controller:"MediaCtrl"}).when("/kennels",{templateUrl:"views/kennels.html",controller:"KennelsCtrl"}).when("/pets",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).when("/pets/:id",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).when("/pet/:id",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).when("/treats",{templateUrl:"views/treats.html",controller:"TreatsCtrl"}).when("/donations",{templateUrl:"views/donations.html",controller:"DonationsCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("adminApp").factory("Instagram",["$http",function(a){var b="d9c1142d0ac14d1ea5a45bc8478006a4";return{get:function(c,d,e){var f={params:{client_id:b,count:d,callback:"JSON_CALLBACK"}};e&&(f.params.min_tag_id=e);var g=a.jsonp("https://api.instagram.com/v1/tags/"+c+"/media/recent",f,function(){});return console.log(g),g}}}]),angular.module("adminApp").factory("Media",["$resource",function(a){return a(Consts.api_root+"media/:id",{},{all:{method:"GET",params:{},isArray:!0},last:{method:"GET",params:{id:"last"},isArray:!1},query:{method:"GET",params:{},isArray:!1},create:{method:"POST"},update:{method:"PUT",params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("adminApp").factory("Pets",["$resource",function(a){return a(Consts.api_root+"pet/:id",{},{all:{method:"GET",params:{},isArray:!0},query:{method:"GET",params:{},isArray:!1},create:{method:"POST"},update:{method:"PUT",params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("adminApp").factory("Kennels",["$resource",function(a){return a(Consts.api_root+"kennel/:id",{},{all:{method:"GET",params:{},isArray:!0},query:{method:"GET",params:{},isArray:!1},create:{method:"POST"},update:{method:"PUT",params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("adminApp").factory("Treats",["$resource",function(a){return a(Consts.api_root+"treat/:id",{},{all:{method:"GET",params:{},isArray:!0},query:{method:"GET",params:{},isArray:!1},create:{method:"POST",params:{force:"1"}},update:{method:"PUT",params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("adminApp").factory("Users",["$resource",function(a){return a(Consts.api_root+"user/:id",{},{all:{method:"GET",params:{},isArray:!0},query:{method:"GET",params:{},isArray:!1},create:{method:"POST",params:{force:"1"}},update:{method:"PUT",params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("adminApp").factory("Donations",["$resource",function(a){return a(Consts.api_root+"donation/:id",{},{all:{method:"GET",params:{},isArray:!0},query:{method:"GET",params:{},isArray:!1},create:{method:"POST",params:{force:"1"}},update:{method:"PUT",params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("adminApp").directive("jsonExplorer",["$http",function(){return{restrict:"E",scope:{jsonData:"@"},link:function(a,b,c){c.$observe("jsonData",function(a){function c(a){var b=a.target,c=b.parentNode.getElementsByClassName("collapsible");if(c.length)if(c=c[0],"none"==c.style.display){var d=c.parentNode.getElementsByClassName("ellipsis")[0];c.parentNode.removeChild(d),c.style.display="",b.innerHTML="-"}else{c.style.display="none";var d=document.createElement("span");d.className="ellipsis",d.innerHTML=" &hellip; ",c.parentNode.insertBefore(d,c),b.innerHTML="+"}}var d={};d.jsString=function(a){var b,c={"\b":"b","\f":"f","\r":"r","\n":"n","	":"t"};for(b in c)-1===a.indexOf(b)&&delete c[b];a=JSON.stringify({a:a}),a=a.slice(6,-2);for(b in c)a=a.replace(new RegExp("\\\\u000"+b.charCodeAt().toString(16),"ig"),"\\"+c[b]);return this.htmlEncode(a)},d.htmlEncode=function(a){return null==a?"":a.toString().replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},d.decorateWithSpan=function(a,b){return'<span class="'+b+'">'+this.htmlEncode(a)+"</span>"},d.arrayToHtml=function(a){var b=!1,c="",d=0;for(var e in a)d++;for(var e in a)b=!0,c+="<li>"+this.valueToHtml(a[e]),d>1&&(c+=","),c+="</li>",d--;return c=b?'[<ul class="array collapsible">'+c+"</ul>]":"[ ]"},d.objectToHtml=function(a){var b=!1,c="",d=0;for(var e in a)d++;for(var e in a)b=!0,c+='<li><span class="prop"><span class="q">"</span>'+this.jsString(e)+'<span class="q">"</span></span>: '+this.valueToHtml(a[e]),d>1&&(c+=","),c+="</li>",d--;return c=b?'{<ul class="obj collapsible">'+c+"</ul>}":"{ }"},d.valueToHtml=function(a){var b=a&&a.constructor,c="";return null==a&&(c+=this.decorateWithSpan("null","null")),a&&b==Array&&(c+=this.arrayToHtml(a)),a&&b==Object&&(c+=this.objectToHtml(a)),b==Number&&(c+=this.decorateWithSpan(a,"num")),b==String&&(c+=/^(http|https|file):\/\/[^\s]+$/i.test(a)?'<a href="'+a+'"><span class="q">"</span>'+this.jsString(a)+'<span class="q">"</span></a>':'<span class="string">"'+this.jsString(a)+'"</span>'),b==Boolean&&(c+=this.decorateWithSpan(a,"bool")),c},d.jsonToHtml=function(a){return'<div class="gd-ui-json-explorer">'+this.valueToHtml(a)+"</div>"};var e=JSON.parse(a||"{}"),f=d.jsonToHtml(e);b.html(f);for(var g=angular.element(b)[0].getElementsByTagName("ul"),h=0;h<g.length;h++){var i=g[h];if(-1!=i.className.indexOf("collapsible")&&"LI"==i.parentNode.nodeName){var j=document.createElement("div");j.className="collapser",j.innerHTML="-",j.addEventListener("click",c,!1),i.parentNode.insertBefore(j,i.parentNode.firstChild)}}})}}}]),angular.module("adminApp").controller("RootCtrl",["$scope","$sce",function(a,b){a.trustUrl=function(a){return b.trustAsResourceUrl(a)}}]),angular.module("adminApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("adminApp").controller("MediaCtrl",["$scope","$http","$timeout","$routeParams","Instagram","Media","Pets","Kennels","Treats","Donations",function(a,b,c,d,e,f,g,h,i,j){function k(){a.hashtag="treatsforlife",a.activeFilter=""}var l=function(a){return{url:a.videos?a.videos.standard_resolution.url:a.images.standard_resolution.url,type:a.videos?"vd":"im",video:a.videos?a.videos.standard_resolution.url:"",image:a.images.standard_resolution.url,created_time:a.created_time,caption:a.caption?a.caption.text:"",link:a.link,ext_id:a.id,user_id:a.user.id,username:a.user.username}};a.fetchMedia=function(b,d){f.last(function(g){console.log("lastItem",g),e.get(a.hashtag,1e3,d).success(function(d){c(function(){for(var e in d.data)if(d.data[e]&&d.data[e].id){var h=l(d.data[e]);b||g.created_time>=h.created_time||f.create(h)}c(function(){a.items=f.all(),d.pagination.min_tag_id&&a.fetchMedia(b,d.pagination.min_tag_id)},500)})})})},c(function(){a.items=d.id?[f.query({id:d.id})]:f.all(),a.treats=i.all(),a.pets=g.all(),a.kennels=h.all(),a.donations=j.all(),window.debug=a}),a.updateItem=function(a){console.log("updating",a),a.$update()},a.removeItem=function(a){a.removed=!0,a.$update()},a.unremoveItem=function(a){a.removed=!1,a.$update()},a.shouldFilterItem=function(b){var c=a.activeFilter;if("new"==c){for(var d,e=0;d=["removed","donation","pet"][e];e++)if(b[d]&&b.activePill!=d)return!0;return!1}return!b[c]},a.formatDonationName=function(a){return a.treat.name+" to "+a.pet.name+" by "+a.user.name+" at "+a.createdAt},a.createPet=function(b){var c=b.pet;c.image=b.image,c.media=b._id,g.create(c,function(c){a.pets.push(c),b.pet=c,b.$update(),b.activePill=""})},a.assignToDonation=function(b){var c=a.donations.findById(b.donation);c.media=b,c.$update(function(a){b.donation=a._id,b.$update()})},k()}]),angular.module("adminApp").controller("KennelsCtrl",["$scope","Kennels",function(a,b){a.items=b.all(),a.updateItem=function(b){console.log("updating",a.items[b]),a.items[b].$update()},a.removeItem=function(b){confirm("Are You Sure???")&&(console.log("deleting",a.items[b]),a.items[b].$remove(),a.items.splice(b,1))},a.addItem=function(){b.create(function(b){a.items.push(b)})}}]),angular.module("adminApp").controller("PetsCtrl",["$scope","$routeParams","Pets","Users",function(a,b,c,d){a.items=b.id?[c.query({id:b.id})]:c.all(),a.users=d.all(),a.updateItem=function(b){console.log("updating",a.items[b]),a.items[b].$update()},a.removeItem=function(b){confirm("Are You Sure???")&&(console.log("deleting",a.items[b]),a.items[b].$remove(),a.items.splice(b,1))},a.addItem=function(){c.create(function(b){a.items.push(b)})},a.updateField=function(a,b){console.log("updating",a,b);var d={};d._id=a._id,d[b.key]=b.val,c.update(d)},a.assignOwner=function(b){var c=a.users.findById(b.user);c.pet=b._id,c.$update(function(){}),b.user=c._id,b.$update(function(){})},a.shouldFilterItem=function(b){var c=a.activeFilter;return"all"==c?!1:"lonely"==c?b.user:"owned"==c?!b.user:!0}}]),angular.module("adminApp").controller("UsersCtrl",["$scope","Users",function(a,b){a.items=b.all(),a.updateItem=function(b){console.log("updating",a.items[b]),a.items[b].$update()},a.removeItem=function(b){confirm("Are You Sure???")&&(console.log("deleting",a.items[b]),a.items[b].$remove(),a.items.splice(b,1))},a.addItem=function(){b.create(function(b){a.items.push(b)})}}]),angular.module("adminApp").controller("TreatsCtrl",["$scope","Treats",function(a,b){a.items=b.all(),a.updateItem=function(b){console.log("updating",a.items[b]),a.items[b].$update()},a.removeItem=function(b){confirm("Are You Sure???")&&(console.log("deleting",a.items[b]),a.items[b].$remove(),a.items.splice(b,1))},a.addItem=function(){b.create(function(b){a.items.push(b)})}}]),angular.module("adminApp").controller("DonationsCtrl",["$scope","Donations","Pets","Users","Treats","Media",function(a,b,c,d,e,f){a.items=b.all(),a.updateItem=function(b){console.log("updating",a.items[b]),a.items[b].$update()},a.removeItem=function(b){confirm("Are You Sure???")&&(console.log("deleting",a.items[b]),a.items[b].$remove(),a.items.splice(b,1))},a.addItem=function(){b.create(function(b){a.items.push(b)})},a.treats=e.all(),a.users=d.all(),a.medias=f.all(),a.pets=c.all(),window.debug=a}]);