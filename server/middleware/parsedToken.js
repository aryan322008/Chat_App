import jwt from "jsonwebtoken"

const tokenParser = async (req, res, next) => {

    const token = req.params.token
    // res.send(token)

    try {

        const data = jwt.verify(token, process.env.PRIVATE_KEY)

        req.user = await data.id

        next()

    } catch (error) {
        return res.status(400).json(error);
    }

}

export default tokenParser