let globalResponse = {};

function getSongs (songName) {
    songName = songName.replace(" ", "_");

    fetch(`https://api.canarado.xyz/lyrics/${songName}`).then((res) => {
    res.json().then((final) => {
        const resultDiv = document.querySelector(".result");

        if (final.status.failed) {
            resultDiv.innerHTML = `
                <div class="box textCenter">
                    <h1 class="title">
                        Error : ${final.status.code}
                    </h1>
                    <p>${final.status.message}</p>
                </div>`
        } else {
            globalResponse = final;
            resultDiv.innerHTML = "";
            let i = 1;
            final.content.forEach((song) => {
                resultDiv.innerHTML += `
                    <div class="box response textCenter" id="song${i}">
                        <h1 class="title">
                            ${song.title}
                        </h1>
                        <p>Artist: ${song.artist}</p>
                    </div>`
                    i++;
                })
                addEveListener();
            }
        })
    })
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const songName = document.querySelector("input").value.trim();

    getSongs(songName)
})

function addEveListener() {
    document.querySelectorAll(".response").forEach((eachResultBox) => {
        eachResultBox.addEventListener("click", function() {
            this.style.color = "red";
            const id = Number(this.id.replace("song", ""))
            console.log(id)
            addLyrics(id, this)
        })
    })
}

let addLyrics = (id, instance) =>  {
    lyrics = globalResponse.content[id - 1].lyrics
    lyrics = lyrics.replace("\n", "<br>")
    instance.innerHTML += `
    <div class="box">
        <p>
            ${lyrics}
        </p>
    </div>`
}