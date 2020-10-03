window.addEventListener('DOMContentLoaded', function () {
  var scrollDelta = 10;
  var scrollOffset = 150;
  var scrolling = false;
  var previousTop = 0;
  var currentTop = 0;
  var header = document.querySelector('header');
  var headerHeight = header.clientHeight;
  var subnav = document.getElementById('subnav');
  var subnavHeight = subnav.clientHeight;
  var mainOffsetTop = document.querySelector('main').offsetTop - headerHeight - subnavHeight;
  var de = document.documentElement;

  function autoHideHeader() {
    currentTop = de.scrollTop;
    if (currentTop > previousTop) {
      // scrolling down
      if (currentTop > mainOffsetTop + scrollOffset) {
        document.body.classList.add('subnav-fixed', 'slide-header');
      } else if (currentTop > mainOffsetTop) {
        document.body.classList.add('subnav-fixed');
        document.body.classList.remove('slide-header');
      }
    } else {
      // scrolling up
      if (currentTop < mainOffsetTop) {
        document.body.classList.remove('slide-header', 'subnav-fixed');
      } else if (previousTop - currentTop > scrollDelta) {
        document.body.classList.remove('slide-header');
        document.body.classList.add('subnav-fixed');
      }
    }

    previousTop = currentTop;
    scrolling = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrolling) {
      scrolling = true;
      window.requestAnimationFrame
        ? requestAnimationFrame(autoHideHeader)
        : setTimeout(autoHideHeader, 1000 / 60);
    }
  });

  var subnavLinks = subnav.querySelectorAll('a');
  for (var i = 0; i < subnavLinks.length; i++) {
    var link = subnavLinks[i];

    link.addEventListener('click', function (e) {
      e.preventDefault();
      var hash = e.currentTarget.hash.slice(1);

      var paragraph = document.getElementById(hash);
      window.scrollTo({ behavior: 'smooth', top: paragraph.offsetTop - de.clientHeight / 3 });
    });
  }

  var scrolling_subNav = false;
  var paragraphs = document.querySelectorAll('.paragraphs li');
  var subnavLine = subnav.querySelector('span');

  function checkSubnavLinks() {
    for (var i = 0; i < paragraphs.length; i++) {
      var halfWindowHeight = de.clientHeight / 2;

      var paragraph = paragraphs[i];
      var link = subnav.querySelector('a[href="#' + paragraph.id + '"');
      var li = link.parentNode;

      var isActive =
        paragraph.offsetTop < de.scrollTop + halfWindowHeight &&
        paragraph.offsetTop + paragraph.offsetHeight > de.scrollTop + halfWindowHeight;

      if (isActive) {
        li.classList.add('active');
        var liRect = li.getBoundingClientRect();
        var left = liRect.left;
        subnavLine.style.left = left + 'px';
        subnavLine.style.width = liRect.width + 'px';
      } else {
        li.classList.remove('active');
      }
    }

    scrolling_subNav = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrolling_subNav) {
      scrolling_subNav = true;
      window.requestAnimationFrame
        ? requestAnimationFrame(checkSubnavLinks)
        : setTimeout(checkSubnavLinks, 1000 / 60);
    }
  });
});
