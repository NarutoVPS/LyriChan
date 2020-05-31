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
            resultDiv.innerHTML = "";
            final.content.forEach((song) => {
                resultDiv.innerHTML += `
                    <div class="box textCenter">
                        <h1 class="title">
                            ${song.title}
                        </h1>
                        <p>Artist: ${song.artist}</p>
                    </div>`
                })
            }
        })
    })
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const songName = document.querySelector("input").value.trim();

    getSongs(songName)
})