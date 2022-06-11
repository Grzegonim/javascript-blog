'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */

  const titleClickHandler = function(){
    console.log('Link was clicked!');
    console.log(event)

  // remove class .active from all article links 
  // add class .active to the clicked link 
  // remove class .active from all article
  // get href atribute from clicked link
  // find the correct article using the selector (value of href)
  // add class .active to the correct article
  
  }
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
    
