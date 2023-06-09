// CREATED BY PHILIP DROUBI
let input = document.querySelector(".LinkInput");
let msg = document.querySelector(".formErrorMessage");
let msgMobil = document.querySelector(".formErrorMessageMobile");
let errorBox = msg;
let shortenForm = document.querySelector(".shortenSec form");
let shortenBtn = document.querySelector(".shortenSec form button");
let generatedLink = document.querySelector(".linkRes");
let timer;
let ableToSend = true;
let mobileView = false;

checkWidth();

function checkWidth() {
    let width = window.innerWidth;
    if (width <= 768 && !mobileView) {
        mobileView = true;
        errorBox = msgMobil;
    }
    else if (width > 768 && mobileView) {
        mobileView = false;
        errorBox = msg;
    }
}

window.addEventListener('resize', checkWidth);

shortenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    errorBox.classList.add("hidden");
    input.style.border = "none";
    if (input.value.length < 5) {
        if (input.value.length == 0)
            showReqError("Please add a link");
        else
            showReqError("Please add a valid link");
        errorBox.classList.remove("hidden");
        input.style.border = "2px solid var(--Red)";
    } else {
        if (ableToSend) {
            ableToSend = false;
            shortenBtn.innerHTML = `<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>`;
            ShortenLinkReq(input.value).then((data) => {
                if (data.ok) {
                    createShortLink(input.value, data.result.full_short_link2);
                    shortenBtn.blur();
                    shortenBtn.innerHTML = "Shorten It!";
                    ableToSend = true;
                } else {
                    showReqError(data.error);
                }
            }).catch(e => {
                showReqError("Failed to send request");
                shortenBtn.blur();
                shortenBtn.innerHTML = "Shorten It!";
                ableToSend = true;
            });
        }
    }
});

async function ShortenLinkReq(link) {
    const req = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    return req.json();
}

function createShortLink(oldLink, newLink) {
    generatedLink.classList.remove("hidden");
    let req = document.createElement('div');
    req.classList.add('req');
    req.innerHTML =
        `
    <div class="left">
        <a href="${oldLink}" class="oldLink" target="_blank" rel="noopener noreferrer">${oldLink}</a>
    </div>
    <div class="right">
        <a href="${newLink}" class="newLink" target="_blank" rel="noopener noreferrer">${newLink}</a>
        <button class="copyBtn">copy</button>
    </div>
    `;
    generatedLink.appendChild(req);
}

function showReqError(err) {
    errorBox.style.opacity = "1";
    clearTimeout(timer);
    errorBox.textContent = err;
    errorBox.classList.remove("hidden");
    input.style.border = "2px solid var(--Red)";
    shortenBtn.blur();
    shortenBtn.innerHTML = "Shorten It!";
    if (window.innerWidth < 768) {
        timer = setTimeout(() => {
            errorBox.style.opacity = "0";
            setTimeout(() => {
                errorBox.classList.add("hidden");
            }, 500);
        }, 4000);
    }
    ableToSend = true;
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains("copyBtn")) {
        btn = e.target;
        btn.classList.add("copied");
        btn.textContent = "Copied!";
        navigator.clipboard.writeText(btn.previousElementSibling.textContent);
        btn.blur();
    }
});