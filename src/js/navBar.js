const navItems = document.querySelectorAll('.nav-item');
const watches = document.querySelectorAll('.watch');

navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');

        watches.forEach(watch => watch.classList.remove('active'));
        watches[index].classList.add('active');
    });
});
