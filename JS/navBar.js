// CREATED BY PHILIP DROUBI

let bergStatues = false;
let bergIcon = document.querySelector('.berg');
let bergSpan = document.querySelectorAll('.berg span');
let mobileNavMenu = document.querySelector('.mobileNav .menu');

function berg() {
    if (!bergStatues) {
        bergStatues = true;
        bergSpan.forEach(e => e.style.width = '100%');
        mobileNavMenu.classList.remove('hidden');
        mobileNavMenu.style.opacity = '1'
    } else {
        bergStatues = false;
        let i = 0
        bergSpan.forEach(e => {
            i === 0 ? console.log()
                : i === 1 ? e.style.width = '75%'
                    : e.style.width = '50%'
            i++;
        });
        mobileNavMenu.style.opacity = '0'
        setTimeout(() => {
            mobileNavMenu.classList.add('hidden');
        }, 200);
    }
}

document.addEventListener('click', event => {
    if (bergStatues) {
        const isClickInside = bergIcon.contains(event.target) || mobileNavMenu.contains(event.target);
        if (!isClickInside) berg();
    }
});

bergIcon.addEventListener('click', berg);
