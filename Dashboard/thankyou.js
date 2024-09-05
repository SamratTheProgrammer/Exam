ScrollReveal({ 
    //reset: true ,
    distance:'80px',
    duration:2000,
    delay: 200
});

ScrollReveal().reveal('.home-content', { origin: 'top' });
ScrollReveal().reveal('.home-img img  ', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .btn-class', { origin: 'right' });