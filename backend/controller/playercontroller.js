const playerdetails = require("../model/player")


const sendDetails = async (req, res) => {
    try {
        const player = await playerdetails.find(); // Fetches all documents from the Player collection
        res.send(player);
    } catch (error) {
        res.status(500).send("Error retrieving player details");
    }
};


const handleValidation = (req, res) => {

    const data = req.body;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        if (data[i].role === 'bat') {
            bowler = true;
        }
        else if (data[i].role === 'bowl') {
            batsman = true;
        }
        else if (data[i].role === 'all') {
            all = true;
        }
        else if (data[i].role === 'wk') {
            wk = true;
        }
    }
    let createdteam = { selectedteam: data };
    console.log(createdteam);
    playerdetails.create(createdteam);

    res.json({ createdteam });
};
var playing11_url = process.env.PLAYING_11
const squad_url = process.env.SQUAD_URL
const fetchplaying11 = async (req, res) => {
    try {
        const response = await fetch(playing11_url);
        const data = await response.json(); 
        return data.data.teams.teama.squads
    } catch (error) {
        console.error("Error fetching playing 11:", error);
        res.status(500).send("Error fetching data");
    }
};

const fetchsquad = async (req, res) => {
    try {
        const response = await fetch(squad_url);
        const data = await response.json();
        return data.data[0].players
    } catch (error) {
        console.error("Error fetching playing 11:", error);
        res.status(500).send("Error fetching data");
    }
};
const fetchUpdatedsquad = async (req, res) =>
{
    const playing_11 = await fetchplaying11()
    const squad = await fetchsquad()

 
    for (let i in squad)
    {
        for (let j in playing_11){
            if (squad[i].pid == playing_11[j].player_id)
            {
                squad[i].playing_in_11 = playing_11[j].playing11
                break
                }
        }
        }
    
    res.send(squad)
}
const getList = async (req, res) =>
{
    const url = process.env.GET_PLAYER;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error("Error fetching playing 11:", error);
        res.status(500).send("Error fetching data");
    }
}
module.exports = { sendDetails, handleValidation, fetchUpdatedsquad,getList }