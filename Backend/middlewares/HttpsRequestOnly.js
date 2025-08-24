const HttpsRequestonly = (req,res,next)=>{
    if (process.env.ENVIRONMENT != "development" && !(req.secure))
        return res.status(301).redirect("https://" + req.headers.host + req.url );
    next();
};

export default HttpsRequestonly;