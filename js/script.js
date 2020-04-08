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

        /* add class 'active' to the correct article */
    }

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}