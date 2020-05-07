//import model
const ScrapedDataModel = require('../models/scrapedSchema');


//import utils
import {
    ScrapperLib
} from '../utills'


export default class ScraperService{

    constructor(){}

    async processScrapping(){
        try{
            const data = await scrapperLib.getScrappedData();

            const query = {"url" : url};

            const updateQuery = { "url" : url , "noOfLikes" : data.likes , "noOfComments" : data.NoOfComments, "commentsData" : data.comments };

            const queeryOptions = { upsert: true, new: true, setDefaultsOnInsert: true }; 

            await ScrapedDataModel.findOneAndUpdate(query,updateQuery,queeryOptions);

            return true;
        }catch(e){
            console.log('=> --- processScrapping',e);
            return false;
        }
    }

    static async scrapeData(url){
        try{
            const scrapperLib = new ScrapperLib(url);

            const isPrivate = await scrapperLib.isPrivateAccount();
            
            if(isPrivate){
                return {
                    'status' : false,
                    'message' : 'The Account is private'
                }
            }else{
                try{
                    const data = await scrapperLib.getScrappedData();

                    const query = {"url" : url};

                    const updateQuery = { "url" : url , "noOfLikes" : data.likes , "noOfComments" : data.NoOfComments, "commentsData" : data.comments };

                    const queeryOptions = { upsert: true, new: true, setDefaultsOnInsert: true }; 

                    await ScrapedDataModel.findOneAndUpdate(query,updateQuery,queeryOptions);
                    return {
                        'status' : true,
                        'message' : 'Your request recieved and is under process. Please check the listing page after some time'
                    }
                }catch(e){
                    console.log('=> --- scrapeData getScrappedData', e);
                    return {
                        'status' : false,
                        'message' : 'Something Went Wrong'
                    }
                }
            }
        }catch(e){
            console.log('=> --- scrapeData', e);
            return {
                'status' : false,
                'message' : 'Something Went Wrong'
            }
        }
    }

    static async deleteData(urlId){
        try{
            const deleteData = await ScrapedDataModel.findOneAndRemove({'_id' : urlId}); 

            if(deleteData){
                return true;
            }

            return false;
        }catch(e){
            console.log(e);
            return false;
        }
    }
}