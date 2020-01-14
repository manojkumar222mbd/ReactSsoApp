chrome.storage.sync.get(function (items) {
  var ssoJson = [
    {
      "id": 101,
      "title": "Dat",
      "url": "https://power.dat.com",
      "logo": "dat.png"
    },
    {
      "id": 102,
      "title": "Carrier411",
      "url": "https://carrier411.com",
      "logo": "carrier.png"
    },
    {
      "id": 103,
      "title": "Post Everywhere",
      "url": "https://app.posteverywhere.com",
      "logo": "pe.png"
    },
    {
      "id": 104,
      "title": "Truckstop",
      "url": "https://truckstop.com",
      "logo": "truckstop1.png"
    },
    {
      "id": 105,
      "title": "Aljex",
      "url": "https://vlin.aljex.com/vlin",
      "logo": "carrier.png"
    },
    {
      "id": 106,
      "title": "Truckstop Pay",
      "url": "https://pay.truckstop.com/#/Notifications",
      "logo": "tpay.svg"
    }, {
      "id": 107,
      "title": "TMS",
      "url": "https://valueloads.com/valueloads",
      "logo": "valueloads.png"
    }
  ];


  function renderApps() {
    var appHtml = "";
    ssoJson.forEach(function (val, i) {

      appHtml += `<tbody class="appLink list-wrapper" data-id="` + val.id + `" data-url="` + val.url + `">
      <tr>
          <td data-id="` + val.id + `" data-url="` + val.url + `">
                  <div class="app-logo"> <img
                          src="images/`+ val.logo + `"
                          alt=""> </div>
                  <div class="app-info">
                      <h4 class="app-title">`+ val.title + `</h4>
                      <p class="app-description">`+ val.url + `</p>
                  </div>`;
      if (items['ssouser' + val.id]) {
        appHtml += `<span class="btn-remove" id="rem` + val.id + `" style="color:#da3939;float: right;margin-top: 12px;display:block"><i class="fa fa-trash fa-lg" ></i></span>`;
      } else {
        appHtml += `<span class="btn-remove" id="rem` + val.id + `" style="color:#da3939;float: right;margin-top: 12px;display:none"><i class="fa fa-trash fa-lg" ></i></span>`;
      }

      if (items['ssouser' + val.id]) {
        appHtml += `<span class="btn-cog" id="cog` + val.id + `" style="color:#008AD7;float: right;margin-top: 12px;display:none" ><i class="fa fa-cog fa-lg" ></i></span>`;
      } else {
        appHtml += `<span class="btn-cog" id="cog` + val.id + `" style="color:#008AD7;float: right;margin-top: 12px;display:block"><i class="fa fa-cog fa-lg" ></i></span>`;
      }

      appHtml += `</td></tr></tbody>`;
    });
    $('.data-list-table').empty();
    $('.data-list-table').html(appHtml);
  }

  renderApps();

  $(".appLink").on("click", function (e) {
    var appId = $(this).attr("data-id");
    var appUrl = $(this).attr("data-url");
    var setKey = { ssoExt: true };
    setKey['ssoClick' + appId] = true;
    chrome.storage.sync.set(setKey, function () { });
    chrome.tabs.create({ url: appUrl });
  });

  $(".btn-remove").on("click", function (e) {
    e.stopPropagation();
    var appId = e.currentTarget.parentNode.dataset.id;
    $("#cog" + appId).show();
    $("#rem" + appId).hide();
    chrome.storage.sync.remove(['ssouser' + appId], function (items) { });
  });

  $(".user-setting-button").on("click", function (e) {
    var appId = $("#sso_id").val();
    var u = $("#sso_user").val();
    var p = $("#sso_pass").val();
    if (!u || !p) {
      $('#sso_user').css('border-color', 'red');
      $('#sso_pass').css('border-color', 'red');
      return;
    }
    var setKey = {};
    setKey['ssouser' + appId] = { u: u, p: p };
    chrome.storage.sync.set(setKey, function (items) { });
    $("#cog" + appId).hide();
    $("#rem" + appId).show();
    $(".user-settings-page").hide();
  });

  $(".btn-cog").on("click", function (e) {
    e.stopPropagation(); console.log(e)
    $('#sso_user').val('').css('border-color', 'black');
    $('#sso_pass').val('').css('border-color', 'black');
    var appId = e.currentTarget.parentNode.dataset.id;
    $("#sso_id").val(appId);
    $(".user-settings-page").show();
  });

  $(".user-settings-close").on("click", function (e) {
    $(".user-settings-page").hide();
  });

  $('.list-wrapper').hover(
    function () {
      jQuery(this).addClass('selected-row');
    }, function () {
      jQuery(this).removeClass('selected-row');
    }
  );

  $(".search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".data-list-table tbody").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});