var selected_players = []
async function getdata()
{
    const url = ' http://localhost:3001/players/getplayer'
    const data = await fetch(url, {
        method:'GET'
    }).then((res) => res.json()).catch((error) => console.log(error))
    let batlist = document.querySelector(".batsman")
    let bowllist = document.querySelector(".bowler")
    let alllist = document.querySelector(".all")
    let wklist = document.querySelector(".wicketkeeper")
    for (let i = 0; i < 22; i++)
    {
        const player = await data.data.players[i]
        const listelement = document.createElement("li")
        listelement.innerHTML =
           `<span data-name="${player.player_name}">Player name: ${player.player_name}</span><br>
            <span data-role="${player.playing_role}">Role: ${player.playing_role}</span><br>
            <span data-points="${player.fantasy_player_rating}">Points: ${player.fantasy_player_rating}</span><br>
            <button class="selectbutton" onclick="selectPlayer(this)">Select</button>
            <button class="deletebutton" onclick="removePlayer(this)">Remove</button>`
        if (player.playing_role == "bat")
        {
            batlist.appendChild(listelement)
        }
        else if (player.playing_role == "bowl")
        {
            bowllist.appendChild(listelement)
        }
        else if (player.playing_role == "all")
        {
            alllist.appendChild(listelement)
        }
        else {
            wklist.appendChild(listelement)
        }
        
    }
    
    
}
getdata()
async function postdata() {
    const url = 'http://127.0.0.1:3001/players';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selected_players) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); 
        console.log(data);
    } catch (error) {
        console.error("Error creating player:", error);
    }
}
function create() {
    postdata()
    
    window.location.href = "../frontend2/players.html"
    localStorage.setItem("players", JSON.stringify(selected_players))
    
}
const roleLimits = {
    batsman: 3,
    bowler: 3,
    all: 1,
    wk: 1
};
const teamSize = 11;

function selectPlayer(button) {
    const listItem = button.parentElement;
    const name = listItem.querySelector('[data-name]').textContent.replace("Player name: ", "");
    const role = listItem.querySelector('[data-role]').textContent.replace("Role: ", "");
    const points = listItem.querySelector('[data-points]').textContent.replace("Points: ", "");

    let player = { name: name, role: role, points: points };

    let roleCount = {
        batsman: 0,
        bowler: 0,
        all: 0,
        wk: 0
    };

    selected_players.forEach(p => {
        if (p.role === "bat") roleCount.batsman++;
        else if (p.role === "bowl") roleCount.bowler++;
        else if (p.role === "all") roleCount.all++;
        else if (p.role === "wk") roleCount.wk++;
    }); 

    const remainingSlots = teamSize - selected_players.length;
    const requiredRoles = {
        batsman: Math.max(0, roleLimits.batsman - roleCount.batsman),
        bowler: Math.max(0, roleLimits.bowler - roleCount.bowler),
        all: Math.max(0, roleLimits.all - roleCount.all),
        wk: Math.max(0, roleLimits.wk - roleCount.wk)
    };

    if ((role === "bat" && (requiredRoles.bowler + requiredRoles.all + requiredRoles.wk >= remainingSlots)) ||
        (role === "bowl" && (requiredRoles.batsman + requiredRoles.all + requiredRoles.wk >= remainingSlots)) ||
        (role === "all" && (requiredRoles.batsman + requiredRoles.bowler + requiredRoles.wk >= remainingSlots)) ||
        (role === "wk" && (requiredRoles.batsman + requiredRoles.bowler + requiredRoles.all >= remainingSlots))) {
        return;  
    }

    if (selected_players.length < teamSize) {
        selected_players.push(player);
        document.getElementById("count").textContent = selected_players.length;
        listItem.style.backgroundColor = "rgb(117, 204, 88)";
    }

    if (selected_players.length === teamSize) {
        document.getElementById('create').disabled = false;
    }

    console.log(selected_players);
}




function removePlayer(button) {
    const listItem = button.parentElement;
    const name = listItem.querySelector('[data-name]').textContent.replace("Player name: ", "");
    let index;
    for (let i = 0; i < selected_players.length; i++)
    {
        if (selected_players[i].name == name)
        {
            index = i;
            break
        }
        else if (i == selected_players.length - 1)
        {
            alert("cannot remove")
            }
        
    }
    selected_players.splice(index, 1)
   
    listItem.style.backgroundColor = "rgb(224, 215, 215)"
    document.getElementById("count").textContent = selected_players.length
    console.log(selected_players)

    
}
