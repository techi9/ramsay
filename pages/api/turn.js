import Pusher from "pusher";

const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: "eu",
    useTLS: true
});

export default async function handler(req, res)
{
    await pusher.trigger(req.body.lobbyid, "event", {
        index: req.body.index
    });
    return res.status(200).json({})
}