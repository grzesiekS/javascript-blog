'use strict';
{
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
    }

    const generateTitleLinks = function() {
        console.log('function generateTitleLinks is working!');

        const optTitleListSelector = '.titles',
            optTitleSelector = '.post-title',
            optArticleSelector = '.post';

        /* [DONE] remove content of the titles list */

        document.querySelector(optTitleListSelector).innerHTML = '';

        /* for each article */

            /* [DONE] get article id*/

            const articlesList = document.querySelectorAll(optArticleSelector);
            let articlesID = [];

            for(let article of articlesList) {
               articlesID.push(article.getAttribute('id'));
            }

            console.log('Articles ID', articlesID);

            /* [DONE] find the title element */
            
            const titleElemnts = document.querySelectorAll(optTitleSelector);
            console.log('Titles', titleElemnts);

            /* [DONE] get the title from the title element */

            let titles = [];

            for(let title of titleElemnts) {
                titles.push(title.innerHTML);
            }

            console.log('Titles', titles);

            /* [DONE] using id of the article and title of the element create html code for a link */

            let listHtmlCode = '<li><a class="active" href=#';

            for(let i = 0; i < articlesID.length; i++) {
                listHtmlCode += articlesID[i] + '><span>' + titles[i] + '</span>' + '</a></li><li><a href=#'
            }

            console.log('Title list test: ' + listHtmlCode);
            

            /* [DONE] add created html code to the title list */

            document.querySelector(optTitleListSelector).innerHTML = listHtmlCode;
    }

    generateTitleLinks();

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
    console.log('Links:', links);
}