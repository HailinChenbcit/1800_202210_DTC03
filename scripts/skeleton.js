//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./skeleton/nav.html'));
    console.log($('#footerPlaceholder').load('./skeleton/footer.html'));
}
loadSkeleton();  //invoke the function


function changeStatus(){
    document.getElementsByClassName("nav-link").onclick = function(){
        Element.setAttribute("class", "nav-link active");
    }
}