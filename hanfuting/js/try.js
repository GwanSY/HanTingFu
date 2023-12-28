window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 0) {
      header.classList.add('header--sticky');
    } else {
      header.classList.remove('header--sticky');
    }
  });
  