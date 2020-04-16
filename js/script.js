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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('Articles:', articles);
    console.log('Custom Selector: ' + customSelector);
    console.log('optArticleSelector + Custom Selector: ' + optArticleSelector + customSelector);

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

  function addClickListenersToTitles() {
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  addClickListenersToTitles();

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

  const addActiveClassCurrentArticleLink = function() {
    /* [DONE] get active article */

    const activeArticle = document.querySelector(optArticleSelector + '.active');
    console.log('Get active article:', activeArticle);

    /* [DONE] get current article id */

    const activeArticleID = activeArticle.getAttribute('id');
    console.log('Active article ID: ' + activeArticleID);

    /* [DONE] get title link where href equals active article id */

    const titleLink = document.querySelector('a[href="#' + activeArticleID + '"]');
    console.log('Title link for active article:', titleLink);

    /* [DONE] add class active for title link for current article */

    titleLink.classList.add('active');
  };

  const tagClickHandler = function(event){
    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log('Clicked element: ' + clickedElement);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log('href atribute: ' + href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-','');
    console.log('Tag from href: ' + tag);

    /* [DONE] find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for(let activeLink of activeTagLinks) {

      /* [DONE] remove class active */

      activeLink.classList.remove('active');

    }
    /* END LOOP: for each active tag link */

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

    const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log('Tag links equal href', tagLinksHref);

    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinksHref) {

      /* [DONE] add class active */

      tagLink.classList.add('active');

    }
    /* END LOOP: for each found tag link */

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

    /* [DONE] execute function addClickListenersToTitles */

    addClickListenersToTitles();

    /* [DONE] execute function addActiveClassCurrentArticleLink */

    addActiveClassCurrentArticleLink();
  };

  function addClickListenersToTags(){
    /* [DONE] find all links to tags */

    const allTagsLinks = document.querySelectorAll(optArticleTagsSelector + ' a');
    console.log('All links to tags:', allTagsLinks);

    /* START LOOP: for each link */
    for(let link of allTagsLinks) {
      /* [DONE] add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

    }
    /* END LOOP: for each link */

  }

  addClickListenersToTags();

  const generateAuthors = function() {

    /* [DONE] Find all articles */

    const articlesList = document.querySelectorAll('article');
    console.log('Articles List: ', articlesList);

    /* START LOOP: for each articles */
    for(let article of articlesList) {
      console.log('article: ', article);

      /* [DONE] get author from the article */

      const author = article.getAttribute('data-author');
      console.log('Author of the article: ' + author);

      /* [DONE] find post-author wrapper of the article */

      const postAuthorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('Post author wrapper: ', postAuthorWrapper);

      /* [DONE] create const html for link with author name */

      const html = '<a href="#author' + author.replace(' ', '-') + '">by ' + author + '</a>';
      console.log('HTML code for author link: ' + html);

      /* [DONE] add created html code into post-author wrapper */

      postAuthorWrapper.insertAdjacentHTML('afterbegin', html);

    }
    /* END LOOP: for each articles */

  };

  generateAuthors();

  const addClickListenersToAuthors = function() {
    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log('author link href: ' + href);

    /* [DONE] make a new constatn "author" and get author name from href (replace "-" to " " and replace "#author") */

    const author = href.replace('#author', '').replace('-', ' ');
    console.log('author: ' + author);

    /* [DONE] find all author links with class active */

    const authorActiveLink = document.querySelectorAll('a.active[href^="#author"]');

    /* START LOOP: for each link with class active */
    for(let activeLink of authorActiveLink) {

      /* [DONE] remove class active  from each link*/

      activeLink.classList.remove('active');

    }
    /* END LOOP: for each link with class active */

    /* [DONE] find all links equals "href" constant */

    const authorLinkHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log('All author links that are equale:', authorLinkHref);

    /* START LOOP: for each link equals "href" */
    for(let linkHref of authorLinkHref) {

      /* [DONE] add class active */

      linkHref.classList.add('active');

    }
    /* END LOOP: for each link equals "href" */

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');

  };

  const authorClickHandler = function() {
    /* [DONE] find all links to authors */

    const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');
    console.log('Author link:', authorLinks);

    /* START LOOP: for each link */
    for(let link of authorLinks) {

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', addClickListenersToAuthors);

    }
    /* END LOOP: for each link */
  };

  authorClickHandler();

}
