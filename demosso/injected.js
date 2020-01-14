$(document).ready(function () {
	function popUpMagic(){
		 $('body').append("<div  id=\"clloginProcess\" style=\"height: 100%; display: block;width: 100%;background: rgba(0,0,0,0.8);position: fixed;z-index: 1000;top: 0px;left: 0px;\"><div  style=\"width:500px;height:125px;margin: auto; position:absolute; top:0;right: 0; left: 0; bottom: 0; background: white;padding: 20px 25px 10px 25px;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);-moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);text-align: left;\"><a   class=\"loginProcess\" id=\"closeDiv\"  style=\"position: absolute;top: 5px;right: 10px;text-decoration: none;color: red;font-weight: bold;font-size: 20px;\" >X</a><h2 style=\"border-bottom: solid 1px #d4d4d4;color: black;padding: 0px 0px 15px 0px !important;margin:0px 0px 10px 0px !important;font-size: 20px;height: 33px;line-height: 30px;\">Single sign on</h2><p class=\"bloading\">Making magic happen...</p></div>");
		 setTimeout(()=>{ $("#clloginProcess").remove(); },2000);
	}
	chrome.storage.sync.get(function (items) {
		if (items.ssoExt) {
			if(items.ssouser101 && items.ssoClick101){
				popUpMagic();
				var interval1 = setInterval(function () {
					if($("#username").length > 0){
						$("#username").val(items.ssouser101.u);
						$("#password").val(items.ssouser101.p);
						chrome.storage.sync.remove(["ssoExt","ssoClick101"], function () { });
						$("#login").click();
						clearInterval(interval1);
					}
				},100);
			}else if(items.ssouser102 && items.ssoClick102){
				popUpMagic();
				var interval1 = setInterval(function () {
					if($("#username").length > 0){
						$("#username").val(items.ssouser102.u);
						$("#password").val(items.ssouser102.p);
						chrome.storage.sync.remove(["ssoExt","ssoClick102"], function () { });
						$("input[name=loginsubmit]").click();
						clearInterval(interval1);
					}
				},100);
			}else if(items.ssouser103 && items.ssoClick103){
				var interval1 = setInterval(function () {
					popUpMagic();
					if(document.querySelectorAll("input[id='peidx.userName']").length > 0){
						document.querySelector("input[id='peidx.userName']").value=items.ssouser103.u;
						document.querySelector("input[id='peidx.password']").value=items.ssouser103.p;
						chrome.storage.sync.remove(["ssoExt","ssoClick103"], function () { });
						document.querySelector("a[id='peidx.loginButton']").click();
						clearInterval(interval1);
					}
				},100);
			}else if(items.ssouser106 && items.ssoClick106){
				var interval1 = setInterval(function () {
					popUpMagic();
					if(document.querySelectorAll("#UserName").length > 0){
						document.querySelector("#UserName").value=items.ssouser106.u;
						document.querySelector("#Password").value=items.ssouser106.p;
						chrome.storage.sync.remove(["ssoExt","ssoClick106"], function () { });
						document.querySelector("input[type=submit]").click();
						clearInterval(interval1);
					}
				},100);
			}
			setTimeout(function () { chrome.storage.sync.remove(["ssoExt","ssoClick101","ssoClick102","ssoClick103","ssoClick106"], function () { }); }, 2000);
		}	
	});
});