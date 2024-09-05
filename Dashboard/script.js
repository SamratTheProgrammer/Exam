let menu=document.querySelector("#menu");
let navbar=document.querySelector(".navbar");
menu.onclick=()=> {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("hover")

}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll=() =>{

    sections.forEach(sec => {
        let top =window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id =sec.getAttribute('id');

        if(top>= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    let header = document.querySelector('.header');
header.classList.toggle('sticky',window.scrollY > 0);

menu.classList.remove('bx-x');
navbar.classList.remove('active');
};

let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick=()=>{
    darkModeIcon.classList.toggle('bxs-sun');
    document.body.classList.toggle('dark-mode');
};
const modal1 = document.querySelector('.container');
const signInBtn1 = document.getElementById('pop_up');
const closeBtn1 = document.querySelector('.close');

const modal2 = document.querySelector('.container2');
const signInBtn2 = document.getElementById('sign-up');
const closeBtn2 = document.querySelector('.close2');

const modal3 = document.querySelector('.container3');
const signInBtn3 = document.getElementById('forget');
const closeBtn3 = document.querySelector('.close3');

signInBtn1.onclick = function() {
    modal1.classList.add('show');
    modal2.classList.remove('show1');
    modal3.classList.remove('show2'); 

closeBtn1.onclick = function() {
    modal1.classList.remove('show');
    modal3.classList.remove('show2');
}
}
signInBtn2.onclick = function() {
    modal2.classList.add('show1');
    modal1.classList.remove('show'); 
    modal3.classList.remove('show2'); 
}

closeBtn2.onclick = function() {
    modal2.classList.remove('show1');
    modal3.classList.remove('show2');
}

signInBtn3.onclick = function() {
    modal3.classList.add('show2');
    modal1.classList.remove('show');
    modal2.classList.remove('show1');
}
closeBtn3.onclick = function() {
    modal3.classList.remove('show2');
}

const typed= new Typed('.multiple-text',{
    strings:['Prepare with confidance.','For Smart Examination.'],
    typeSpeed:100,
    backSpeed:100,
    backDelay:200,
    loop:true
})

// ScrollReveal({ 
//     //reset: true ,
//     distance:'80px',
//     duration:2000,
//     delay: 200
// });

// ScrollReveal().reveal('.home-content , .heading', { origin: 'top' });
// ScrollReveal().reveal('.home-img img , .about-img, .services-container , .portfolio-box, .contact form', { origin: 'bottom' });
// ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
// ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });