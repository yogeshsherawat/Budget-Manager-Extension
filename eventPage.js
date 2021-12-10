
let contextMenuItem = {
    "id":'spendMoney',
    "title":"Spend Money",
    "contexts":["selection"]  // other contexts may be image, video etc

}

chrome.contextMenus.create(contextMenuItem);

var isInt = (value)=> {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

chrome.contextMenus.onClicked.addListener(clickData =>{
    if(clickData.menuItemId == 'spendMoney' && clickData.selectionText){
        if(isInt(clickData.selectionText) ){
            
    var totalAmount = 0;
    
    chrome.storage.sync.get(['total','limit'],budget=>{
        if(budget.total)
        totalAmount+=budget.total;
        totalAmount+=  parseInt(clickData.selectionText);
        
        chrome.storage.sync.set({total:totalAmount},function(){
            if(budget.limit && totalAmount>=parseInt(budget.limit)){
                console.log("In here");
                var notifyOptions = {
                    type : "basic",
                    iconUrl : "/images/get_started48.png",
                    title : "Limit Reached",
                    message : "Hey, You reached your spending limit"

                };
                chrome.notifications.create('limitNotif',notifyOptions);
            }
        });    

        
    })
        }
    }
});


chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});