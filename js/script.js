'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
    
  // [DONE] remove class .active from all article links 
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  // [DONE] add class .active to the clicked link 
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
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  
function generateTitleLinks(){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for (let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  } 
  titleList.innerHTML = html;
  //titleList.innerHTML = titleList.innerHTML + linkHTML;
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* [DONE]find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE]START LOOP: for every article: */
  for (let article of articles){
        /* [DONE] find tags wrapper */
    const articlesTags = article.querySelector(optArticleTagsSelector);
      /* [DONE]make html variable with empty string */
    let html = '';  
      /* [DONE]get tags from data-tags attribute */
    const targetTags = article.getAttribute('data-tags');
      /* [DONE]split tags into array */
    const targetTagsArray = targetTags.split(' ');
        /* [DONE]START LOOP: for each tag */
      for (let tag of targetTagsArray){
          /* [DONE]generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '\xa0' + '</a></li>';  
          /* [DONE]add generated code to html variable */
        html = html + linkHTML;
      }
        /* [DONE]END LOOP: for each tag */
      /* [DONE]insert HTML of all the links into the tags wrapper */
  articlesTags.innerHTML = html;  
  }
  /* [DONE]END LOOP: for every article: */
}
generateTags();

function tagClickHandler(event){
  /* [DONE]prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement= this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(clickedElement)
  /* make a new constant "tag" and extract tag from the "href" constant */
  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
