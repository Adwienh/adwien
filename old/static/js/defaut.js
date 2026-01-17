jQuery(document).ready(function ($) {

  $('.slick-slider').slick();

  $('.format-tab').on('shown.bs.tab', function (e) {
    const target = $(e.target).attr("data-bs-target");

    $(target).find('.slick-formats').slick('setPosition');
  });

  $('.header_burger').click(function (event) {
    $('.header_burger, .navbar-collapse').toggleClass('show');
    $('body').toggleClass('lock');
  });

  $('.list-toggle').click(function () {
    // Move up DOM tree to nearest list
    // Toggle collapsed and expanded classes
    $(this).closest('ul').toggleClass('collapsed').toggleClass('expanded');
  });


  // Glossary
  document.querySelectorAll('.glossary-block__btn').forEach(link => {
    link.addEventListener('click', (e) => {
      e.currentTarget.parentElement.classList.toggle('expanded');
    });
  });

  function glossaryFilter() {
    const input = document.getElementById('glossary-filter');
    const navButtons = document.querySelectorAll('.btn-glossary-nav');

    function clearFields(termBlocks, termItems, inputField) {
      termBlocks.forEach(block => block.classList.remove('inactive'));
      termItems.forEach(item => item.style.display = '');
      inputField.value = '';
    }

    if (input) {
      input.addEventListener('keyup', () => {
        const termBlocks = document.querySelectorAll('.glossary-block');
        const termItems = document.querySelectorAll('.glossary-block__item');
        const searchTerm = input.value.toUpperCase();

        navButtons.forEach(button => button.classList.remove('current'));

        termBlocks.forEach(block => block.classList.add('inactive'));
        termItems.forEach(item => item.style.display = 'none');

        termItems.forEach(item => {
          if (item.dataset.item.toUpperCase().includes(searchTerm)) {
            item.style.display = 'block';
            item.closest('.glossary-block').classList.remove('inactive');
          }
        });
      });

      navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const navData = button.dataset.nav;
          const termBlocks = document.querySelectorAll('.glossary-block');
          const termItems = document.querySelectorAll('.glossary-block__item');

          clearFields(termBlocks, termItems, input);

          navButtons.forEach(btn => btn.classList.remove('current'));
          e.target.classList.add('current');

          if (navData !== 'all') {
            termBlocks.forEach(block => {
              if (block.dataset.term !== navData) {
                block.classList.add('inactive');
              }
            });
          }
        });
      });
    }
  }

  glossaryFilter();


  const btnNav = document.getElementById('btnNav');
  btnNav && btnNav.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  const btnSubmenu = document.querySelectorAll('.header-navigation__item-icon');
  btnSubmenu.forEach(b => {
    b.addEventListener('click', function () {
      const openSubmenuParent = document.querySelector('.header-navigation__item.show');
      if (openSubmenuParent && openSubmenuParent !== this.parentNode) {
        openSubmenuParent.classList.remove('show');
      }

      const submenu = this.parentNode.querySelector('.header-navigation__sub');
      if (submenu) {
        this.parentNode.classList.toggle('show')
      }
    })
  })

  // Table of content
  const container = document.getElementById('ez-toc-container');
  if (container) {
    const anchors = document.querySelectorAll('.ez-toc-section');
    const links = document.querySelectorAll('.ez-toc-link');
    const activeClasses = ['btn-primary', 'text-white'];
    const headerHeight = document.getElementById('header').offsetHeight;

    links.forEach((link) => {
      link.classList.add('btn', 'btn-sm', 'text-start');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget.getAttribute('href').substring(1);
        const el = document.getElementById(target);
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - headerHeight - 30,
          behavior: 'smooth'
        });
      });
    });

    window.addEventListener('scroll', () => {
      let scrollTop = window.scrollY;

      links.forEach((link) => {
        link.classList.remove(...activeClasses);
      });

      for (let i = anchors.length - 1; i >= 0; i--) {
        const anchorTop = anchors[i].getBoundingClientRect().top + scrollTop - headerHeight - 40;

        if (scrollTop >= anchorTop) {
          links[i].classList.add(...activeClasses);
          break;
        }
      }
    });
  }

  // Referral links
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  const utmParameters = ['utm_rid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'rfd'];

  let utmData = {};

  utmParameters.forEach(param => {
    const paramValue = getParameterByName(param);
    if (paramValue) {
      utmData[param] = paramValue;
    }
  });

  if (Object.keys(utmData).length > 0) {
    localStorage.setItem('utmData', JSON.stringify(utmData));
  }

  // Tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  // Tabs
  const triggerTabList = document.querySelectorAll('.formats-nav__button');
  let currentIndex = 0;

  const btnNextTab = document.getElementById('btnNextTab');
  if (btnNextTab) {
    btnNextTab.addEventListener('click', function () {
      // Calculate the index of the next tab
      currentIndex = (currentIndex + 1) % triggerTabList.length;

      // Show the next tab
      const nextTabTrigger = new bootstrap.Tab(triggerTabList[currentIndex]);
      nextTabTrigger.show();
    });
  }

  // Adaptive table
  const wysiwygDivs = document.querySelectorAll("div.wysiwyg");

  wysiwygDivs.forEach(div => {
    wysiwygDivs.forEach(div => {
      const tables = div.querySelectorAll("table");

      tables.forEach(table => {
        const wrapper = document.createElement("div");
        wrapper.style.overflowX = "auto";
        wrapper.style.width = "100%";

        table.parentNode.insertBefore(wrapper, table);

        wrapper.appendChild(table);
      });
    });
  });

});

