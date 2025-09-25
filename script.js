 const circleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          const circle = entry.target.querySelector('circle:last-child');
          const percentSpan = entry.target.querySelector('span');
          const percent = entry.target.dataset.percent;

          const radius = circle.r.baseVal.value;
          const circumference = 2 * Math.PI * radius;
          circle.style.strokeDasharray = circumference;
          circle.style.strokeDashoffset = circumference;

          let progress = 0;
          const interval = setInterval(() => {
            if(progress >= percent) clearInterval(interval);
            const offset = circumference - (progress / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            percentSpan.textContent = progress + '%';
            progress++;
          }, 15);
        }
      });
    }, { threshold: 0.3 });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Animate skill bars
          const progress = entry.target.querySelector('span[data-width]');
          const percent = entry.target.querySelector('.percent');

          if (progress && percent) {
            progress.style.width = progress.dataset.width;

            // Animate the percentage number
            let width = 0;
            const target = parseInt(progress.dataset.width);
            const interval = setInterval(() => {
              if (width >= target) clearInterval(interval);
              percent.textContent = width + '%';
              width++;
            }, 15);
          }
        }
      });
    }, { threshold: 0.3 });

  document.querySelectorAll('.skill-circle').forEach(el => circleObserver.observe(el));

    document.querySelectorAll('.skill, .service, .project img, .testimonial').forEach(el => {
      observer.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });