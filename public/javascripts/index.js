(function(){

// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>',
    addButton = $('#add'),
    connected = $('.connected'),      // 三個 <ul>
    placeholder = $('#placeholder'),  // 三個 <ul> 的容器
    mainUl = $('.main'),              // main <ul>
    deleteUl = $('.delete'),          // delete <ul>
    doneUl = $('.done');             // done <ul>
var id, new_position;

addButton.on('click', function(){
	$(tmpl).addClass('is-editing').appendTo(mainUl).find('input').focus();
});

function load() {
	$.ajaxSetup({cache: false});
	$.ajax({
		url: "/items",
	    type: 'get',
	    success: function(response) {
	    	if (response === '{}') {
	    		// alert('You need to add a new item');
	    		return;
	    	}
	    	else {
		    	var array = JSON.parse(response);
				for (var i = 0; i < array.length; i++) {
					if (array[i].isDone === '1') {
						$(tmpl).appendTo(mainUl).find('span').text(array[i].text).parents('li').addClass('is-done');
					}
					else {
						$(tmpl).appendTo(mainUl).find('span').text(array[i].text);
					}
				}
	    	}	
	    },
        error: function() {
  		  	alert('Error...');
        },
        complete: function() {	 
           	// alert("load complete"); 
        }
	 });
}

mainUl.on('keyup', 'input', function(e){
	// console.log(e.which);
	var input = $(this),
		li = input.parents('li');
	if (e.which === 13) {
		li.find('span').text(input.val());
		li.removeClass('is-editing');
		$.ajaxSetup({cache: false});
		$.ajax({
		        url: "/items",
		        type: 'POST',
		        data: {'item': input.val()},
		        dataType: 'json',
		        success: function(response) {
		        	// alert(response.input.val());
		        },
		        error: function() {
		        	// alert('Error');
		        },
		        complete: function() {
		        	// alert("complete"); 
		        }
		 });
		}
});

placeholder.on('mousedown', '.main', function(){
		placeholder.addClass('is-dragging');
});
placeholder.on('mouseup', function(){
		placeholder.removeClass('is-dragging');
});


mainUl.sortable({
	connectWith: 'ul',
	tolerance: 'pointer',
	start: function(event, ui){
		id = ui.item.index();
	},
	stop: function(event, ui){
		new_position = ui.item.index();
		if (id !== new_position && new_position !== -1) {
			$.ajax({
				url:'/items/'+ id + '/reposition/' + new_position,
				type: 'PUT',
				success: function(response){
					// alert('success');
				}
			});
		}
	}
});  
doneUl.sortable({
	connectWith: 'ul',
	tolerance: 'pointer',
	receive: function(event, ui){
		$(ui.item).addClass('is-done');	
		$.ajax({
			url: '/items/' + id,
			type: 'PUT',
			success: function() {
			}
		});

		$(ui.item).appendTo( $(ui.sender) );

	}
});

deleteUl.sortable({
	connectWith: 'ul',
	tolerance: 'pointer',
	receive: function(event, ui){
		$.ajax({
			url: '/items/' + id,
			type: 'DELETE',
			success: function() {
			}
		});
		$(ui.item).remove();
	}
});

load();

}());