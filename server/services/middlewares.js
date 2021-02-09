exports.parseCookie = (req, res, next) => {
    cookieStr = req.headers.cookie == undefined ? undefined : req.headers.cookie;
    if (cookieStr == undefined) {
        req.cookies = {};
        next();
    }
    else {
        cookies = cookieStr.split('; ')
        cookiesParsed = {};
        for (i = 0; i < cookies.length; ++i) {
            let cookie = cookies[i];
            let cookieSplit = cookie.split('=');
            cookiesParsed[cookieSplit[0]] = cookieSplit[1];  
        }
        req.cookies = cookiesParsed;
        next();
    }
}

exports.injectCustomRender = (req, res, next) => {
    res.customRender = (page, user, pageData) => {
        res.render('layout', {page: page, user: user, pageData: pageData});
    };
    next();
}