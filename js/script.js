// fixed header
const fixedHeader = document.querySelector(".fixed-header")
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

function ShowHeaderAfterScroll() {
    let y = window.scrollY;
    if (y >= vh) {
        fixedHeader.classList.add("add-opacity");
    } else {
        fixedHeader.classList.remove("add-opacity");
    }
}

window.addEventListener("scroll", ShowHeaderAfterScroll);

//gallry popups
const cards = document.querySelectorAll('.card');
const cardImages = document.querySelectorAll('.card__image');
const overlayView = document.querySelector('.overlay-view');
const viewArea = document.querySelector('.view-area');
const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');



function HideOverlay() {
    overlayView.classList.remove("popup");
    overlayView.classList.add("popdown");
    viewArea.classList.remove("popup");
    viewArea.classList.add("popdown");
    setTimeout(function () {
        viewArea.classList.remove("show")
        overlayView.style.display = "none"
        document.body.classList.remove("disable-scrolling");
    }, 1000);
}

// overlayView.addEventListener("click", HideOverlay);

document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        HideOverlay();
    }
})

function ShowOverlay() {
    overlayView.classList.remove("popdown");
    overlayView.classList.add("popup");
    overlayView.style.display = "block";
    viewArea.classList.remove("popdown");
    viewArea.classList.add("popup");
    viewArea.classList.add("show");
    document.body.classList.add("disable-scrolling");
}

function DisplayImage(position) {
    viewArea.style.background = `url(images/image_${position}.svg) center/cover no-repeat`;
}

let imageIdx = 0;

cards.forEach(function (card, index) {
    card.addEventListener("click",
        function () {
            ShowOverlay();
            imageIdx = index + 1;
            CheckButtonsValidity(imageIdx);
            DisplayImage(imageIdx);
        })
})

function CheckButtonsValidity(idx) {
    if (idx === cardImages.length) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "block";
    }
    if (idx === 1) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "block";
    }
}

function SlideToPreviousImage() {
    --imageIdx;
    CheckButtonsValidity(imageIdx);
    DisplayImage(imageIdx);
}

function SlideToNextImage() {
    ++imageIdx;
    CheckButtonsValidity(imageIdx);
    DisplayImage(imageIdx);
}

previousButton.addEventListener("click", SlideToPreviousImage);
nextButton.addEventListener("click", SlideToNextImage);


//countdown
let eventTime = '2105-06-17';

function getRemainingTime(eventTime) {
    let t = Date.parse(eventTime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initCountdown(endtime) {
    let clock = document.querySelector(".countdown");
    let days = clock.querySelector('.days');
    let hours = clock.querySelector('.hours');
    let minutes = clock.querySelector('.minutes');
    let seconds = clock.querySelector('.seconds');
    function updateClock() {
        let t = getRemainingTime(endtime);
        days.innerHTML = t.days + ' days';
        hours.innerHTML = t.hours + ' hours';
        minutes.innerHTML = t.minutes + ' minutes';
        seconds.innerHTML = t.seconds + ' seconds';
    }
    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
}

initCountdown(eventTime);


//popup

const popupButton = document.querySelector(".form-popup-button");
const form = document.querySelector(".form");

function HideFormOverlay() {
    // overlayView.classList.remove("popup");
    // overlayView.classList.add("popdown");
    form.classList.remove("popup");
    form.classList.add("popdown");
    setTimeout(function () {
        form.classList.remove("show")
        // overlayView.style.display = "none"
        // document.body.classList.remove("disable-scrolling");
    }, 1000);
}

// overlayView.addEventListener("click", HideFormOverlay);

document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        HideFormOverlay();
    }
})

function ShowFormOverlay() {
    overlayView.classList.remove("popdown");
    overlayView.classList.add("popup");
    overlayView.style.display = "block";
    form.classList.remove("popdown");
    form.classList.add("popup");
    form.classList.add("show");
    document.body.classList.add("disable-scrolling");
}

popupButton.addEventListener('click', ShowFormOverlay);

// form validation

const emailField = document.querySelector(".email");
const phoneField = document.querySelector(".phone");
const textField = document.querySelector(".text");
const formButton = document.querySelector(".form__button");


form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log(emailField.validity);
    
    formButton.value = "Processing...";

    const email = emailField.value;
    const phone = phoneField.value;
    const text = textField.value;

    if (!email || !phone || !text) {
        alert('Please fill in all fields');
        return;
      }

    if (!isValidEmail(email)) {
        alert('Please enter valid email adress');
        return;
    } 

    if (!isValidPhone(phone)){
        alert('Please enter valid phone number');
        return
    }

    const newPost = {
        email: email,
        phone: phone,
        text: text
    }
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then((response) => response.json())
    .then((data) => {
          console.log(data)
        }
    )

    setTimeout(function(){
        formButton.value = "Sent!";
        formButton.setAttribute('disabled', 'true');
        formButton.classList.remove('hover');
    }, 1000);
})


function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function isValidPhone(phone) {
    const pattern = /^(\d{1})?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return pattern.test(phone);
}


//banner popup


const popupBanner = document.querySelector('.popup-banner');

function registerVisit() {
    if (document.refreshCatcher.visited.value === "0") {
        setTimeout(ShowBanner, 30000);
        document.refreshCatcher.visited.value = "1";
    }
}

window.onload = registerVisit();

function ShowBanner() {
    overlayView.classList.remove("popdown");
    overlayView.classList.add("popup");
    overlayView.style.display = "block";
    popupBanner.classList.remove("popdown");
    popupBanner.classList.add("popup");
    popupBanner.classList.add("show");
    document.body.classList.add("disable-scrolling");
}

function HideBanner() {
    popupBanner.classList.remove("popup");
    popupBanner.classList.add("popdown");
    setTimeout(function () {
        popupBanner.classList.remove("show")
    }, 1000);
}

overlayView.addEventListener("click", function() {
    HideBanner();
    HideFormOverlay();
    HideOverlay();
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        HideBanner();
        HideFormOverlay();
        HideOverlay();
    }
})

const svgElements = document.querySelectorAll('.svg-element');


svgElements.forEach(function (element) {
    element.addEventListener('mouseover', function(){
        element.classList.add('flip')
        setTimeout(function(){element.classList.remove('flip')}, 2000)
    });
})