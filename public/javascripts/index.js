(function(){

// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>',
    addButton = $('#add'),
    connected = $('.connected'),      // 三個 <ul>
    placeholder = $('#placeholder'),  // 三個 <ul> 的容器
    mainUl = $('.main'),              // main <ul>
    deleteUl = $('.delete'),          // delete <ul>
    doneUl = $('.done');             // done <ul>
var index;

addButton.on('click', function(){
	$(tmpl).addClass('is-editing').appendTo(mainUl).find('input').focus();
});

function save() {
	var array = [], done = [], 
		data = {"TODO":[]};
	$(mainUl).find('span').each(function(){
		array.push($(this).text());
		if ($(this).parents('li').hasClass('is-done')) {
			done.push(1);
		}
		else {
			done.push(0);
		}
	});
	for (var i = 0; i < array.length; i++) {
		data.TODO.push({text:array[i], isDone:done[i]});
	}
	$.ajaxSetup({cache: false});
	$.ajax({
	        url: "/items",
	        type: 'post',
	        data: data,
	        success: function(response) {
	        	// alert('Write success');
	        },
	        error: function() {
	        	// alert('Error');
	        },
	        complete: function() {
	        	// alert("complete"); 
	        }
	 });
}

function load() {
	$.ajaxSetup({cache: false});
	$.ajax({
		url: "/items",
	    type: 'get',
	    success: function(response) {
	    	console.log(response);
	    	if (response === '{}') {
	    		alert('You need to add a new item');
	    		return;
	    	}
	    	else {
		    	var array = JSON.parse(response);
				for (var i = 0; i < array.TODO.length; i++) {
					if (array.TODO[i].isDone === '1') {
						$(tmpl).appendTo(mainUl).find('span').text(array.TODO[i].text).parents('li').addClass('is-done');
					}
					else {
						$(tmpl).appendTo(mainUl).find('span').text(array.TODO[i].text);
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
		save();
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
	stop: save
});  
doneUl.sortable({
	connectWith: 'ul',
	tolerance: 'pointer',
	receive: function(event, ui){
		alert(ui.item.index());
		$(ui.item).addClass('is-done');		
		$(ui.item).appendTo( $(ui.sender) );

		$.ajax({
			url: '/items/3',
			type: 'put',
			success: function() {
				alert('aasaaa');
			}
		});
	}
});
deleteUl.sortable({
	connectWith: 'ul',
	tolerance: 'pointer',
	receive: function(event, ui){
		$(ui.item).remove();
	}
});

load();

}());