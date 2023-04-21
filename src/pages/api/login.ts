import { NextApiRequest, NextApiResponse } from "next";
import baseHandler from "../../../utils/baseHandler";
import { nanoid } from "nanoid";
import queryString from "query-string";

const handler = baseHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
  ];
  const response_type = "token";
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const state = nanoid(16);
  const redirect_uri = process.env.REDIRECT_URI;
  try {
    const link = `https://accounts.spotify.com/authorize?${queryString.stringify(
      {
        response_type,
        client_id,
        client_secret,
        scope: scope.join(" "),
        redirect_uri,
        state,
      }
    )}`;
    res.send({ link });
  } catch (err) {
    res.status(500).end();
  }
});

export default handler;
