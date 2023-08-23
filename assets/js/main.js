
$('.our-success-stories-slick-parent').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  arrow: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

$('.testimonial-parent').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  responsive: [{
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    },
  ]
});

$('.logo-slider-box-parent').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: true,
  responsive: [{
      breakpoint: 1400,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false
      }
    },
  ]
});

$('.portfolio_single_page_slick_parent').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: false,
  asNavFor: '.portfolio_single_page_slick_nav'
});

$('.portfolio_single_page_slick_nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.portfolio_single_page_slick_parent',
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  responsive: [{
    breakpoint: 500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    }
  },
]
});

// Counter

// ++++++++++++++++++++++++++++++
// view area function to start the animation
var element_to_animate = $('.animate');
var $window = $(window);

// function to check element in view area
function into_view_area() {
	var window_height = $window.height();
	var window_top_position = $window.scrollTop();
	var window_bottom_position = (window_top_position + window_height);

	// calculate view area
	$.each(element_to_animate, function() {
		var element_height = $(this).outerHeight();
		var element_top_position = $(this).offset().top;
		var element_bottom_position = (element_top_position + element_height);
 
		//check to see if this current element is within viewport
		if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
			$(this).addClass('in_view');
		}
		else {
			$(this).removeClass('in_view');
		}
	});
}

// initialize function
$window.on('scroll resize', into_view_area);
$window.trigger('scroll');


// ++++++++++++++++++++++++++++++++++++
// counter box to count up the number from 0 to defined value

$.fn.countTo = function(options) {
	// merge the default plugin settings with the custom options
	options = $.extend({}, $.fn.countTo.defaults, options || {});

	// how many times to update the value, and how much to increment the value on each update
	var loops = Math.ceil(options.speed / options.refreshInterval),
		increment = (options.to - options.from) / loops;

	return $(this).each(function() {
		var _this = this,
			loopCount = 0,
			value = options.from,
			interval = setInterval(updateTimer, options.refreshInterval);

		// update value by loops
		function updateTimer() {
			value += increment;
			loopCount++;

			// add decimal and change string to number
			var valueWithDecimal = value.toFixed(options.decimals),
				valueAsNumber = Number.parseFloat(valueWithDecimal);

			// output frontend
			var valueAsLocaleNumber = valueAsNumber.toLocaleString();
			//$(_this).html(valueAsLocaleNumber);
			$(_this).html(valueAsLocaleNumber.replace(/\./g,$(_this).data('seperator')));

			// custom functions on update
			if (typeof(options.onUpdate) == 'function') {
				options.onUpdate.call(_this, value);
			}

			// custom functions on complete
			if (loopCount >= loops) {
				clearInterval(interval);
				value = options.to;

				if (typeof(options.onComplete) == 'function') {
					options.onComplete.call(_this, value);
				}
			}
		}
	});
};

// default options
$.fn.countTo.defaults = {
	from: 0,  // the number the element should start at
	to: 100,  // the number the element should end at
	speed: 1000,  // how long it should take to count between the target numbers
	refreshInterval: 100,  // how often the element should be updated
	decimals: 0,  // the number of decimal places to show
	onUpdate: null,  // callback method for every time the element is updated,
	onComplete: null,  // callback method for when the element finishes updating
};



// get the element and start to count number in view area
function updateOptions() {
	var element = $('.count_up');
	
	element.each(function() {
		if($(this).hasClass('in_view') && !$(this).hasClass('is_done')) {
			$(this).addClass('is_running');

			if($(this).hasClass('is_running')) {
				$(this).find('.value').countTo({
					from: 0
					,to: $(this).find('.value').data('count')
					,speed: 3000
					,refreshInterval: 50
					,decimals: $(this).find('.value').data('decimal')
					,onUpdate: function(value) {
						element.addClass('is_done');
					}
					,onComplete: function(value) {
						element.removeClass('is_running');
					}
				});
			}
		}
	});
}
$(window).on('scroll load', function() {
    updateOptions();
});

$('button.start').click(function() {
	$('.count_up').removeClass('is_done');
	$('.count_up').removeClass('in_view');
	into_view_area();
	updateOptions();
});

//Testimonial

const next = document.querySelector(".next");
const prev = document.querySelector(".previous");
const slides = document.querySelectorAll(".slide");

