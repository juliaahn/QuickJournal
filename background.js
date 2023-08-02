// chrome.storage.local.get(function(result){console.log(result)})

// chrome.storage.local.clear()

let tabCount;
// let num = randomNum()
let num = 2
let lastDate;

chrome.runtime.onStartup.addListener(() => {
    const todayDate = getCurrentDate()
    getLastDate().then((result) => {
        lastDate = result
        if (lastDate == null || todayDate[0] > lastDate[0]){
            setTabCount(0)
            console.log(".")
        }else{
            if (todayDate[1] > lastDate[1]){
                setTabCount(0)
                console.log("/")
            }
            else{
                if (todayDate[2] > lastDate[2]){
                    setTabCount(0)
                    console.log("?")
                }
                else{
                    console.log("hello")
                    return;
                }
            }
        }
    }).catch((result) => {
        console.log(result)
    })

})

const increaseTabCount = () => {
    let key = "tabCounter"
    chrome.storage.local.get("tabCounter", (result) => {
        let tabCount = result.tabCounter || 0;
        tabCount++;
        chrome.storage.local.set({[key]: tabCount})
    })
}

const getTabCount = () => {
    const result = new Promise((resolve) => {
        chrome.storage.local.get("tabCounter", (result) => {
            if (result && result.tabCounter){
                resolve(result.tabCounter)
            }
            else{
                resolve(0)
            }
        })
    })
    return result;
}

const setTabCount = (count) => {
    const key = "tabCounter"
    chrome.storage.local.set({[key]: count})
}

const randomNum = () =>{
    return Math.floor(Math.random() * 20 + 1);
}

const randomNumNo = () => {
    return Math.floor(Math.random() * 10 + 5);
}

const getLastDate = () => {
    const result = new Promise((resolve) => {
        chrome.storage.local.get("myKey", (result) => {
            if (result && result.myKey){
                lastDate = result.myKey
                console.log(result.myKey + "in getLastDate")
                resolve(result.myKey)
            }
            else{
                lastDate = [null, null, null]
                resolve([null, null, null])
            } 
        });
    });
    return result;
}

const saveLastDate = (date) => {
    const key = "myKey";
    chrome.storage.local.set({[key]: date}, () => {
        console.log(date + "in saveLastDate")
    })
}
//lastdate = 30 6 2023
//arrfinish = 31 6 2023
chrome.tabs.onCreated.addListener(() => {
    increaseTabCount()

    getTabCount().then((count) => {
        tabCount = count
        if (tabCount == num){
            const arrFinish = getCurrentDate() 
            getLastDate().then((result) =>{
                lastDate = result
                if (lastDate == null){
                    saveLastDate(arrFinish);
                    setTabCount(0);
                    confirmJournal();
                    return;
                }else if (lastDate == undefined){
                    saveLastDate(arrFinish);
                    console.log(lastDate + "MMMMMM") //1st to print
                    setTabCount(0);
                    confirmJournal();
                    return;
                }
                else{
                    console.log(arrFinish + " " + lastDate)
                    if (lastDate == null || arrFinish[0] > lastDate[0]){
                        saveLastDate(arrFinish);
                        console.log(lastDate + "PPPP")
                        setTabCount(0);
                        confirmJournal()
                    }
                    else{
                        if (arrFinish[1] > lastDate[1]){
                            setTabCount(0);
                            confirmJournal()
                        }
                        else{
                            if (arrFinish[2] > lastDate[2]){
                                setTabCount(0);
                                confirmJournal()
                            }
                            else{
                                return;
                            }
                        }
                    }
                }
            }).catch(() => {
                console.log("error")
            })
    
            console.log(lastDate + "pleaseee")
    
    
        }
        else{
            return;
        }
    }).catch((err) => {
        console.log(err)
    })

})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    setTabCount(0);
    num = randomNumNo();
    console.log("New random num is " + num);
})

const confirmJournal = () => {
    chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 380,
        height: 140
    })
}

const getCurrentDate = () => {
    const now = new Date()
    let dateFinish = now.getDate()
    let monthFinish = now.getMonth()
    let yearFinish = now.getFullYear()
    let arr = [dateFinish, monthFinish, yearFinish]
    return arr
}
