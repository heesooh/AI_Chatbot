import jwt from 'jsonwebtoken';

export const createToken = (id: string, email: string, duration: string) => {
    const payload = {
        id,
        email,
    };
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        {
            expiresIn: duration,
        }
    );
    return token;
}