$(function(){

function appendUser(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                  <a class= "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id = ${user.id} data-user-name = ${user.name} > 追加
              </div>`
  return html;
  }

  $('#user-search-field').on('keyup',function(){
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(data){
      if(data.length !== 0){
        data.forEach(function(user){
          var html = appendUser(user);
          $('.user-search-result').append(html)
        });
      }
      // $('#user-search-field')[0].reset();
    })
    .fail(function(){
      alert('ユーザー検索は失敗しました');
    })

function buildHTML(name){
  var html =``
}

  $(document).on('click','.user-search-add',function(){
    buildHTML()
  })


  });
});
