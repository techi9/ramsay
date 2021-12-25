import Pusher from "pusher";

const pusher = new Pusher({
    appId: "1321600",
    key: "ec8157dfc2c6e38904fa",
    secret: "576bd856d475890a3289",
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