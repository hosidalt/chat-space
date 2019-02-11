$(function(){

function buildAppendUserHTML(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                  <a class= "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id = "${user.id}" data-user-name ="${user.name}" > 追加
              </div>`
  return html;
  };
function appendUsetNameToMember(name ,id){
  var html =`<div class='chat-group-user clearfix js-chat-member'>
               <input id='readd_user' name='group[user_ids][]' type='hidden' value= ${id} class = 'add-newuser'>
               <p class='chat-group-user__name'>${name}</p>
               <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}">削除</a>
             </div>`
  return html;
  }
  // 読み込み時にcurrent_userのidを拾ってそれを入れた配列を作る

    var current_user = $("#current-user").val();
    var selected_users = [current_user]
    $(".group-users").each(function(i,ele){
      selected_users.push(ele.value);
      console.log(ele.value)
    });
    // console.log(selected_users)




  // インクリメンタルサーチ
  $('#user-search-field').on('keyup',function(){
    var input = $('#user-search-field').val();
    $('.user-search-result').empty();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input,
              selected_users: selected_users
            },
      dataType: 'json'
    })

    .done(function(users){
      if(users.length !== 0){
        users.forEach(function(user){
          var html = buildAppendUserHTML(user);
          $('.user-search-result').append(html)
        });
      }
    })
    .fail(function(){
      alert('ユーザー検索は失敗しました');
    })
  });


  // 追加ボタン
  $('.user-search-result').on('click','.user-search-add',function(){
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    var html = appendUsetNameToMember(name,id);

    selected_users.push(id);
    $('#user-name').append(html);
    // 検索結果から削除
    $(this).parent().remove();
  });

  $('#user-name').on('click','.user-search-remove',function(){
    $(this).parent().remove();
    // 押した人のidを取得してselected_usersから削除する JSのfilterメソッドを使う
    var readd = $(this).data("user-id");

    selected_users = selected_users.filter(function(id){
      return id !== readd;
    })
  });


});





