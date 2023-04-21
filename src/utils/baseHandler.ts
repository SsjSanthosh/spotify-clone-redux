import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import Cors from "cors";
const baseHandler = () => {
  return nc({
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) =>
      res.status(404).send({
        message: `API route not found: ${req.url}`,
      }),
  });
};
// baseHandler().use(async (req, res, next) => {
//   await Cors({ methods: ["POST", "GET", "DELETE", "PUT", "PATCH"] });
//   next();
// });

export default baseHandler;
