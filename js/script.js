{
  'use strict';
  /*document.getElementById('test-button').addEventListener('click', function() {
    const links = document.querySelectorAll('.titles a');
    console.log('links: ', links);
  });*/
  const titleClickHandler = function() {
    event.preventDefault();

    const clickedElement = this;

    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const hrefLinkAtribute = clickedElement.getAttribute('href');
    console.log('Link href atribute: ' + hrefLinkAtribute);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(hrefLinkAtribute);
    console.log('Targeted article:', targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('Articles:', articles);

    let html = '';

    for(let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      console.log('Article id: ' + articleId);

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('Article Title: ' + articleTitle);

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('Link HTML: ' + linkHTML);

      /* [DONE] insert link into titleList */

      html += linkHTML;

      console.log('HTML code: ' + html);

    }

    titleList.insertAdjacentHTML('afterbegin', html);

  }


  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  function generateTags(){
    /* [DONE] find all articles */

    const articlesList = document.querySelectorAll('article');
    console.log('All articles:', articlesList);

    /* [DONE] START LOOP: for every article: */
    for(let article of articlesList){

      /* [DONE] find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('Tags Wrapper:', tagsWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';

      /* [DONE] get tags from data-tags attribute */

      const dataTags = article.getAttribute('data-tags');
      console.log('Data tags: ' + dataTags);

      /* [DONE] split tags into array */

      const dataTagsArray = dataTags.split(' ');
      console.log('Data tags Array:', dataTagsArray);

      /* START LOOP: for each tag */
      for(let tag of dataTagsArray) {

        /* [DONE] generate HTML of the link */

        const htmlCode = '<li><a href="#tag-' + tag + '"><p>' + tag + '</p></a></li>';
        console.log('HTML Code for list: ' + htmlCode);

        /* [DONE] add generated code to html variable */

        html += htmlCode;

      }

      console.log('HTML to insert: ' + html);

      /* END LOOP: for each tag */

      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagsWrapper.insertAdjacentHTML('afterbegin', html);

    }
    /* END LOOP: for every article: */
  }

  generateTags();

  function tagClickHandler(event){
    /* [IN PROGRESS] prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    /* make a new constant "href" and read the attribute "href" of the clicked element */

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
}
