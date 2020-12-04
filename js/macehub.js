(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 71)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });


})(jQuery); // End of use strict

(function() {
	function ready(fn) {
		if (document.readyState != 'loading'){
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}
	
	function makeSnow(el) {
		var ctx = el.getContext('2d');
		var width = 0;
		var height = 0;
		var particles = [];
		
		var Particle = function() {
			this.x = this.y = this.dx = this.dy = 0;
			this.reset();
		}
		
		Particle.prototype.reset = function() {
			this.y = Math.random() * height;
			this.x = Math.random() * width;
			this.dx = (Math.random() * 1) - 0.5;
			this.dy = (Math.random() * 0.5) + 0.5;
		}
		
		function createParticles(count) {
			if (count != particles.length) {
				particles = [];
				for (var i = 0; i < count; i++) {
					particles.push(new Particle());
				}
			}
		}
				
		function onResize() {
			width = window.innerWidth;
			height = window.innerHeight;
			el.width = width;
			el.height = height;
			
			createParticles((width * height) / 10000);
		}
		
		function updateParticles() {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = '#f6f9fa';
			
			particles.forEach(function(particle) {
				particle.y += particle.dy;
				particle.x += particle.dx;
				
				if (particle.y > height) {
					particle.y = 0;
				}
				
				if (particle.x > width) {
					particle.reset();
					particle.y = 0;
				}
				
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
				ctx.fill();
			});
			
			window.requestAnimationFrame(updateParticles);
		}
		
		onResize();
		updateParticles();
		
		window.addEventListener('resize', onResize);
	}
	
	ready(function() {
		var canvas = document.getElementById('snow');
		makeSnow(canvas);
	});
})();