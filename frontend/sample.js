let link ='http://localhost:3000/notes'
let val = $('.onebyone');let editid;

function getting() {
    $.ajax({
       url:link,
       method:'GET',
       success:function(response){
           $.each(response,function(e,i){
               append(i.title,i.name,i.id)
           })
       },
       error:function(error){console.log(error)}
    })}getting()

$('#submit').click(function () {
    if ($('#input').val() == "" || $('#desc').val() == '') {
        alert('Field is empty'); return
    }
    if($('#submit').text()=='edit'){
        $.get(`${link}/${editid}`,function(){
            $.ajax({
                url:`${link}/${editid}`,
                type:'PUT',
                data:{
                    title:$('#input').val(),
                    name:$('#desc').val()
                }
            })
        })
        $('#submit').text('submit');editid;return
    }
    $.ajax({
        url:link,
        type:'POST',
        data:{
            title:$('#input').val(),
            name:$('#desc').val()
        },
        success:function(){
          getting()
        },
        error:function(error){console.log(error)}
    })
})

function append(a,b,c){
        val.append(`<div class="subdiv"><label for="">Name</label>
            <span>${a}</span>
            <label for="">Title</label>
             <span>${b}</span><span>${new Date().toLocaleDateString()}</span><button id=${c} class="edit">Edit</button>
            <button class="delete" id=${c}>Delete</button></div>`)
}

val.on('click','.edit',function(event){
    $.get(`${link}/${event.target.id}`,function(response){
        editid=event.target.id;$('#submit').text('edit');
        $('#section').show();
        $('#input').val(response.title);$('#desc').val(response.name)
    })
})
val.on('click','.delete',function(event){
$.ajax({
    url:`${link}/${event.target.id}`,
    type:'DELETE',
    success:function(){
        getting()
      },
      error:function(error){console.log(error)}
})
})


