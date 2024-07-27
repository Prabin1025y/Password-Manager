import jsonwebtoken from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    // console.log('Request Headers:', req.headers); // Inspect the headers
    // console.log('Cookies:', req.cookies); // Inspect the parsed cookies
    // console.log('Signed Cookies:', req.signedCookies); // Inspect the signed cookies
    // console.log(req);
    const token = req.cookies.token;
    // console.log(req.cookies);

    if (!token || token === null) {
        return res.send({ isAuthenticated: false, error: false })
    }

    jsonwebtoken.verify(token, process.env.SECRET, (err, result) => {
        if (err)
            res.send({ isAuthenticated: false, error: true })
        else {
            req.user = result;
            next();
        }
    })

}



export default isAuthenticated;