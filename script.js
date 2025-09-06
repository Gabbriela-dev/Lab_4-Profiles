// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  const cardsContainer = document.getElementById("cards");
  const tableBody = document.querySelector("#summary tbody");
  const liveRegion = document.getElementById("live");

  // Validation function
  function validateForm() {
    let valid = true;
    liveRegion.textContent = ""; // reset live feedback

    // First name
    const first = document.getElementById("first");
    const errFirst = document.getElementById("err-first");
    if (first.value.trim() === "") {
      errFirst.textContent = "First name is required.";
      valid = false;
    } else {
      errFirst.textContent = "";
    }

    // Last name
    const last = document.getElementById("last");
    const errLast = document.getElementById("err-last");
    if (last.value.trim() === "") {
      errLast.textContent = "Last name is required.";
      valid = false;
    } else {
      errLast.textContent = "";
    }

    // Email
    const email = document.getElementById("email");
    const errEmail = document.getElementById("err-email");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    if (!emailOk) {
      errEmail.textContent = "Please enter a valid email.";
      valid = false;
    } else {
      errEmail.textContent = "";
    }

    // Programme
    const prog = document.getElementById("programme");
    const errProg = document.getElementById("err-programme");
    if (prog.value.trim() === "") {
      errProg.textContent = "Programme is required.";
      valid = false;
    } else {
      errProg.textContent = "";
    }

    // Year (radio buttons)
    const year = document.querySelector("input[name='year']:checked");
    const errYear = document.getElementById("err-year");
    if (!year) {
      errYear.textContent = "Please select a year.";
      valid = false;
    } else {
      errYear.textContent = "";
    }

    // If not valid, update live region
    if (!valid) {
      liveRegion.textContent = "Fix errors before submitting.";
    }

    return valid;
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page reload

    if (!validateForm()) return; // if invalid, stop

    // Collect data
    const data = {
      first: document.getElementById("first").value.trim(),
      last: document.getElementById("last").value.trim(),
      email: document.getElementById("email").value.trim(),
      prog: document.getElementById("programme").value.trim(),
      year: document.querySelector("input[name='year']:checked").value,
      interests: document.getElementById("interests").value.trim(),
      photo: document.getElementById("photo").value.trim()
    };

    // Create card
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

    // Create table row
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${data.first} ${data.last}</td>
      <td>${data.prog}</td>
      <td>${data.year}</td>
      <td>${data.interests || "None"}</td>
      <td><button class="remove">Remove</button></td>
    `;
    tableBody.prepend(tr);

    // Hook up remove buttons
    card.querySelector(".remove").addEventListener("click", () => {
      card.remove();
      tr.remove();
    });
    tr.querySelector(".remove").addEventListener("click", () => {
      card.remove();
      tr.remove();
    });

    // Reset form after submission
    form.reset();
  });
});
