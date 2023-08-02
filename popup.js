let yesBtn = document.getElementById("yes");
let noBtn = document.getElementById("no");

if (yesBtn){
    yesBtn.addEventListener("click", function(){
        window.open('index.html', 'QuickJournal', 'width=500, height=420');
        window.close();
    })
};

if (noBtn){
    noBtn.addEventListener("click", function(){
        chrome.runtime.sendMessage({greeting: "Reset tab count"}, function(){
            console.log("They aren't ready yet!!");
        });
        window.close();
    })
    
};