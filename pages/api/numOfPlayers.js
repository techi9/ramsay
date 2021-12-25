import Pusher from "pusher";

const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: "eu",
    useTLS: true
});

let nums = {}

export default async function handler(req, res)
{
    if(req.body.action === 'join'){
        if(nums[req.body.lobbyid]){
            nums[req.body.lobbyid]++
        }
        else{
            nums[req.body.lobbyid] = 1
        }
        await pusher.trigger(req.body.lobbyid, "join", {
            num: nums[req.body.lobbyid]
        });
    }
    else if (req.body.action === 'left'){
        nums[req.body.lobbyid]--
        console.log('left')
        await pusher.trigger(req.body.lobbyid, "left", {
            num: nums[req.body.lobbyid]
        });
        if (nums[req.body.lobbyid] === 0){
            delete nums[req.body.lobbyid]
            console.log('deleted' +nums[req.body.lobbyid])
        }
    }

    console.log(req.body.lobbyid ,nums[req.body.lobbyid])

    return res.status(200).json({num: nums[req.body.lobbyid]})

}