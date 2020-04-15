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
    /* find all articles */

    /* START LOOP: for every article: */

      /* find tags wrapper */

      /* make html variable with empty string */

      /* get tags from data-tags attribute */

      /* split tags into array */

      /* START LOOP: for each tag */

        /* generate HTML of the link */

        /* add generated code to html variable */

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  }

  generateTags();
}
