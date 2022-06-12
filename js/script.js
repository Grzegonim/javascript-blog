'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    
  // [DONE] remove class .active from all article links 
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks){
      activeLink.classList.remove('active');
  }
  // [DONE] add class .active to the clicked link 
    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');
  // [DONE] remove class .active from all article
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
  }
  // [DONE] get href atribute from clicked link
    const hrefValue = clickedElement.getAttribute('href');
  
  // [DONE] find the correct article using the selector (value of href)
    const targetArticle = document.querySelector(hrefValue);

  // [DONE] add class .active to the correct article
    targetArticle.classList.add('active');
  }

  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
    
