/*
 * storeLike.js
 * https://qiita.com/sayama0402
 *
 * Copyright (c) 2017 Ken Sayama
 * Licensed under the MIT license.
*/

(function($){
  $.fn.storeLike = function(options) {

    /* ----------------------------------------------
     ◇ default variable
    -----------------------------------------------*/

    var page_id = window.location.href.match(".+/(.+?)\.[a-z]+([\?#;].*)?$"); if (!page_id) {delete page_id;} else {page_id = Number(page_id[1]);}
    var favorite_id = 0; if (store.get(page_id)) {var favorite_id = store.get(page_id).favorite_id;}
    var favoriteLists = [];
    var object = {};

    var reg=/(.*)(?:\.([^.]+$))/;

    /* ----------------------------------------------
     ◇ options variable
    -----------------------------------------------*/

    var defaults = {
      btn : $('#storeLike-btn'),
      addBtnText : "お気に入りに追加する",
      removeBtnText : "お気に入りに追加済み",
      storeLikeShowCounts : $('#storeLike-show-counts'),
      storeLikeShowLists : $('#storeLike-show-lists'),
      data: {}
    };

    var settings = $.extend(defaults, options);

    /* ----------------------------------------------
     ◇ Event Handler
    -----------------------------------------------*/

    settings.btn.click(function(){
      //var id = window.location.href.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1]; // ページのURLからidを正規表現で抜き出して作成
      if (settings.btn.hasClass('passive')) {
        $(this).removeClass('passive fa-star-o').addClass('active fa-star').text(settings.removeBtnText);
        setData(page_id);
      } else if (settings.btn.hasClass('active')){
        $(this).removeClass('active fa-star').addClass('passive fa-star-o').text(settings.addBtnText);
        removeData();
      }
    });

    (function() {
      store.each(function(value, key){
        favoriteLists.push(store.get(key))
      });
    })()
    settings.storeLikeShowCounts.text(favoriteLists.length);

    (function() {
      if (favorite_id == page_id) {
        settings.btn.removeClass('passive fa-star-o').addClass('active fa-star').text(settings.removeBtnText);
      } else {
        settings.btn.removeClass('active fa-star').addClass('passive fa-star-o').text(settings.addBtnText);
      }
    })()

    /* ----------------------------------------------
     ◇ set data for localStorage
    -----------------------------------------------*/

    function setData(page_id){
      object.favorite_id = page_id;
      object.favorite_url = window.location.href;

      for (var d in settings.data){
        object['favorite_'+d] = eval('settings.data.'+d);
      }

      store.set(page_id, object);
    }

    /* ----------------------------------------------
     ◇ remove data for localStorage
    -----------------------------------------------*/

    function removeData(){
      store.remove(page_id);
    }

    /* ----------------------------------------------
     ◇ push data for display all
    -----------------------------------------------*/
    //console.log(favoriteLists);
    // for (var i = 0; i < favoriteLists.length; i++) {
    //   settings.storeLikeShowLists.append(
    //     '<li>'+
    //       '<a href="' + favoriteLists[i].favorite_url + '">'+
    //         '<img src="' + favoriteLists[i].favorite_image + '" alt="' + favoriteLists[i].favorite_title + '">'+
    //         '<div>'+
    //           '<h5>'+ favoriteLists[i].favorite_title + '</h5>'+
    //           // for (var f in favoriteLists[i]) {
    //           //   //console.log(eval("favoriteLists[i]."+f));
    //           //   if (f == 'favorite_id' || f == 'favorite_url' || f == 'favorite_image' || f == 'favorite_title') {
    //           //     continue;
    //           //   }
    //           //   '<p class="' + f + '">' + eval("favoriteLists[i]."+f) + '</p>'+
    //           // }
    //         '</div>'+
    //       '</a>'+
    //     '</li>'
    //   );
    //   for (var f in favoriteLists[i]) {
    //     if (f == 'favorite_id' || f == 'favorite_url' || f == 'favorite_image' || f == 'favorite_title') {
    //       continue;
    //     }
    //     settings.storeLikeShowLists.find('div').append('<p class="' + f + '">' + eval("favoriteLists[i]."+f) + '</p>');
    //   }
    // }
    for (var i = 0; i < favoriteLists.length; i++) {
      settings.storeLikeShowLists.append(
        '<li>'+
          '<a href="' + favoriteLists[i].favorite_url + '">'+
            '<img src="' + favoriteLists[i].favorite_image + '" alt="' + favoriteLists[i].favorite_title + '">'+
            '<div>'+
              '<h5>'+ favoriteLists[i].favorite_title + '</h5>'+
              // for (var f in favoriteLists[i]) {
              //   //console.log(eval("favoriteLists[i]."+f));
              //   if (f == 'favorite_id' || f == 'favorite_url' || f == 'favorite_image' || f == 'favorite_title') {
              //     continue;
              //   }
              //   '<p class="' + f + '">' + eval("favoriteLists[i]."+f) + '</p>'+
              // }
            '</div>'+
          '</a>'+
        '</li>'
      );
      for (var f in favoriteLists[i]) {
        if (f != 'favorite_id' || f != 'favorite_url' || f != 'favorite_image' || f != 'favorite_title') {
          continue;
        }
        //settings.storeLikeShowLists.find('div').append('<p class="' + f + '">' + eval("favoriteLists[i]."+f) + '</p>');
        console.log(eval("favoriteLists[i]."+f));
      }
    }
  };
}(jQuery));
