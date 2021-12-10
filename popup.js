


chrome.storage.sync.get(['total','limit'], budget =>{
if(budget.total!=undefined)
document.getElementById("total").textContent = budget.total;
if(budget.limit!=undefined)
document.getElementById("limit").textContent = budget.limit;
});







let spendBtn = document.getElementById("spendAmount");
let spendAmnt = document.getElementById("amount");
let limitAmnt = document.getElementById("limit");

spendBtn.addEventListener('click',async()=>{
    
    var totalAmount = 0;
    console.log(totalAmount);

    chrome.storage.sync.get(['total','limit'],budget=>{
        console.log(budget);
        if(budget.total)
        totalAmount+=budget.total;
        if(spendAmnt.value)
        totalAmount+=  parseInt(spendAmnt.value);
        document.getElementById("total").textContent = totalAmount;
        
        spendAmnt.textContent="";
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
    

})