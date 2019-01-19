$(function(){

function buildAppendUserHTML(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                  <a class= "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id = ${user.id} data-user-name = ${user.name} > 追加
              </div>`
  return html;
  };
function appendUsetNameToMember(name ,id){
  var html =`<div class='chat-group-user clearfix js-chat-member'>
               <input name='group[user_ids][]' type='hidden' value= ${id}>
               <p class='chat-group-user__name'>${name}</p>
               <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
             </div>`
  return html;
  }

  // インクリメンタルサーチ
  $('#user-search-field').on('keyup',function(){
    var input = $('#user-search-field').val();
    $('.user-search-result').empty();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
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
    $('#user-name').append(html);
    // 検索結果から削除
    $(this).parent().remove();
  });

  $('#user-name').on('click','.user-search-remove',function(){
    $(this).parent().remove();
  });


});


