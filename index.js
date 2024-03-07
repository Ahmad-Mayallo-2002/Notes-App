const notesContainer = document.querySelector(".notes-container");
const createBtn = document.getElementById("btn");

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.onclick = function () {
    notesContainer.innerHTML += 
    `
        <p contenteditable="true" class="input-box">
            <img src="images/delete.png" alt="Delete" />
        </p>
    `;
    updateStorage();
}

notesContainer.onclick = function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        const inputBoxes = document.querySelectorAll(".notes-container .input-box");
        inputBoxes.forEach(
            element => element.onkeyup = function() {
                updateStorage();
            }
        )
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

notesContainer.innerHTML = localStorage.getItem("notes");