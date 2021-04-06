'use strict'

jQuery( document ).ready(function($) {
  let mobileWidth;
  let btnSearch = $('#search span');
  let blockSearch = $('.dropdown-search');
  let blockAbout = $('.about__wrap')

  // menu mobile
  let menuBtn = $('.menu-btn');
  let header = $('.header')

  menuBtn.on('click',function(){
    header.toggleClass('show-menu')
    $('body').toggleClass('overflow-on')
    $('html, body').animate({scrollTop:0}, 50);

  })

// animation scroll
$(window).scroll(function() {
  if($(window).scrollTop()  > 300)
    if($('.about__wrap').length!== 0){
    if($(window).scrollTop() > $(blockAbout).offset().top - $(window).innerHeight()){
      $(blockAbout).addClass('active')
    }}
  })

  // search

  btnSearch.on('click',function(e){
    e.preventDefault();
    if(!blockSearch.hasClass('show')){
      blockSearch.css({'animation': ''})
      blockSearch.addClass('show')
      $(blockSearch).find('input[type="search"]').focus()
    }else{
      blockSearch.removeClass('show')
      if(!mobileWidth){
        blockSearch.css({'animation': 'hide .4s ease-in forwards'})
      }else{
        blockSearch.css({'animation': 'hideMob .4s ease-in forwards'})
      }
    }
  })

  $(document).mouseup(function (e){
		var div = $("#search");
		if (!div.is(e.target)
		    && div.has(e.target).length === 0)  {
          blockSearch.removeClass('show')
          if(!mobileWidth){
            blockSearch.css({'animation': 'hide .4s ease-in forwards'})
          }else{
            blockSearch.css({'animation': 'hideMob .4s ease-in forwards'})
          }
		}
	});

  // img svg convert inline
  $('.img-svg').each(function(){
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function(data) {
      var $svg = $(data).find('svg');
      if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
      }
      $svg = $svg.removeAttr('xmlns:a');
      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }
      $img.replaceWith($svg);
    }, 'xml');
  });
// end img svg
  // checkMobileWidth()
  const CheckMobile = new Promise(function(){
    let widthWindow = document.body.clientWidth;
    let heightWindow = window.innerHeight;
    let orientationLandscape;
    widthWindow > heightWindow ? orientationLandscape = true : orientationLandscape = false;
    if (widthWindow <= 1023) {
        return mobileWidth = true;
    } else if ((widthWindow == 1024) && !orientationLandscape) {
        return mobileWidth = true;
    } else if (heightWindow >= 501 && orientationLandscape) {
        return mobileWidth = false;
    } else if (heightWindow < 500 && orientationLandscape) {
        return mobileWidth = true;
    } else {
        return mobileWidth = false;
    }
  })
// end detect
// sliders
    let introSlider = new Swiper('.intro-slides', {
      loop: true,
      navigation: {
        nextEl: '.intro-slide__next',
        prevEl: '.intro-slide__prev',
      },
      autoplay: {
        delay: 5000,
      },
    });
    if(mobileWidth){
      let shortSlider = new Swiper('.short-slides', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: '.short-pagination',
          type: 'bullets',
          clickable: true,
        },
      });
      let productSlider = new Swiper('.product-slides', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoplay: {
          delay: 5000,
        },
        // pagination: {
        //   el: '.short-pagination',
        //   type: 'bullets',
        //   clickable: true,
        // },
      });
    }else{
      let shortSlider = new Swiper('.short-slides', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: '.short-pagination',
          type: 'bullets',
          clickable: true,
        },
      });
    }
});