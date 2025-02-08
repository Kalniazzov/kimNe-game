document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const baskets = document.querySelectorAll(".basket");

    const correctBaskets = {
        "кім": ["ата", "нағашы", "ұста", "дәрігер", "түлкі"],
        "не": ["ойыншық", "күріш", "қарға"]
    };

    const music = document.getElementById("bg-music");
    const wrongSound = document.getElementById("wrong-sound");
    const correctSound = document.getElementById("correct-sound");

    // Фондық музыканы автоматты түрде қосу
    music.volume = 0.5;
    music.loop = true; // Музыка қайталанып ойналады
    music.play().catch(err => console.warn("Автоойнату шектелген:", err));

    cards.forEach(card => {
        card.setAttribute("draggable", true);

        // Карточканың бастапқы орнын сақтау
        const originalPosition = { left: card.offsetLeft, top: card.offsetTop };

        card.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
            setTimeout(() => {
                event.target.style.opacity = "0.5";
            }, 0);
        });

        card.addEventListener("dragend", (event) => {
            event.target.style.opacity = "1";
        });

        function returnCard(card) {
            wrongSound.play();
            card.style.transition = "transform 0.5s ease-in-out";
            card.style.transform = "translate(0px, 0px)";
            card.style.animation = "shake 0.3s";
            setTimeout(() => {
                card.style.animation = "";
                card.style.transition = "";
            }, 500);
        }
        

        baskets.forEach(basket => {
            basket.addEventListener("dragover", (event) => {
                event.preventDefault();
            });

            basket.addEventListener("drop", (event) => {
                event.preventDefault();
                const cardId = event.dataTransfer.getData("text/plain");
                const card = document.getElementById(cardId);
            
                if (!card) return;
            
                const basketType = basket.dataset.type;
                const cardText = card.textContent.replace(/\s+/g, " ").trim().toLowerCase();
            
                console.log(`Карточка мәтіні: "${cardText}", Себет түрі: "${basketType}"`);
            
                if (correctBaskets[basketType] && correctBaskets[basketType].includes(cardText)) {
                    correctSound.play();
                    card.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
                    card.style.transform = "scale(0)";
                    card.style.opacity = "0";
                    setTimeout(() => { card.style.display = "none"; }, 300);
                } else {
                    returnCard(card);
                }
                
            });
            
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const restartBtn = document.querySelector(".restart-btn");

    restartBtn.addEventListener("click", () => {
        location.reload(); // Сайтты қайта жүктеу
    });

    // Қалған код сол қалпында
});
