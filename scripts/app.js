fetch("https://api.canarado.xyz/lyrics/645312624").then((res) => {
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