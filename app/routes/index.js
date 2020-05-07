import express from 'express';

let router = express.Router();

import { 
    ScrapperController,
} from '../controllers';

router.use('/scrape', ScrapperController);

module.exports = router;