let index = 0;
display(index);

function display(index) {
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  slides[index].style.display = "flex";
}

function nextSlide() {
  index++;
  if (index > slides.length - 1) {
    index = 0;
  }
  display(index);
}

function prevSlide() {
  index--;
  if (index < 0) {
    index = slides.length - 1;
  }
  display(index);
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);


//Pagination

function getCurrentPageGroup(currentPage = 1) {
  let exactCurrent = [1, 2].indexOf(currentPage) != -1 ? 1 : currentPage - 2;

  let currentPageGroup = range(exactCurrent, exactCurrent + 4);

  return currentPageGroup;
}

function _animatePagination(btn, move = "top") {
  btn.classList.add(`pagination--move-${move}`);
  window.setTimeout(() => {
    btn.classList.remove(`pagination--move-${move}`);
  }, 850);
}

function updatePagination(currentPage = 1, BUTTONS, prevPage = 1) {
  let pageItems = getCurrentPageGroup(currentPage);

  let targetedPage = currentPage == 1 ? 0 : currentPage == 2 ? 1 : 2;

  BUTTONS.map((btn, index) => {
    btn.removeAttribute(`data-level`);
    btn.textContent = pageItems[index];
  });

  BUTTONS[targetedPage].dataset.level = "target";
  let _temp_page_content_ = BUTTONS[targetedPage].textContent;
  BUTTONS[targetedPage].innerHTML = `<strong>${_temp_page_content_}</strong>`;
  _animatePagination(
    BUTTONS[targetedPage],
    currentPage == prevPage ? "top" : currentPage < prevPage ? "next" : "prev"
  );
}

//
// =================== APP =================== //
(function () {
  const PAGINATION = document.querySelector(`.pagination`);
  const BUTTON_PREV = document.querySelector(`#pg-button-prev`);
  const BUTTON_NEXT = document.querySelector(`#pg-button-next`);
  const BUTTONS = [
    document.querySelector(`#pg-button-1`),
    document.querySelector(`#pg-button-2`),
    document.querySelector(`#pg-button-3`),
    document.querySelector(`#pg-button-4`),
    document.querySelector(`#pg-button-5`)
  ];

  const state = {
    currentPage: 1
  };

  function _eventPagination(btn) {
    btn.addEventListener(
      `click`,
      () => {
        let lastPage = state.currentPage;
        state.currentPage = parseInt(btn.textContent);
        updatePagination(state.currentPage, BUTTONS, lastPage);
      },
      false
    );
  }

  // default pagination
  updatePagination(state.currentPage, BUTTONS);

  // pagination events
  PAGINATION.onmousedown = () => {
    BUTTONS.map((btn) => {
      (btn.classList.contains("pagination--move-next") &&
        btn.classList.remove("pagination--move-next")) ||
        (btn.classList.contains("pagination--move-prev") &&
          btn.classList.remove("pagination--move-prev")) ||
        (btn.classList.contains("pagination--move-top") &&
          btn.classList.remove("pagination--move-top"));
    });
  };

  BUTTONS.map((btn) => _eventPagination(btn));

  BUTTON_PREV.onclick = () => {
    let lastPage = state.currentPage;

    // HINT : to avoid error on number under 1
    state.currentPage = state.currentPage - 1 <= 1 ? 1 : state.currentPage - 1;
    updatePagination(state.currentPage, BUTTONS, lastPage);
  };
  BUTTON_NEXT.onclick = () => {
    let lastPage = state.currentPage;

    // TODO : if fetch the length of pages, remove this infinite pagination
    state.currentPage += 1;
    updatePagination(state.currentPage, BUTTONS, lastPage);
  };
})();

//
// =================== HELPER =================== //
function range(start = 0, stop, step = 1, func = { onPush: (index) => index }) {
  let from = stop ? start : 0;
  let to = stop ? stop : start;
  let _range = [];
  if (from < to) {
    for (let index = from; index <= to; index += step) {
      func.beforePush && func.beforePush(index);
      _range.push(func.onPush(index));
      func.afterPush && func.afterPush(index);
    }
  } else {
    for (let index = from; index >= to; index -= step) {
      func.beforePush && func.beforePush(index);
      _range.push(func.onPush(index));
      func.afterPush && func.afterPush(index);
    }
  }
  return _range;
}

// Counter










