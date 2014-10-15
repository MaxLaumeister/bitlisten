/**
 * jquery-qr ( //http://github.com/farmisen/jquery-qr/ ) 
 * Copyright (c) Fabrice Armisen 2010
 * Licensed under the MIT license ( http://www.opensource.org/licenses/mit-license.php )
 *
 * Modified by Maximillian Laumeister for BitListen.com
 */
 
 (function ($) {

  $.fn.qr = function (options) {

    return this.each(function () {

      var settings = {
        'size': '230',
        'delay': '0'
      };

      if (options) {
        $.extend(settings, options);
      }

      var $this = $(this);

      $this.qr_div = createQR($this.attr('qrtarget'), settings.size);

      $this.mouseenter(function (event) {
        $this.qr_timeout_id = window.setTimeout(function () {
          $($this.qr_div).css({
            'display': 'block',
            'top': event.pageY + 5,
            'left': event.pageX + 15
          });
        }, settings.delay);

      });

      $this.mouseleave(function (event) {
        if ($this.qr_timeout_id != null) {
          window.clearTimeout($this.qr_timeout_id);
          $this.qr_timeout_id = null;
        }
        $($this.qr_div).css({
          display: "none"
        });

      });
    }); //each

    function createQR(href, size) {
      var url = escape(href);
      while (url.indexOf('/') != -1) url = url.replace('/', '%2f');

      var qr = document.createElement("div");
      $qr = $(qr)
      $qr.css({
        'background': "url('http://chart.apis.google.com/chart?cht=qr&chs=" + size + "x" + size + "&chl=" + url + "') no-repeat",
        'width': size + 'px',
        'height': size + 'px',
        'display': "none",
        "border-style": "solid",
        'border-width': "1px",
        'position': 'absolute',
        'z-index': '1000'
      });
      $('body').append($qr);
      return qr;
    }

  };
})(jQuery);