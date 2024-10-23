const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie('codesmith', 'hi');
    const randomNum = Math.floor(Math.random() * 100).toString();
    res.cookie('secret', randomNum);
    return next();    
}

cookieController.setSSIDCookie = (req, res, next) => {
    res.cookie('ssid', res.locals.users.id, {maxAge: 900000, httpOnly: true});

    return next();
}

module.exports = cookieController;