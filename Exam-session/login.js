// Logout Warning PopUp
const bg = document.querySelector('.bg-logout');
const modal = document.querySelector('.logout-box');
const submitBtn = document.getElementById('logout-pop_up');
const closeBtn = document.querySelector('.cancle');

submitBtn.onclick = function() {
    modal.classList.add('show');
    bg.classList.add('logout-background');
}
closeBtn.onclick = function() {
    modal.classList.remove('show');
    bg.classList.remove('logout-background');
}
document.getElementById('confirm').addEventListener('click', () => {
    alert('Your logout was successful!');
    window.location.href = 'start.html';
});