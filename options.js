
var limitAmnt = document.getElementById("limit");
var save = document.getElementById("saveLimit");
var reset = document.getElementById("resetTotal");


function resetLimit(){
    limitAmnt.value = "";
}
function saveLimit(value){
    console.log(value)
    if(value)
    chrome.storage.sync.set({limit:value});
    resetLimit();
}

function resetTotal(){
    
   var x = prompt("Are you sure you want to reset Spends?/nEnter 'Y' for Yes and 'N' for No");
   if(x!=="Y")
   return; 
  chrome.storage.sync.set({total:0});
  var notifyOptions = {
    type : "basic",
    iconUrl : "/images/get_started48.png",
    title : "Resetting Spends to 0",
    message : "Hey, You have ressetted the Spends"

};
chrome.notifications.create('resetSpendNotif',notifyOptions);
}

reset.addEventListener('click',resetTotal);

save.addEventListener('click',()=>saveLimit(limitAmnt.value));
