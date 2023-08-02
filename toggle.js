let menuIcon = document.getElementById('menuIcon');

if(menuIcon){
    menuIcon.addEventListener("click", function(){
        let navigation = document.querySelector('nav');
        navigation.classList.toggle('toggle');
    })
}