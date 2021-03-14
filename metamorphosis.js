const cards = document.querySelectorAll(".card");
const dropbox = document.querySelectorAll(".card-slot");
const mixedCards = document.querySelector(".mixed-cards");
const draggedID = "draggedID";
const slotID = "slotID";
const proces = {
    frog: ["Frog eggs", "Tadpole", "Froglet", "Frog"],
    butterfly: ["Butterfly eggs", "Caterpillar", "Chrysalis", "Butterfly"]
}

initDragAndDrop();

function initDragAndDrop() {
    shuffleCards();
};

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".mixed-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
};

function dragStart(e) {
    e.target.classList.add(draggedID);
};

function allowDrop(e) {
    e.preventDefault();
};

function dragEnter(e) {
    e.target.classList.add(slotID);
}

function dragLeave(e) {
    e.target.classList.remove(slotID);
}

function drop(e) {
    const actualID = document.querySelector(`.${draggedID}`);
    const actualSlot = e.target;
    actualSlot.appendChild(actualID.parentElement);
    actualID.classList.remove(draggedID);
}

function isProcess(element, container, genre) {
    return container.contains(genre) && proces[genre].includes(element.getAttribute("alt"));

}

function dragEnd(e) {
    const actualSlot = document.querySelector(`.${slotID}`);
    const actualID = document.querySelector(`.${draggedID}`);
    if (!actualSlot || !actualID) {
        return;
    }


    actualSlot.classList.remove(slotID);
    actualID.classList.remove(draggedID);
    let procesClassList = actualSlot.parentElement.parentElement.classList;

    if (procesClassList.contains("mixed-cards")) {
        actualSlot.appendChild(actualID.parentElement);
    }


    if (isProcess(actualID, procesClassList, "frog") || isProcess(actualID, procesClassList, "butterfly")) {
        actualSlot.appendChild(actualID.parentElement);
    }
}
const handlers = {
    dragStart: e => dragStart(e),
    allowDrop: e => allowDrop(e),
    dragEnter: function(e) {
        dragEnter(e);
    },
    dragLeave: function(e) {
        dragLeave(e);
    },
    drop: function(e) {
        drop(e);
    },

    dragEnd: function(e) {
        dragEnd(e);
    }

};
cards.forEach(image => image.addEventListener("dragstart", handlers.dragStart));
cards.forEach(image => image.addEventListener("dragend", handlers.dragEnd));
cards.forEach(card => card.setAttribute("draggable", "true"));
dropbox.forEach(d => d.addEventListener("dragover", handlers.allowDrop));
dropbox.forEach(d => d.addEventListener("dragenter", handlers.dragEnter));
dropbox.forEach(d => d.addEventListener("dragleave", handlers.dragLeave));
mixedCards.addEventListener("dragenter", handlers.dragEnter);
mixedCards.addEventListener("dragover", handlers.allowDrop);
mixedCards.addEventListener("dragleave", handlers.dragLeave);
mixedCards.addEventListener("drop", handlers.drop);