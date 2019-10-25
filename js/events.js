jQuery(function() {
  function getFilter(option) {
    const filter = option.dataset.filter;
    return filter;
  }

  function getUrl() {
    const url = new URL(location.href);
    return url;
  }

  function getParams(url) {
    const params = new URLSearchParams(url.search.slice(1));
    return params;
  }

  function setUrlParams(url, params, key, value) {
    url.searchParams.set(key.toLowerCase(), value);
    window.location.href = url;
  }

  function applyFilters() {
    const $filters = jQuery(".events__filter__option");
    if ($filters) {
      $filters.each((i, filter) => {
        jQuery(filter).on("change", function(e) {
          const value = encodeURI(e.target.value);
          const filterTitle = getFilter(e.target);
          const url = getUrl();
          const params = getParams(url);
          setUrlParams(url, params, filterTitle.toLowerCase(), value);
        });
      });
    }
  }

  function toggleMobileEventsNav(className, toggleTarget) {
    const $eventsNavToggle = jQuery(className);
    const $eventsNav = jQuery(toggleTarget);
    if ($eventsNavToggle && $eventsNav) {
      $eventsNavToggle.on("click", function(e) {
        e.preventDefault();
        $eventsNav.slideToggle();
        if (/show/gi.test($eventsNavToggle[0].innerText)) {
          $eventsNavToggle[0].innerText = "Hide Filters";
        } else if (/hide/gi.test($eventsNavToggle[0].innerText)) {
          $eventsNavToggle[0].innerText = "Show Filters";
        }
      });
    }
  }

  function eventsMobileNav() {
    const $viewOptions = jQuery(".events__nav--mobile select");
    if ($viewOptions) {
      $viewOptions.on("change", function(e) {
        const url = getUrl();
        const params = getParams(url);
        setUrlParams(url, params, "view", this.value);
      });
    }
  }

  function setHeightOfDivs(selector) {
    let t = 0;
    let t_elem;
    const element = ".events " + selector;
    const $cards = jQuery(element);
    if ($cards) {
      $cards.each(function() {
        $this = jQuery(this);
        if ($this.outerHeight() > t) {
          t_elem = $this;
          t = $this.outerHeight();
        }
      });
      $cards.each(function() {
        jQuery(this).css("min-height", t_elem.outerHeight());
      });
    }
  }

  function toggleVisibility(selector, value, hidden) {
    selector.val(value);
    if (hidden) {
      selector.parent().removeClass("event-creator__hidden");
      return;
    }
    selector.parent().addClass("event-creator__hidden");
  }

  function toggleLocationType() {
    const $locationTypeInput = jQuery("#location-type");
    const $locationAddress = jQuery("#location-address");
    const $locationNameLabel = jQuery("#location-name-label");
    $locationTypeInput.on("change", function() {
      $this = jQuery(this);
      if ($this.val() === "online") {
        toggleVisibility($locationAddress, "Online", false);
        $locationNameLabel.text("Online Meeting Link");
        return;
      }
      toggleVisibility($locationAddress, "", true);
      $locationNameLabel.text("Location Name");
    });
  }

  function clearErrors(input) {
    input.one("focus", function() {
      const $this = jQuery(this);
      const input_id = $this.attr("id");
      const $label = jQuery(`label[for=${input_id}]`);
      $this.removeClass("event-creator__error");
      $label.removeClass("event-creator__error-text");
    });
  }

  function checkInputs(inputs) {
    let $allClear = true;
    inputs.each(function() {
      const $this = jQuery(this);
      clearErrors($this);
      $allClear = validateCpg($allClear);
      const input_id = $this.attr("id");
      if (!$this.val() || $this.val() === "00:00" || $this.val() === "0") {
        const $label = jQuery(`label[for=${input_id}]`);
        $label.addClass("event-creator__error-text");
        $this.addClass("event-creator__error");
        $allClear = false;
      }
    });

    return $allClear;
  }

  function validateCpg(allClear) {
    const $cpgCheck = jQuery("#cpg");
    if (!$cpgCheck.prop("checked")) {
      const $label = jQuery("label[for=cpg]");
      $label.addClass("event-creator__error-text");
      $cpgCheck.one("change", function() {
        $label.removeClass("event-creator__error-text");
      });
      allClear = false;
    }
    return allClear;
  }

  function validateForm() {
    const $eventForm = jQuery("#event-form");
    if ($eventForm) {
      const $requiredInputs = jQuery("input,textarea,select").filter(
        "[required]"
      );
      const $submitBtn = $eventForm.find("#event-creator__submit-btn");
      $submitBtn.on("click", function(e) {
        e.preventDefault();
        const allClear = checkInputs($requiredInputs);
        if (allClear) {
          $eventForm.submit();
        }
      });
    }
  }

  function init() {
    toggleMobileEventsNav(".events__nav__toggle", ".events__nav");
    toggleMobileEventsNav(".events__filter__toggle", ".events__filter");
    eventsMobileNav();
    applyFilters();
    window.addEventListener("resize", function() {
      setHeightOfDivs(".events__tags");
      setHeightOfDivs(".card__description");
    });
    setHeightOfDivs(".events__tags");
    setHeightOfDivs(".card__description");
    toggleLocationType();
    validateForm();
  }

  init();
});
