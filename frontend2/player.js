function getdata() {
    const team = JSON.parse(localStorage.getItem("players")) || []; 

    let batlist = document.querySelector(".batsman-list");
    let bowllist = document.querySelector(".bowl-list");
    let alllist = document.querySelector(".all-list");
    let wklist = document.querySelector(".wk-list");

    batlist.innerHTML = '';
    bowllist.innerHTML = '';
    alllist.innerHTML = '';
    wklist.innerHTML = '';

    for (let i = 0; i < team.length; i++) {
        const player = team[i];
        const listelement = document.createElement("div");
  
        listelement.innerHTML = `
            <img class="img"src="images/man2.png" />
            <p>${player.name}</p>`;
        listelement.classList.add("player"); // Optional for styling

        if (player.role === "bat") {
            batlist.appendChild(listelement);
        } else if (player.role === "bowl") {
            bowllist.appendChild(listelement);
        } else if (player.role === "all") {
            alllist.appendChild(listelement);
        } else if (player.role === "wk") {
            wklist.appendChild(listelement);
        } else {
            console.warn(`Unknown role: ${player.playing_role}`);
        }
    }
}

getdata();

