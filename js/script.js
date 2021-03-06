{
  'use strict';
  /*document.getElementById('test-button').addEventListener('click', function() {
    const links = document.querySelectorAll('.titles a');
    console.log('links: ', links);
  });*/

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  }

  const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.list.authors',
    tagListSelector: '.list.tags',
  };

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

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(opts.titleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    console.log('Articles:', articles);
    console.log('Custom Selector: ' + customSelector);
    console.log('opts.articleSelector + Custom Selector: ' + opts.articleSelector + customSelector);

    let html = '';

    for(let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      console.log('Article id: ' + articleId);

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
      console.log('Article Title: ' + articleTitle);

      /* [DONE] create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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

  const calculateTagsParams = function(tags) {
    /* [DONE] create variable tagsParam with keys max and min */
    let tagsParam = {
      max: 0,
      min: 0,
    };

    /* [DONE] create variable tagsValueArray */
    let tagsValueArray = [];

    /*START LOOP: for each key in tags*/
    for(let tag in tags) {
      /* [DONE] add key value from tags to tagsValueArray*/
      tagsValueArray.push(tags[tag]);

    /*END LOOP: for each key in tags */
    }
    console.log('tagsValueArray:', tagsValueArray);

    /* [DONE] set min and max value in tagsParam */
    tagsParam.max = Math.max(...tagsValueArray);
    tagsParam.min = Math.min(...tagsValueArray);

    /* return tagsParam */
    return tagsParam;
  };

  const calculateTagClass = function(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
    console.log('classNumber: ' + classNumber);

    return opts.cloudClassPrefix + classNumber;
  };

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */

    let allTags = {};

    /* [DONE] find all articles */

    const articlesList = document.querySelectorAll('article');
    console.log('All articles:', articlesList);

    /* [DONE] START LOOP: for every article: */
    for(let article of articlesList){

      /* [DONE] find tags wrapper */

      const tagsWrapper = article.querySelector(opts.articleTagsSelector);
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

        //const htmlCode = '<li><a href="#tag-' + tag + '"><p>' + tag + '</p></a></li>';
        const linkHTMLData = {id: tag, tag: tag};
        const htmlCode = templates.tagLink(linkHTMLData);
        console.log('HTML Code for list: ' + htmlCode);

        /* [DONE] add generated code to html variable */

        html += htmlCode;

        /* [NEW] check if this link is NOT already in allTags */

        if(!allTags[tag]){

          /* [NEW] add generated code to allTags object */

          allTags[tag] = 1;

        } else {

          allTags[tag]++;

        }
        /* END LOOP: for each tag */
      }

      console.log('HTML to insert: ' + html);

      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagsWrapper.insertAdjacentHTML('afterbegin', html);

    }
    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */

    const tagList = document.querySelector('.tags');


    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
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

    /*[NEW] add HTML from allTagsHTML to tagList */

    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData:', allTagsData);

  }

  generateTags();

  const compare = function(arrayObj, comparingVar) {
    for(let arrObj of arrayObj) {
      if(arrObj == comparingVar) {
        return true;
      }
    }
    return false
  }

  const activeClassHandlerFirstArticle = function(articleSelector) {
    /* [DONE] find first article where data-tag contains href atribute of clicked link*/
    const firstArticle = document.querySelector(articleSelector)

    /* [DONE] add active class to first article */
    firstArticle.classList.add('active');

    /* [DONE] find link in sidebar for the first article */
    const linkFirstArticle = document.querySelector('a[href="#' + firstArticle.getAttribute('id') + '"]')

    /* [DONE] add active class to link for the first article */
    linkFirstArticle.classList.add('active');
  };

  const activeClassHandler = function(articleSelector) {
    /* [DONE] get active article */
      const activeArticle = document.querySelector(opts.articleSelector + '.active');
      console.log('activeArticle', activeArticle);

    /* IF STATMENT: if active article is not null */
    if(activeArticle != null) {

      /* [DONE] find all articles where data-tag contains href atribute of clicked link */
      const allArticles = document.querySelectorAll(articleSelector);
      console.log('All articles:', allArticles);

      /* IF STATMENT: Check if allArticles array contain activeArticle*/
      if (!compare(allArticles, activeArticle)) {
        /* If it doesn't contain */
        /* [DONE] remove active class from article */
        activeArticle.classList.remove('active');

        activeClassHandlerFirstArticle(articleSelector);

      } else {
        /* [DONE] get active article link in side bar */

        const activeArticleLink = document.querySelector('a[href="#' + activeArticle.getAttribute('id') + '"]');

        /* [IN PROGRESS] add active class to active article link */

        activeArticleLink.classList.add('active');

      }
    } else {

      activeClassHandlerFirstArticle(articleSelector);

    }

  }

  const removeActiveCLassAuthors = function() {
    /* [DONE] get all authors link with class active*/
    activeAuthorLinks = document.querySelectorAll('a[href^="#author"].active');
    console.log('activeAuthorLinks', activeAuthorLinks);

    /* IF STATMENT: If authorLinks array is not null */
    if (activeAuthorLinks != null) {

      /* START LOOP: for all active author links */
      for(let link of activeAuthorLinks) {

        /* [DONE] Remove class active from all links */
        link.classList.remove('active');

      /* END LOOP: for all active author links */
      }
    }
  };

  const removeActiveClassTag = function() {
    /* [DONE] get all tags link with class active */

    const activeTagLinks = document.querySelectorAll('a[href^="#tag-"].active');
    console.log('activeTagLinks', activeTagLinks);

    /* IF STATMENT: If tagLinks array is not null */
    if(activeTagLinks != null) {

      /* START LOOP: for all active tag links */
      for(let link of activeTagLinks) {

        /* [IN PROGRESS] Remove class active from all links */

        link.classList.remove('active');

      /* END LOOP: for all active tag links */
      }
    }
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

    /* [DONE] execute function activeClassHandler */

    //addActiveClassCurrentArticleLink();
    activeClassHandler('[data-tags~="' + tag + '"]');

    /* execute function removeActiveCLassAuthors to remove active class from authors links */
    removeActiveCLassAuthors();
  };

  function addClickListenersToTags(){
    /* [DONE] find all links to tags */

    const allTagsLinks = document.querySelectorAll(opts.articleTagsSelector + ' a');
    console.log('All links to tags:', allTagsLinks);

    /* START LOOP: for each link */
    for(let link of allTagsLinks) {
      /* [DONE] add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

    }
    /* END LOOP: for each link */

  }

  addClickListenersToTags();

  function addClickListenersToTagsCloud() {
    /* [DONE] find all links to tags in cloud */
    const tagsCloudLinks = document.querySelectorAll(opts.tagListSelector + ' a');

    /*START LOOP: for all links in tag cloud section */
    for(let link of tagsCloudLinks) {
      /* [DONE] add handler for link event listener */
      link.addEventListener('click', tagClickHandler);

    /*END LOOP: for all links in tag cloud section */
    }
  }

  addClickListenersToTagsCloud();

  const generateAuthors = function() {
    /* [NEW-DONE] create a new variable allAuthors with an empty object */

    let allAuthors = {};

    /* [DONE] Find all articles */

    const articlesList = document.querySelectorAll('article');
    console.log('Articles List: ', articlesList);

    /* START LOOP: for each articles */
    for(let article of articlesList) {
      console.log('article: ', article);

      /* [DONE] get author from the article */

      const author = article.getAttribute('data-author');
      console.log('Author of the article: ' + author);

      /* [NEW-DONE] check if this author is NOT already in allTags */

      if(!allAuthors[author]){

        /* [NEW-DONE] add generated code to allTags object */

        allAuthors[author] = 1;

      } else {

        allAuthors[author]++;

      }

      /* [DONE] find post-author wrapper of the article */

      const postAuthorWrapper = article.querySelector(opts.articleAuthorSelector);
      console.log('Post author wrapper: ', postAuthorWrapper);

      /* [DONE] create const html for link with author name */

      //const html = '<a href="#author' + author.replace(' ', '-') + '">by ' + author + '</a>';
      const linkHTMLData = {id: author.replace(' ', '-'), author: author};
      const html = templates.authorLink(linkHTMLData);
      console.log('HTML code for author link: ' + html);

      /* [DONE] add created html code into post-author wrapper */

      postAuthorWrapper.insertAdjacentHTML('afterbegin', html);
      /* END LOOP: for each articles */
    }

    const tagsParams = calculateTagsParams(allAuthors);
    console.log('tagsParams Authors:', tagsParams);

    const allAuthorsData = {authors: []};

    /* START LOOP: for each keys in allAuthors */
    for(let author in allAuthors) {
      console.log('All Authors object:', author);
      /* [NEW-DONE] create const htmlAuthor with link code for section list authors in sidebar  */

      allAuthorsData.authors.push({
        authorHref: author.replace(' ', '-'),
        author: author,
        count: allAuthors[author],
        className: calculateTagClass(allAuthors[author], tagsParams)
      });

    /* END LOOP for each keys in allAuthors*/
    }

    /* [NEW-DONE] get author section from sidebar */
    const authorSidebarSection = document.querySelector(opts.authorsListSelector);
    console.log('authorSidebarSection', authorSidebarSection);

    /* [NEW-DONE] add html code to author section in sidebar */
    authorSidebarSection.insertAdjacentHTML('afterbegin', templates.authorCloudLink(allAuthorsData));

    console.log('allAuthorsData:', allAuthorsData);

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

    /* [DONE] execute function addClickListenersToTitles */

    addClickListenersToTitles();

    /* [DONE] execute function addActiveClassCurrentArticleLink/activeClassHandler */

    //addActiveClassCurrentArticleLink();
    activeClassHandler('[data-author="' + author + '"]');

    /* [DONE] execute function removeActiveClassTag to remove active class from tags */

    removeActiveClassTag();

  };

  const authorClickHandler = function() {
    /* [DONE] find all links to authors */

    const authorLinks = document.querySelectorAll(opts.articleAuthorSelector + ' a');
    console.log('Author link:', authorLinks);

    /* START LOOP: for each link */
    for(let link of authorLinks) {

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', addClickListenersToAuthors);

    }
    /* END LOOP: for each link */
  };

  authorClickHandler();

  const authorCloudClickHandler = function() {
    /* [DONE] find all links to authors */

    const authorLinks = document.querySelectorAll(opts.authorsListSelector + ' a');
    console.log('Author link:', authorLinks);

    /* START LOOP: for each link */
    for(let link of authorLinks) {

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', addClickListenersToAuthors);

    }
    /* END LOOP: for each link */
  };

  authorCloudClickHandler();

}
