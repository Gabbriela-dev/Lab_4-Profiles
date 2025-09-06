document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("regForm");
    const cardsContainer = document.getElementById("cards");
    const tableBody = document.querySelector("#summary tbody");
    const liveRegion = document.getElementById("live");
    const searchInput = document.getElementById("search");

    function validateForm() {
        let valid = true;
        liveRegion.textContent = "";

        const first = document.getElementById("first");
        const errFirst = document.getElementById("err-first");
        if (first.value.trim() === "") {
            errFirst.textContent = "First name is required.";
            valid = false;
        } else { errFirst.textContent = ""; }

        const last = document.getElementById("last");
        const errLast = document.getElementById("err-last");
        if (last.value.trim() === "") {
            errLast.textContent = "Last name is required.";
            valid = false;
        } else { errLast.textContent = ""; }

        const email = document.getElementById("email");
        const errEmail = document.getElementById("err-email");
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        if (!emailOk) {
            errEmail.textContent = "Please enter a valid email.";
            valid = false;
        } else { errEmail.textContent = ""; }

        const prog = document.getElementById("programme");
        const errProg = document.getElementById("err-programme");
        if (prog.value.trim() === "") {
            errProg.textContent = "Programme is required.";
            valid = false;
        } else { errProg.textContent = ""; }

        const year = document.querySelector("input[name='year']:checked");
        const errYear = document.getElementById("err-year");
        if (!year) {
            errYear.textContent = "Please select a year.";
            valid = false;
        } else { errYear.textContent = ""; }

        if (!valid) liveRegion.textContent = "Fix errors before submitting.";

        return valid;
    }

    function addEntry(data) {
        const card = document.createElement("div");
        card.className = "card-person";
        card.innerHTML = `
      <img src="${data.photo || "https://placehold.co/128"}" alt="Photo of ${data.first}">
      <div>
        <h3>${data.first} ${data.last}</h3>
        <p><span class="badge">${data.prog}</span> <span class="badge">Year ${data.year}</span></p>
        <p>Interests: ${data.interests || "None"}</p>
        <button class="remove">Remove</button>
      </div>
    `;
        cardsContainer.prepend(card);

        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${data.first} ${data.last}</td>
      <td>${data.prog}</td>
      <td>${data.year}</td>
      <td>${data.interests || "None"}</td>
      <td><button class="remove">Remove</button></td>
    `;
        tableBody.prepend(tr);

        card.querySelector(".remove").addEventListener("click", () => { card.remove(); tr.remove(); });
        tr.querySelector(".remove").addEventListener("click", () => { card.remove(); tr.remove(); });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = {
            first: document.getElementById("first").value.trim(),
            last: document.getElementById("last").value.trim(),
            email: document.getElementById("email").value.trim(),
            prog: document.getElementById("programme").value.trim(),
            year: document.querySelector("input[name='year']:checked").value,
            interests: document.getElementById("interests").value.trim(),
            photo: document.getElementById("photo").value.trim()
        };

        addEntry(data);
        form.reset();
    });

    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll("#cards .card-person").forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            const badges = Array.from(card.querySelectorAll(".badge")).map(b => b.textContent.toLowerCase()).join(" ");
            const interests = card.querySelector("p:nth-of-type(2)").textContent.toLowerCase();
            const text = name + " " + badges + " " + interests;
            card.style.display = text.includes(term) ? "" : "none";
        });
        document.querySelectorAll("#summary tbody tr").forEach(tr => {
            tr.style.display = tr.textContent.toLowerCase().includes(term) ? "" : "none";
        });
    });

});
