const logger = (req, res, next) => {



    console.log(
        "Method:",
        req.method,
        "URL:",
        req.url,
        "IP:",
        req.ip,
        "Time:",
       
        new Date()
    );
   

    next();

};


module.exports = logger;

