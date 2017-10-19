/*
 * storeLike.js
 * https://qiita.com/sayama0402
 *
 * Copyright (c) 2017 Ken Sayama
 * Licensed under the MIT license.
*/

(function($){
  // storeLikeという独自メソッドを定義
  $.fn.storeLike = function(options) {

    /* ----------------------------------------------
     ◇ 変更しない変数
    -----------------------------------------------*/
    var page_id = window.location.href.match(".+/(.+?)\.[a-z]+([\?#;].*)?$"); if (!page_id) {delete page_id;} else {page_id = Number(page_id[1]);}
    // トップページで変数未定義エラーがおきてしまうので、以下の分岐で対処

    // 全てのお気に入りを管理する配列
    var favoriteList = [];

    // お気に入りのid
    var favorite_id = 0; if (store.get(page_id)) {var favorite_id = store.get(page_id).favorite_id;}

    // 以下で初期値をセットしておく
    var defaults = {
      // title : $('[itemprop="title"]').text(),
      // image : $('#bxslider li').first().children('img').attr('src'),
      // salary : $('.storage-salary').text(),
      // location : $('.storage-location').text(),
      // jobCategory : $('.storage-job-category').text(),
      // jobStatus : $('.storage-job-status').text(),
      btn : $('.storeLike-btn'),
      addBtnText : "お気に入りに追加する",
      removeBtnText : "お気に入りに追加済み",
      favoriteCount : $('.storeLike-count'),
      object: {}
    };

    // 関数が実行された際に引数があれば、引数を上書きして実行
    var settings = $.extend(defaults, options);
    //alert(settings.object);
    console.log(settings.object);
  };
}(jQuery));
