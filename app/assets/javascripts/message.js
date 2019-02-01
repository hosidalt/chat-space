$(function(){

  function update() {
    var message_latest = $('.chat__body__list__message:last').data('id') || 0;
    console.log(message_latest)
    $.ajax({
      type: "GET",
      url: location.href,
      data: {
        message: {id: message_latest}
      },
      dataType: "json"
    })

    .done(function(messages){
      $.each(messages,function(num,message){
        var html = buildHTML(message);
        $('.chat__body__list').append(html)
        $('.chat__body').animate({scrollTop: $('.chat__body')[0].scrollHeight}, 'fast');
      })
    })
    .fail(function() {
      alert('hello');
    });
  };


  function buildHTML(message){
   const addImage = (message.image)?`<img src= "${message.image}">`:''
   const html = `<div class= "chat__body__list__message clearfix" data-id = ${message.id}>
                   <div class= "chat__body__list__message__name">
                     ${message.user_name}
                   </div>
                   <div class= "chat__body__list__message__time">
                     ${ message.created_at }
                   </div>
                 </div>
                 <div class= "chat__body__list__message__body">
                   ${message.content}
                 <img src="${addImage}">
               </div>`
    return html;
  }
  // 自動更新 location.hrefが'/groups/番号/messagesg'だけで動くようにif文で条件分岐
  var url = location.pathname;
  var group_id = $(".chat__header").data('group-id')
  // if( url == `/groups/${group_id}/messages`) {
  //   $(function(){
  //     setInterval(update,5000);
  //   });
  // }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
      var formData = new FormData(this);

      var url = $(this).attr('action');
      $.ajax({
        type: "POST",
        url: url,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat__body__list').append(html)
        $('.submit').attr("disabled",false)
        $('.new_message')[0].reset();
        $('.chat__body').animate({scrollTop: $('.chat__body')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('error');
      })
  })
});
