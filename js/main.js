/** ===============

.. Preloader
.. header_search
.. Fixed-header
.. Menu
.. Number rotator
.. Skillbar
.. Tab
.. Accordion
.. Isotope
.. Prettyphoto
.. share-icon_btn
.. Slick_slider
.. Back to top 

 =============== */

jQuery(function ($) {
  "use strict";

  /*------------------------------------------------------------------------------*/
  /* Preloader
/*------------------------------------------------------------------------------*/
  // makes sure the whole site is loaded
  $(window).on("load", function () {
    $(".loader-blob").fadeOut(),
      $("#preloader")
        .delay(300)
        .fadeOut("slow", function () {
          $(this).remove();
        });
  });

  /*------------------------------------------------------------------------------*/
  /* header_search
/*------------------------------------------------------------------------------*/

  $(".header_search").each(function () {
    $(".search_btn", this).on("click", function (e) {
      e.preventDefault();
      $(".header_search_content").toggleClass("on");
    });

    $(".header_search_content_inner .close_btn").on("click", function (e) {
      e.preventDefault();
      $(".header_search_content").removeClass("on");
    });
  });

  /*------------------------------------------------------------------------------*/
  /* Fixed-header
/*------------------------------------------------------------------------------*/

  $(window).scroll(function () {
    if (matchMedia("only screen and (min-width: 1200px)").matches) {
      if ($(window).scrollTop() >= 50) {
        $(".ttm-stickable-header").addClass("fixed-header");
      } else {
        $(".ttm-stickable-header").removeClass("fixed-header");
      }
    }
  });

  var themetechmount_coverimgbox = function () {
    jQuery(".tm_coverimgbox_wrapper").each(function () {
      var parentDiv = jQuery(this);

      parentDiv.children(".tm_coverbox_contents").on(function () {
        parentDiv.find(".tm_coverbox_img").removeClass("active");
        jQuery(this).next(".tm_coverbox_img").addClass("active");
      });
    });
  };

  /*------------------------------------------------------------------------------*/
  /* Menu
/*------------------------------------------------------------------------------*/

  var menu = {
    initialize: function () {
      this.Menuhover();
    },

    Menuhover: function () {
      var getNav = $("nav.main-menu"),
        getWindow = $(window).width(),
        getHeight = $(window).height(),
        getIn = getNav.find("ul.menu").data("in"),
        getOut = getNav.find("ul.menu").data("out");

      if (matchMedia("only screen and (max-width: 1200px)").matches) {
        // Enable click event
        $("nav.main-menu ul.menu").each(function () {
          // Dropdown Fade Toggle
          $("a.mega-menu-link", this).on("click", function (e) {
            e.preventDefault();
            var t = $(this);
            t.toggleClass("active").next("ul").toggleClass("active");
          });

          // Megamenu style
          $(".megamenu-fw", this).each(function () {
            $(".col-menu", this).each(function () {
              $(".title", this).off("click");
              $(".title", this).on("click", function () {
                $(this)
                  .closest(".col-menu")
                  .find(".content")
                  .stop()
                  .toggleClass("active");
                $(this).closest(".col-menu").toggleClass("active");
                return false;
                e.preventDefault();
              });
            });
          });
        });
      }
    },
  };

  $(".btn-show-menu-mobile").on("click", function (e) {
    $(this).toggleClass("is-active");
    $(".menu-mobile").toggleClass("show");
    return false;
    e.preventDefault();
  });

  // Initialize
  $(document).ready(function () {
    menu.initialize();
  });

  /*------------------------------------------------------------------------------*/
  /* Animation on scroll: Number rotator
/*------------------------------------------------------------------------------*/

  $("[data-appear-animation]").each(function () {
    var self = $(this);
    var animation = self.data("appear-animation");
    var delay = self.data("appear-animation-delay")
      ? self.data("appear-animation-delay")
      : 0;

    if ($(window).width() > 959) {
      self.html("0");
      self.waypoint(
        function (direction) {
          if (!self.hasClass("completed")) {
            var from = self.data("from");
            var to = self.data("to");
            var interval = self.data("interval");
            self.numinate({
              format: "%counter%",
              from: from,
              to: to,
              runningInterval: 2000,
              stepUnit: interval,
              onComplete: function (elem) {
                self.addClass("completed");
              },
            });
          }
        },
        { offset: "85%" }
      );
    } else {
      if (animation == "animateWidth") {
        self.css("width", self.data("width"));
      }
    }
  });

  jQuery(".ttm-circle-box").each(function () {
    var circle_box = jQuery(this);
    var fill_val = circle_box.data("fill");
    var emptyFill_val = circle_box.data("emptyfill");
    var thickness_val = circle_box.data("thickness");
    var linecap_val = circle_box.data("linecap");
    var fill_gradient = circle_box.data("gradient");
    var startangle_val = (-Math.PI / 4) * 1.5;
    if (fill_gradient != "") {
      fill_gradient = fill_gradient.split("|");
      fill_val = { gradient: [fill_gradient[0], fill_gradient[1]] };
    }
    if (typeof jQuery.fn.circleProgress == "function") {
      var digit = circle_box.data("digit");
      var before = circle_box.data("before");
      var after = circle_box.data("after");
      var digit = Number(digit);
      var short_digit = digit / 100;
      var size_val = circle_box.data("size");
      jQuery(".ttm-circle", circle_box)
        .circleProgress({
          value: 0,
          duration: 8000,
          size: size_val,
          startAngle: startangle_val,
          thickness: thickness_val,
          linecap: linecap_val,
          emptyFill: emptyFill_val,
          fill: fill_val,
        })
        .on("circle-animation-progress", function (event, progress, stepValue) {
          circle_box
            .find(".ttm-fid-number")
            .html(before + Math.round(stepValue * 100) + after);
        });
    }
    circle_box.waypoint(
      function (direction) {
        if (!circle_box.hasClass("completed")) {
          if (typeof jQuery.fn.circleProgress == "function") {
            jQuery(".ttm-circle", circle_box).circleProgress({
              value: short_digit,
            });
          }
          circle_box.addClass("completed");
        }
      },
      { offset: "90%" }
    );
  });

  /*------------------------------------------------------------------------------*/
  /* Skillbar
/*------------------------------------------------------------------------------*/

  $(".ttm-progress-bar").each(function () {
    $(this).find(".progress-bar").width(0);
  });

  $(".ttm-progress-bar").each(function () {
    $(this)
      .find(".progress-bar")
      .animate(
        {
          width: $(this).attr("data-percent"),
        },
        2000
      );
  });

  // Part of the code responsible for loading percentages:

  $(".progress-bar-percent[data-percentage]").each(function () {
    var progress = $(this);
    var percentage = Math.ceil($(this).attr("data-percentage"));

    $({ countNum: 0 }).animate(
      { countNum: percentage },
      {
        duration: 2000,
        easing: "linear",
        step: function () {
          // What todo on every count
          var pct = "";
          if (percentage == 0) {
            pct = Math.floor(this.countNum) + "%";
          } else {
            pct = Math.floor(this.countNum + 1) + "%";
          }
          progress.text(pct);
        },
      }
    );
  });

  /*------------------------------------------------------------------------------*/
  /* Tab
/*------------------------------------------------------------------------------*/
  $(document).ready(function () {
    $(".ttm-tabs > .tabs")
      .children("li")
      .on("click", function (e) {
        var tab = $(this).closest(".ttm-tabs > .tabs > .tab"),
          index = $(this).closest(".ttm-tabs > .tabs > li").index();

        $(this)
          .parents(".ttm-tabs")
          .children(" .tabs")
          .children("li.active ")
          .removeClass("active");

        $(this).addClass("active");
        $(this)
          .addClass("active")
          .parents(".ttm-tabs")
          .children(".content-tab")
          .find(".content-inner")
          .not(".content-inner:eq(" + index + ")")
          .slideUp();
        $(this)
          .addClass("active")
          .parents(".ttm-tabs")
          .children(".content-tab")
          .find(".content-inner:eq(" + index + ")")
          .slideDown();

        e.preventDefault();
      });
  });

  /*------------------------------------------------------------------------------*/
  /* Accordion
/*------------------------------------------------------------------------------*/

  var allPanels = $(".accordion > .toggle").children(".toggle-content").hide();

  $(".toggle-title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this
      .parent()
      .parent()
      .find(".toggle .toggle-title a")
      .removeClass("active");

    if ($this.next().hasClass("show")) {
      $this.next().removeClass("show");
      $this.next().slideUp("easeInExpo");
    } else {
      $this
        .parent()
        .parent()
        .find(".toggle .toggle-content")
        .removeClass("show");
      $this
        .parent()
        .parent()
        .find(".toggle .toggle-content")
        .slideUp("easeInExpo");
      $this.next().toggleClass("show");
      $this.next().removeClass("show");
      $this.next().slideToggle("easeInExpo");
      $this.next().parent().children().children().addClass("active");
    }
  });

  /*------------------------------------------------------------------------------*/
  /* Isotope
/*------------------------------------------------------------------------------*/

  $(function () {
    if ($().isotope) {
      var $container = $(".isotope-project");
      $container.imagesLoaded(function () {
        $container.isotope({
          itemSelector: ".project_item",
          transitionDuration: "1s",
          layoutMode: "fitRows",
        });
      });

      $(".portfolio-filter li").on("click", function () {
        var selector = $(this).find("a").attr("data-filter");
        $(".portfolio-filter li").removeClass("active");
        $(this).addClass("active");
        $container.isotope({ filter: selector });
        return false;
      });
    }
  });

  /*------------------------------------------------------------------------------*/
  /* Prettyphoto
/*------------------------------------------------------------------------------*/
  $(function () {
    // Normal link
    jQuery(
      'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]'
    ).each(function () {
      if (
        jQuery(this).attr("target") != "_blank" &&
        !jQuery(this).hasClass("prettyphoto") &&
        !jQuery(this).hasClass("modula-lightbox")
      ) {
        var attr = $(this).attr("data-gal");
        if (
          typeof attr !== typeof undefined &&
          attr !== false &&
          attr != "prettyPhoto"
        ) {
          jQuery(this).attr("data-rel", "prettyPhoto");
        }
      }
    });

    jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
    jQuery("a.ttm_prettyphoto").prettyPhoto();
    jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
    jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({ hook: "data-gal" });
  });

  /*------------------------------------------------------------------------------*/
  /* share-icon_btn
/*------------------------------------------------------------------------------*/
  jQuery(".ttm-blog-classic").each(function (t) {
    var e = jQuery(this);
    e.find(".ttm-social-share-icon_btn").on("click", function () {
      return e.find(".social-icons").toggleClass("show"), !1;
    });
  });

  /*------------------------------------------------------------------------------*/
  /* twentytwenty[data-orientation]
/*------------------------------------------------------------------------------*/

  $(function () {
    $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({
      default_offset_pct: 0.5,
    });
    $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({
      default_offset_pct: 0.3,
      orientation: "vertical",
    });
  });

  /*------------------------------------------------------------------------------*/
  /* Slick_slider
/*------------------------------------------------------------------------------*/
  $(".slick_slider").slick({
    speed: 1000,
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: false,
    centerMode: false,

    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  /*------------------------------------------------------------------------------*/
  /* One Page setting
/*------------------------------------------------------------------------------*/

  jQuery(document).ready(function ($) {
    if (jQuery("body").hasClass("ttm-one-page-site")) {
      var sections = jQuery(".ttm-row, #tm-header-slider"),
        nav = jQuery(".ttm-header-wrap, .main-menu"),
        nav_height = jQuery("#site-navigation").data("sticky-height") - 1;

      jQuery(window).on("scroll", function () {
        if (jQuery("body").scrollTop() < 5) {
          nav.find("a").parent().removeClass("active");
        }
        var cur_pos = jQuery(this).scrollTop();
        sections.each(function () {
          var top = jQuery(this).offset().top - (nav_height + 1),
            bottom = top + jQuery(this).outerHeight();
          if (cur_pos >= top && cur_pos <= bottom) {
            if (
              typeof jQuery(this) != "undefined" &&
              typeof jQuery(this).attr("id") != "undefined" &&
              jQuery(this).attr("id") != ""
            ) {
              var mainThis = jQuery(this);
              nav.find("a").removeClass("active");
              jQuery(this).addClass("active");
              var arr = mainThis.attr("id");

              // Applying active class
              nav.find("a").parent().removeClass("active");
              nav.find("a").each(function () {
                var menuAttr = jQuery(this).attr("href").split("#")[1];
                if (menuAttr == arr) {
                  jQuery(this).parent().addClass("active");
                }
              });
            }
          }
        });
        //}
      });

      nav.find("a").on("click", function () {
        var $el = jQuery(this),
          id = $el.attr("href");
        var arr = id.split("#")[1];
        jQuery("html, body").animate(
          {
            scrollTop: jQuery("#" + arr).offset().top - nav_height,
          },
          500
        );
        return false;
      });
    }
  }); // END of  document.ready

  /*------------------------------------------------------------------------------*/
  /* Back to top
/*------------------------------------------------------------------------------*/

  // ===== Scroll to Top ====
  jQuery("#totop").hide();

  $(window).on("scroll", function () {
    if (jQuery(this).scrollTop() >= 500) {
      // If page is scrolled more than 50px
      jQuery("#totop").fadeIn(200); // Fade in the arrow
      jQuery("#totop").addClass("top-visible");
    } else {
      jQuery("#totop").fadeOut(200); // Else fade out the arrow
      jQuery("#totop").removeClass("top-visible");
    }
  });

  jQuery("#totop").on("click", function () {
    // When arrow is clicked
    jQuery("body,html").animate(
      {
        scrollTop: 0, // Scroll to top of body
      },
      500
    );
    return false;
  });
});

jQuery(document).ready(function () {
  jQuery(".tm_coverimgbox_wrapper").each(function () {
    var parentDiv = jQuery(this);

    parentDiv.children(".tm_coverbox_contents").hover(function () {
      parentDiv.find(".tm_coverbox_img").removeClass("active");
      jQuery(this).next(".tm_coverbox_img").addClass("active");
    });
  });
});

//  document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('contact_form').addEventListener('submit', function(e) {
//         e.preventDefault(); // Prevent form submission

//         // Perform form validation
//         var name = document.getElementsByName('name')[0].value.trim();
//         var email = document.getElementsByName('email')[0].value.trim();
//         var phone = document.getElementsByName('phone')[0].value.trim();
//         var subject = document.getElementsByName('subject')[0].value.trim();
//         var address = document.getElementsByName('address')[0].value.trim();
//         var pincode = document.getElementsByName('pincode')[0].value.trim();
//         var message = document.getElementsByName('message')[0].value.trim();

//         if (name === '' || email === '' || phone === '' || subject === '' || address === '' || pincode === '' || message === '') {
//             // Show error message using Toastify
//             Toastify({
//                 text: "Please fill in all fields.",
//                 duration: 3000,
//                 gravity: "bottom", // Display at the top
//                 position: "right", // Align to the left
//                 backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
//             }).showToast();
//             return;
//         }

//         // Perform additional validations if needed (e.g., email format)

//         // If all fields are filled and validated, you can send the form data to the backend using Fetch API
//         fetch('http://192.168.1.5:8082/api/save', {
//             method: 'POST',
//             body: new FormData(document.getElementById('contact_form')),
//         })
//         .then(function(response) {
//             if (response.ok) {
//                 // Handle success response
//                 // Show success message using Toastify
//                 Toastify({
//                     text: "Message sent successfully!",
//                     duration: 3000,
//                     gravity: "bottom", // Display at the top
//                     position: "right", // Align to the left
//                     backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//                 }).showToast();
//             } else {
//                 // Handle error response
//                 // Show error message using Toastify
//                 Toastify({
//                     text: "Error sending message. Please try again later.",
//                     duration: 3000,
//                     gravity: "bottom", // Display at the top
//                     position: "right", // Align to the left
//                     backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
//                 }).showToast();
//             }
//         })
//         .catch(function(error) {
//             console.error('Error:', error);
//         });
//     });
// });

function submitFrom() {
  var name = document.getElementsByName("name")[0].value.trim();
  var email = document.getElementsByName("email")[0].value.trim();
  var phone = document.getElementsByName("phone")[0].value.trim();
  var subject = document.getElementsByName("subject")[0].value.trim();
  var address = document.getElementsByName("address")[0].value.trim();
  var pincode = document.getElementsByName("pincode")[0].value.trim();
  var message = document.getElementsByName("message")[0].value.trim();


  if (name === '' || email === '' || phone === '' || subject === '' || address === '' || pincode === '' || message === '') {
                // Show error message using Toastify
                Toastify({
                    text: "Please fill in all fields.",
                    duration: 3000,
                    gravity: "bottom", // Display at the top
                    position: "right", // Align to the left
                    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                }).showToast();
                return;
            }

  var formdata = {
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    address: address,
    pincode: pincode,
    message: message,
  };

  fetch("http://192.168.1.5:8082/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend as needed
      console.log(data);
      displaySuccessMessage(data.Message);

      document.getElementById("contact_form").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      displayErrorMessage("Failed to submit the form. Please try again.");
    });
}



function displaySuccessMessage(Message) {
    Toastify({
                            text: "Message sent successfully!",
                            duration: 3000,
                            gravity: "bottom", // Display at the top
                            position: "right", // Align to the left
                            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                        }).showToast();
  }
  
  function displayErrorMessage(Message) {
    Toastify({
                            text: "Error sending message. Please try again later.",
                            duration: 3000,
                            gravity: "bottom", // Display at the top
                            position: "right", // Align to the left
                            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                        }).showToast();
  }