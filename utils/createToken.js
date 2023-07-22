import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
function createToken(id){
    return jwt.sign({id},process.env.JWT_SECRET , {expiresIn:'2d'})
}
export {createToken}