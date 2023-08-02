let inputBtn = document.getElementById("input-btn")
let message = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
let storeValues =  []
let storeDate = []

let countEntry = 0
let pageNumCount = 1
let journalEntry = document.getElementById("journal-entry")
let pageNum = document.getElementById("page-num")
let dateEntry = document.getElementById("date-entry")
let previousBtn = document.getElementById("left-btn")
let nextBtn = document.getElementById("right-btn")
let viewJournalBtn = document.getElementById("view-journal")

let leadsLocal = JSON.parse(localStorage.getItem("storeValues"))
let dateLocal = JSON.parse(localStorage.getItem("storeDate"))
let pageLocal = JSON.parse(localStorage.getItem("pageNumCount"))

let deleteBtn = document.getElementById("delete-btn")

//localStorage.clear()

document.addEventListener("DOMContentLoaded", function(){
    countEntry = 0
    pageNumCount = 1
    dateEntry.innerText = storeDate[countEntry]
    journalEntry.innerText = storeValues[countEntry]
    pageNum.innerText = pageNumCount
    
})

if(leadsLocal){
    storeValues = leadsLocal
}

if(dateLocal){
    storeDate = dateLocal
}

if (pageLocal){
    pageNumCount = pageLocal
}

if (viewJournalBtn){
    viewJournalBtn.addEventListener("click", function(){
        window.close();
    })
}

if(inputBtn){
    inputBtn.addEventListener("click", function(){
        let date = new Date()
        let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        let formattedDate = date.toLocaleString('en-US', options);
        pageNumCount++
        storeValues.push(message.value)
        message.value = ""
        storeDate.push(formattedDate)
        console.log(formattedDate)
        localStorage.setItem("pageNumCount", JSON.stringify(pageNumCount))
        localStorage.setItem("storeValues", JSON.stringify(storeValues))
        localStorage.setItem("storeDate", JSON.stringify(storeDate))
    })
}

if (nextBtn){
    nextBtn.addEventListener("click", function(){
        if (countEntry == storeValues.length-1){
            dateEntry.innerText = storeDate[countEntry]
            journalEntry.innerText = storeValues[countEntry]
            pageNum.innerText = pageNumCount
            console.log("hello")
        }
        else{
            countEntry++
            pageNumCount++
            dateEntry.innerText = storeDate[countEntry]
            journalEntry.innerText = storeValues[countEntry]
            pageNum.innerText = pageNumCount
            console.log("poop")
        }
    })
}

if (previousBtn){
    previousBtn.addEventListener("click", function(){
        if (countEntry == 0){
            dateEntry.innerText = storeDate[countEntry]
            journalEntry.innerText = storeValues[countEntry]
            pageNum.innerText = pageNumCount
        }
        else{
            countEntry--
            pageNumCount--
            pageNum.innerText = pageNumCount
            dateEntry.innerText = storeDate[countEntry]
            journalEntry.innerText = storeValues[countEntry]
        }
    })
}

if (deleteBtn){
    deleteBtn.addEventListener("click", function(){
        let confirmDelete = confirm("Are you sure you want to delete this journal entry?");
        if (confirmDelete){
            if (countEntry == 0){
                alert("You do not have any journal entries at the moment.")
            }
            else{
                const entryIndex = countEntry;
                deleteData(entryIndex)
    
                storeDate = JSON.parse(localStorage.getItem("storeDate"))
                storeValues = JSON.parse(localStorage.getItem("storeValues"))
    
                countEntry--

                dateEntry.innerText = storeDate[countEntry]
                journalEntry.innerText = storeValues[countEntry]
                pageNum.innerText = pageNumCount
            }
        }
    })
    
}

function deleteData(count){
    const myDateParse = JSON.parse(localStorage.getItem("storeDate"));
    const myValuesParse = JSON.parse(localStorage.getItem("storeValues"));

    myDateParse.splice(count, 1);
    myValuesParse.splice(count, 1);
    pageNumCount--;

    localStorage.setItem('storeDate', JSON.stringify(myDateParse));
    localStorage.setItem('storeValues', JSON.stringify(myValuesParse));
    localStorage.setItem('pageNumCount', JSON.stringify(pageNumCount));

};




