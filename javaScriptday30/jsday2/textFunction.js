function textTest(){
	var inputelts = document.getElementsByTagName("input");
	for(let i = 0; i < inputelts.length; i++){
		var elt = inputelts[i];
		if (elt.type != "text" || !elt.getAttribute("data-allowed-chars"))
			continue;
		if (elt.addEventListener){
			elt.addEventListener("keypress", filter, false);
			elt.addEventListener("textInput", filter, false);
			elt.addEventListener("textinput", filter, false);
		}
		else{
			elt.attachEvent("onkeypress",filter);
		}
	}
	
	function filter(event){
		var e = event || window.event;
		var target = e.target || e.srcElement;
		var text = null;
		if (e.type === "textinput" || e.type === "textInput"){
			text = e.data;
		}
		else {
			var code = e.charCode || e.keyCode;
			if (code < 32 || e.charCode == 0 || e.ctrlKey || e.altKey)
				return;
			var text = String.fromCharCode(code);
		}
		
		var allowed = target.getAttribute("data-allowed-chars");
		var messageid = target.getAttribute("data-messageid");
		if (messageid)
			var messageElement = document.getElementById(messageid);
		for(let i = 0; i < text.length; i++){
			var c = text.charAt(i);
			console.log("cµÄÖµ£º" + allowed.indexOf(c));
			if (allowed.indexOf(c) == -1){
				if (messageElement)
					messageElement.style.visibility = "visible";
				if (e.preventDefault)
					e.preventDefault();
				if (e.returnValue)
					e.returnValue = true;
				return false;
			}
		}
		
		if (messageElement)
			messageElement.style.visibility = "hidden";
	}
	
	
	
	
}