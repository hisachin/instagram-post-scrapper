import express from 'express';

let router = express.Router();

//import utills here
import {
    CustomError,
    ValidationHelper
} from '../utills';


//import services here
import { ScraperService } from '../services';



//write your controller function below this
const scrapURL = async(req, res, next) => {
    try{
        const { url } = req.body;

        if(!url){
            throw new CustomError('MissingFieldError');
        }

        const isValidURL = ValidationHelper.isURL(url);

        if(!isValidURL){
            throw new CustomError('InvalidURL');
        }

        const data = await ScraperService.scrapeData(url);
        
        return res.status(200).send(data);
    }catch(e){
        next(e)
    }
}

const deleteURL = async(req, res, next) => {
    try{
        const { urlId } = req.params;
        
        if(!urlId){
            throw new CustomError('MissingFieldError');
        }

        const deleteUrl = await ScraperService.deleteData(urlId);

        if(deleteUrl){
            return res.status(200).send({
                "status" : true,
                "message" : "URL data has been deleted successfully"
            });
        }else{
            throw new Error('Something went wrong..');
        }

    }catch(e){
        next(e)
    }
}

/**
 * Routes for user defined below
 */
router.post('/', scrapURL);

router.delete('/:urlId', deleteURL);


module.exports = router;