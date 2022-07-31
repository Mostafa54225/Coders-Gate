import { RequestHandler } from "express"


export const notFound: RequestHandler = (req, res, next) => {
    return res.status(404).send({ message: 'Not found' })
}