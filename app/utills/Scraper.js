import puppeteer from 'puppeteer';

export default class Scrapper{
    constructor(url){
        this._URL = url;
    }

    async isElementVisible(page, cssSelector){
        try{
            let visible = true;
            await page
            .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
            .catch(() => {
                visible = false;
            });
            return visible;
        }catch(e){
            console.log('=> ---- isElementVisible',e.message);
            return false;
        }
    };

    async isPrivateAccount(){
        try{
            const browser = await puppeteer.launch({headless: false, timeout: 0})
            const page = await browser.newPage()
            await page.goto(this._URL);
            await page.waitFor(2000);

            let isVisible = await this.isElementVisible(page, '.rkEop');

            if(!isVisible){
                await browser.close();
                return false;
            }

            const isPrivate = await page.evaluate(() =>{
                const text = document.querySelector('.rkEop').innerText

                if(text && text.trim() == 'This Account is Private'){
                    return true;
                }

               return false;
            });

            await browser.close();
            return isPrivate;
        }catch(e){
            console.log('=> ---- isPrivateAccount',e.message);
            return false;
        }
    }

    async getTotalLikes(){
        try{
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto(this._URL);
            const result = await page.evaluate(() => {
                let likes = document.querySelector('section > main > div > div > article > div.eo2As > section.EDfFK.ygqzn > div > div > button > span').textContent;
                return likes;
            });

            return result;
        }catch(e){
            console.log('=> ----- getTotalLikes',e.message);
            return null;
        }
    }

    async getAllComments(){
        try{
            const browser = await puppeteer.launch({headless: false, timeout: 0})
            const page = await browser.newPage()
            await page.goto(this._URL);
            await page.waitFor(3000);
            let loadMoreButton = 'section > main > div > div > article > div.eo2As > div.EtaWk > ul > li > div > button > span';
            let loadMoreVisible = await this.isElementVisible(page, loadMoreButton);
            while (loadMoreVisible) {
                await page
                .click(loadMoreButton)
                .catch(() => {});
                loadMoreVisible = await this.isElementVisible(page,loadMoreButton);
            }

            await page.waitFor(3000);

            const scrapedData = await page.evaluate(() =>{
                const isViewRepliesVisibleElements = Array.from(document.querySelectorAll('section > main > div > div > article > div.eo2As > div.EtaWk > ul > ul > li > ul > li > div > button'));
                
                if(isViewRepliesVisibleElements && isViewRepliesVisibleElements.length > 0){
                    isViewRepliesVisibleElements.forEach(el => {
                        el.click();
                    })
                }
                
                const commentsNodes = Array.from(document.querySelectorAll('.C4VMK'));

                const commentDetails =  commentsNodes.map((el) => {
                    return {
                        'user' : el.querySelector('._6lAjh') ? el.querySelector('._6lAjh').innerText : null,
                        'comment' : el.querySelector('span') ? el.querySelector('span').innerText : null,
                        'time' : el.querySelector('time') ? el.querySelector('time').getAttribute('datetime') : null
                    }
                });

                return commentDetails;
            });

            await browser.close();
            return scrapedData;
        }catch(e){
            console.log('=> ----- getAllComments',e.message);
            return null;
        }
    }

    async scrappedData(){
        const likes = await this.getTotalLikes();

        const comments = await this.getAllComments();

        return {
            'likes' : likes ? parseInt(likes.replace(',','')) : 0,
            'NoOfComments' : comments ? comments.length : 0,
            'comments' : comments
        }
    }

    async getScrappedData(){
        const data = await this.scrappedData();
        return data;
    }
}