function saveStorage(id, value)
{
	chrome.extension.sendMessage({ type: 'saveStorage',id: id, value: value});
}

function clearStorage()
{
	chrome.extension.sendMessage({ type: 'clearStorage'});
}

function getStorage(id)
{
	chrome.extension.sendMessage({ type: 'getStorage',id: id}, function(response){
		options = document.getElementById(id);
		for(var i = 0; i < options.length; i++)
		{
			if(options[i].value == response.value)
				options[i].selected = true;
		}
	});
}

function saveOptions()
{
	props = document.getElementsByTagName('select');
	for(var i = 0; i < props.length; i++)
	{

		id = props[i].name;
		val = props[i].options[props[i].selectedIndex].value;
		if(props[i].selectedIndex == -1)
			val = "";	
		
		saveStorage(id,val);
		
		//chrome.extension.getBackgroundPage().updateLocal(id,val);
		//alert(props[i].name + ": " + props[i].options[props[i].selectedIndex].text);
	}
	
    var status = document.getElementById("status");
    status.innerHTML = "Optionen gespeichert.";
    setTimeout(function() {
      status.innerHTML = "";
    }, 1750);
}

function restoreOptions()
{
	props = document.getElementsByTagName('select');
	for(var i = 0; i < props.length; i++)
	{
		id = props[i].id;
		getStorage(id);
	}	
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);
//document.querySelector('#clear').addEventListener('click', clearStorage);