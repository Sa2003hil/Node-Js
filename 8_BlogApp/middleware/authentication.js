import { validateToken } from "../services/auth.js";

function checkForAuthCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) return next();

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            console.error("Error validating token:", error);
        }
        next();
    };

}

export { checkForAuthCookie };