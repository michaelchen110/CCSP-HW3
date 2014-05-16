(function(){

// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>',
    addButton = $('#add'),
    connected = $('.connected'),      // 三個 <ul>
    placeholder = $('#placeholder'),  // 三個 <ul> 的容器
    mainUl = $('.main'),              // main <ul>
    deleteUl = $('.delete'),          // delete <ul>
    doneUl = $('.done');              // done <ul>

addButton.on('click', function(){
	$(tmpl).addClass('is-editing').appendTo(mainUl).find('input').focus();
});

function save() {
	var array = [],
		done = [];
	$(mainUl).find('span').each(function(){
		array.push($(this).text());
		if ($(this).parents('li').hasClass('is-done')) {
			done.push(1);
		}
		else {
			done.push(0);
		}
	});
	console.log("Array: ", array);
	console.log("Done:", done);
	$.ajaxSetup({
		cache: false
	});
	var jqxhr =
	    $.ajax({
	        url: "/items",
	        type: 'post',
	        data: {
	            name : array,
	            isDone : done
	        },
	        success: function(response) {
	        	console.log(response[0].text);
	        	// json = JSON.parse(response);
	    		// alert("Success: " + json.text);
				// alert('Success: ' + response);
	    		// console.log("success");
	        },
	        error: function() {
	        	alert('Error');
	        },
	        complete: function() {
	        	// alert("complete"); 
	        }
	    });
	localStorage.items = JSON.stringify(array);
	localStorage.done = JSON.stringify(done);
}

function load() {
	if (!localStorage.items) {
		console.log('null');
		return;
	}
	var array = JSON.parse(localStorage.items);
	var done = JSON.parse(localStorage.done);
	for (var i = 0; i < array.length; i++) {
		if (done[i] === 1) {
			$(tmpl).appendTo(mainUl).find('span').text(array[i]).parents('li').addClass('is-done');
		}
		else {
			$(tmpl).appendTo(mainUl).find('span').text(array[i]);
		}
	}
	// console.log(array);
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
});  //.on('sortstop', save);
doneUl.sortable({
	connectWith: 'ul',
	tolerance: 'pointer',
	receive: function(event, ui){
		$(ui.item).addClass('is-done');
		$(ui.item).appendTo( $(ui.sender) );
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