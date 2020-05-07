const HttpCode = {
    "Bad_Request" : 400,
    "Unauthorized" : 401,
    "Forbidden" : 403,
    "Not_Found" : 404,
    "Method_Not_Allowed" : 405,
    "Not_Acceptable" : 406,
    "Proxy_Authentication_Required" : 407,
    "Request_TimeOut" : 408,
    "Conflict" : 409,
    "Gone" : 410,
    "Internal_Server_Error" : 500,
    "Bad_Gateway" : 502,
    "Service_Unavailable" : 503,
    "Gateway_Timeout" : 504
}

export class CustomError extends Error{
    constructor(errorType , errorMsg, ...params){
        super(...params);       
        this.name = errorType;
        this.msg = errorMsg;
        this.customErrorObj(errorType);
    }

    customErrorObj(errorType){
        switch(errorType){
            case 'UrlNotFound':
                this.urlNotFound();
                break;
            case 'NotFound':
                this.notFound();
                break;  
            case 'MissingFieldError':
                this.missingFieldError();
                break; 
            case 'InvalidURL':
                this.invalidURL();
                break;     
            default:
                this.defaultError();                   
        }
    }

    defaultError(){
        this.message = 'Something Went Wrong';
        this.code = HttpCode['Not_Implemented'];
    }

    notFound(){
        this.message = 'No Data Found';
        this.code = HttpCode['Not_Found'];
    }

    urlNotFound(){
        this.message = this.msg;
        this.code = HttpCode['Not_Found'];
    }

    missingFieldError(){
        this.message = 'Required Field Is Missing';
        this.code = HttpCode['Not_Acceptable'];
    }

    invalidURL(){
        this.message = 'Url is not valid';
        this.code = HttpCode['Not_Acceptable'];
    }

}