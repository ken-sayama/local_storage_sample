$(function() {
  /* ----------------------------------------------
   ◇ 扱う変数 / 取得して扱う変数
  -----------------------------------------------*/
  // データ取得関連変数
  var page_url = window.location.href;
  var id = window.location.href.match(".+/(.+?)\.[a-z]+([\?#;].*)?$");
  // トップページで変数未定義エラーがおきてしまうので、以下の分岐で対処
  if (!id) {delete id;} else {id = Number(id[1]);}
  var title = $('[itemprop="title"]').text();
  var image = $('#bxslider li').first().children('img').attr('src');
  var salary = $('.storeLike-salary').text();
  var location = $('.storeLike-location').text();
  var jobCategory = $('.storeLike-job-category').text();
  var jobStatus = $('.storeLike-job-status').text();

  // イベントハンドラ変数
  var btn = $('.storeLike-btn');
  var addBtnText = "お気に入りに追加する";
  var removeBtnText = "お気に入りに追加済み";

  // 全てのお気に入りを管理する配列
  var favoriteList = [];

  // お気に入り数のカウント
  var favoriteCount = $('.storeLike-count');

  // お気に入りのid
  var favorite_id = 0;
  if (store.get(id)) {var favorite_id = store.get(id).favorite_id;}



  /* ----------------------------------------------
   ◇ 配列内検索
  -----------------------------------------------*/

  function judgmentFavorite(id){
    if (favoriteList.indexOf(id) >= 0) {
      // 存在する場合の処理
    } else {
      // 存在しない場合の処理
    }
  }

  /* ----------------------------------------------
   ◇ トップページ
  -----------------------------------------------*/
  // store.each(function(value, key){
  //   var data = store.get(key);
  //   console.log(data);
  // });

  (function() {
    store.each(function(value, key){
      var data = store.get(key);
      favoriteList.push(data);
    });
  })()
  //
  // $(window).unload(function(){
  //   store.each(function(value, key){
  //     var data = store.get(key);
  //     favoriteList.push(data);
  //   });
  // });
  //console.log(favoriteList);
  favoriteCount.text(favoriteList.length);

  // <ul id="favorite-show-list">の中に気に入りの数だけ、リスト要素を生成</ul>
  for (var i = 0; i < favoriteList.length; i++) {
    $('#storeLike-show-list').append(
      '<li>'+
        '<a href="'+ favoriteList[i].favorite_url +'">'+
          '<img src="' + favoriteList[i].favorite_image + '" alt="' + favoriteList[i].favorite_title + '">'+
          '<div class="storeLike-show-list-inner">'+
            '<h5 class="storeLike-show-list-title">' + favoriteList[i].favorite_title + '</h5>'+
            '<b class="storeLike-show-list-salary">' + favoriteList[i].favorite_salary + '</b>'+
            '<p class="storeLike-show-list-location">' + favoriteList[i].favorite_location + '</p>'+
            '<p class="storeLike-show-list-job-category">職種：' + favoriteList[i].favorite_jobCategory + '</p>'+
            '<p class="storeLike-show-list-job-status">雇用形態：' + favoriteList[i].favorite_jobStatus + '</p>'+
          '</div>'+
        '</a>'+
      '</li>'
    );
  }


  /* ----------------------------------------------
   ◇ イベントハンドラ
  -----------------------------------------------*/
  // ボタンをクリックした時のイベント処理
  btn.click(function(){
    //var id = window.location.href.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1]; // ページのURLからidを正規表現で抜き出して作成
    if (btn.hasClass('passive')) {
      $(this).removeClass('passive fa-star-o').addClass('active fa-star').text(removeBtnText);
      addFavorite(id);
    } else if (btn.hasClass('active')){
      $(this).removeClass('active fa-star').addClass('passive fa-star-o').text(addBtnText);
      deleteFavorite();
    }
  });

  // ページ読み込み時にページのidに一致するお気に入りがあるかどうかの分岐
  (function() {
    //console.log(favorite_id == id);
    if (favorite_id == id) {
      //btn.removeClass('fa-star').addClass('passive fa-star-o').text(addBtnText);
      btn.removeClass('passive fa-star-o').addClass('active fa-star').text(removeBtnText);
    } else {
      //btn.removeClass('fa-star-o').addClass('active fa-star').text(removeBtnText);
      btn.removeClass('active fa-star').addClass('passive fa-star-o').text(addBtnText);
    }
  })()

  /* ----------------------------------------------
   ◇ データを登録
  -----------------------------------------------*/

  function addFavorite(id){
    var object = {
      favorite_id:          id,
      favorite_url:         page_url,
      favorite_title:       title,
      favorite_image:       image,
      favorite_salary:      salary,
      favorite_location:    location,
      favorite_jobCategory: jobCategory,
      favorite_jobStatus:   jobStatus
    }
    // オブジェクトを登録
    store.set(id, object);
  }

  /* ----------------------------------------------
   ◇ データを削除
  -----------------------------------------------*/

  function deleteFavorite(){
    // 削除
    store.remove(id);
  }

});
