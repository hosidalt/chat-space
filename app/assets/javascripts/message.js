$(function(){
  function buildHTML(message){
   const addImage = (message.image)?`<img = "${message.image}">`:''
   const html = `<div class="chat__body__list">
                 <div class= "chat__body__list__message.clearfix">
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
                 </div>
               </div>`

    return html;
  }
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
        $('.chat__footer__form-body__form-message').val('')
        function getScrollTop(){
          $('.chat__body')
        }
        $('.chat__body').animate({scrollTop: $('.chat__body')[0].scrollHeight}, 'fast');
      })

});
