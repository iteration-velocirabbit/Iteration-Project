const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    //console.log('Set Cookie Console Log');
    try{
        
        console.log(res.locals.session.rows);
       res.cookie('Vasean&Sung', res.locals.session.rows[0].cookie_id,{
        httpOnly:true,
        secure:false,
        max:60*60*1000,
        path:'/'
       })
       
    //    console.log('Cookie set successfully: ', res.locals.session.rows[0].cookie_id)
        return next();    
    } catch(err){
        return next({
            log: `cookieController.setCookie error: ${err}`,
            status: res.status,
            message: `${err}`
    })
    }
}

// cookieController.setSSIDCookie = (req, res, next) => {
//     res.cookie('ssid', res.locals.users.id, {maxAge: 900000, httpOnly: true});

//     return next();
// }

module.exports = cookieController;