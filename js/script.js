'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),  
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
}

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
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';
  
function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
}

function calculateTagsParams(tags){
  const params = {
    max:0,
    min:999999,
  }
  for (let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      /* [DONE]add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* [DONE]END LOOP: for each tag */
    /* [DONE]insert HTML of all the links into the tags wrapper */
    articlesTags.innerHTML = html;  
  }
  /* [DONE]END LOOP: for every article: */
   /* [NEW] find list of tags in right column */
   const tagList = document.querySelector(optTagsListSelector);
   /* [NEW] create variable for all links HTML code */
   const tagsParams = calculateTagsParams(allTags);
   const allTagsData = {tags: []};
   /* [NEW] START LOOP: for each tag in allTags: */
   for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });    
   }
   /* [NEW] END LOOP: for each tag in allTags: */
   /* [NEW] add html from allTags to tagList */
   tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

function tagClickHandler(event){
  /* [DONE]prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement= this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const targetActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let targetActiveLink of targetActiveLinks){
    /* remove class active */
    targetActiveLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let targetLink of targetLinks){
    /* add class active */
    targetLink.classList.add('active');
  /* END LOOP: for each found tag link */  
  }  

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const targetLinks = document.querySelectorAll('.post-tags .list a');
  /* START LOOP: for each link */
  for (let targetLink of targetLinks){
    /* add tagClickHandler as event listener for that link */
    targetLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const targetAuthor = article.getAttribute('data-author');
    const linkHTMLData = {id: targetAuthor, title: targetAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
    html = html + linkHTML;
    authorWrapper.innerHTML = html;
    if (!allAuthors[targetAuthor]){
      allAuthors[targetAuthor] = 1;
    } else {
      allAuthors[targetAuthor]++;
    }
  }
  const wrapperListAuthors = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = {authors: []};
  for (let author in allAuthors){
    //allAuthorshtml += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')' + '</a></li>';
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }
  wrapperListAuthors.innerHTML = templates.authorListLink(allAuthorsData);
  console.log(templates.authorListLink(allAuthorsData))
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-','');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }
  const allAuthors = document.querySelectorAll('a[href="#author-' + author + '"]');
  for (let targetAuthor of allAuthors){
    targetAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const targetAuthors = document.querySelectorAll('.post-author a');
  for (let targetAuthor of targetAuthors){
    targetAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

