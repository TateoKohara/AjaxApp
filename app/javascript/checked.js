function check() {
  const posts = document.getElementsByClassName("post");
  postsA = Array.from(posts);　// 取得したDOMを配列に変換している

  postsA.forEach(function (post) { 
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");// 投稿をクリックした場合に実行する処理を定義している
    post.addEventListener("click", (e) => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);//リクエストの初期化
      XHR.responseType = "json";//レスポンスとして欲しい情報の形式を指定
      XHR.send();//リクエストを送信、openメソッドで非同期通信をtrueにしてるのですぐレスポンスされる
      XHR.onload = () => { // レスポンスを受け取った時の処理を記述する
        const item = XHR.response.post;
        if (item.checked === true){
          post.setAttribute("data-check", "true");// 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
        } else if (item.checked === false) {
          post.removeAttribute("data-check");　// 未読状態であれば、カスタムデータを削除している
        }
        if (XHR.status != 200) {    //レスポンスがエラーだった時の記述
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      }
      XHR.onerror = () => {    //リクエストの送信が失敗だった時の記述
        alert("Request failed");
      };

      e.preventDefault(); //イベントバンドラー実行後イベントをキャンセルする記述

     });
  });
}

setInterval(check,1000); //check関数が1秒に1度実行される

window.addEventListener("load", check);