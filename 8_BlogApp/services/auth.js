import jwt from 'jsonwebtoken';

const secret = 'dsfka#*^231!l#k32lsa3b1l69fad0vxc0';

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
}


// function to validate token
function validateToken() {
    const payload = jwt.verify(token, secret);
    return payload;
}


export { createTokenForUser, validateToken };