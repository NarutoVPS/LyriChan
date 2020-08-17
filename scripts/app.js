// this identifier stores the parsed fetch response available globally
let globalResponse = {};

// adds a submit event listener that grabs the text submitted by user and calls getSongs() with that text argument
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const songName = document.querySelector("input").value.trim();

    if (!songName) {
        alert("Please enter a song name.")
    } else {
        document.querySelector("button").classList.add("is-loading")
        getSongs(songName)
    }
})

// fetches song details from the api and displays the result/error received. 
function getSongs (songName) {
    songName = songName.replace(" ", "_");

    fetch(`https://api.canarado.xyz/lyrics/${songName}`).then((res) => {
    res.json().then((final) => {
        document.querySelector("button").classList.remove("is-loading")
        const resultDiv = document.querySelector(".result");

        if (final.status.failed) {
            resultDiv.innerHTML = `
                <div class="box response textCenter">
                    <h1 class="title is-size-3">
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
                    <div class="box response" id="song${i}">
                        <h1 class="title is-size-3">
                            ${song.title}
                        </h1>
                        <p class="block">Artist: ${song.artist}</p>
                    </div>`
                    i++;
                })
                addEveListener();
            }
        })
    })
}

// adds click event listener to all results. When clicked on any result box, addLyrics() is called for that result box
function addEveListener() {
    document.querySelectorAll(".response").forEach((eachResultBox) => {
        eachResultBox.addEventListener("click", function() {
            this.style.color = "#ffdd57";
            const id = Number(this.id.replace("song", ""))
            if (!alreadyAdded(this)) {
                addLyrics(id, this)
            }
        })
    })
}

// Checks if lyrics has been already added
let alreadyAdded = (instance) => {
    return instance.classList.value.includes("done")
}

// adds/displays lyrics and then calls removeItems()
let addLyrics = (id, instance) =>  {
    lyrics = globalResponse.content[id - 1].lyrics
    lyrics = lyrics.replace("\n", "<br><br>")
    if (lyrics == "") {
        instance.innerHTML += `
        <div class="box lyrics">
            <pre class="content error">Some error occured in the API !...will be fixed soon 😉</pre>
        </div>`
        instance.classList.add("done");   
    }
    else {
        instance.innerHTML += `
        <div class="box lyrics">
            <pre class="content">${lyrics}</pre>
        </div>`
        instance.classList.add("done");
    }
    removeItems();
}

// removes all the results and after 1s displays the clicked result
function removeItems() {
    const allItems = document.querySelectorAll(".response")
    allItems.forEach((each) => {
        each.style.transform = "translateX(100vw)"
    })

    setTimeout(() => {
        allItems.forEach((each) => {
            if (alreadyAdded(each)) {
                each.style.transform = "none";
            } else {
                each.remove()
            }
        })
    }, 1000)
}

// api issue alret
alert("The api LyriChan uses is facing some issues !")
