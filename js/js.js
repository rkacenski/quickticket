var storage = window['localStorage'];

var token = storage.getItem('token');

function auth() {
	console.log(token);
	if(token != null) {
		console.log('her');
	} else 
		window.location = 'signin.html';
}

function logout(){
	storage.removeItem('token');
	window.location = 'signin.html';
}

function create_ticket() {
	
	var data = $('form').serializeArray();
	
	$.ajax({
		type: "POST",
		url: "api/index.php?uri=tickets/create",
		crossDomain: true,
		data: {'token': token, 'ticket': data},
		dataType: "json",
		success: function (data, status, jqXHR)
		{
			if(data.ticket) {
				window.location = 'ticket.html#'+data.ticket;
			} else if(data.error) {
				console.log('nah');
			}
		}
	});
}

function find_tickets() {
	$.ajax({
		type: "POST",
		url: "api/index.php?uri=tickets/find",
		crossDomain: true,
		data: {'token': token},
		dataType: "json",
		success: function (data, status, jqXHR)
		{
			$('#ticket-data > tbody').html("");
			
			if(data.error) {
				window.location = 'login.html';
			} else if(data.no_tickets){
				console.log('sdf');
				$('#ticket-data > tbody').append(
					"<tr>"
					+"<td colspan='7' style='text-align: center; font-size: 18px;'>You currently have no tickets</td>"
					+"</tr>"
				);
			} else {
				$.each(data, function(i, item) {
		        	var $tr = $('#ticket-data > tbody').append(
					"<tr id='"+item.id+"'>"
					+"<td>"+item.id+"</td>"
					+"<td>"+item.opened+"</td>"
					+"<td>"+item.updated+"</td>"
					+"<td>"+item.subject+"</td>"
					+"<td>"+item.priority+"</td>"
					+"<td>"+item.status+"</td>"
					+"<td> <a href='ticket.html#"+item.id+"'>Open</a> <br/><br/> <a href='#' class='delete' onclick='delete_ticket(" +item.id+")'>Delete</a> </td>"
					+"</tr>"
		        	);
				});
			}
		}
	});
}

function get_ticket(id) {
	
	if(id) {
	$.ajax({
		type: "POST",
		url: "api/index.php?uri=tickets/get",
		crossDomain: true,
		data: {'token': token, 'tid': id},
		dataType: "json",
		success: function (data, status, jqXHR)
		{
			if(data.error) {
				window.location = 'login.html';
			} else {
				$.each(data, function(i, item) {
		        	var $tr = $('table #'+i).text(item);
				});
				
				$("#ticket_sub").text(data.subject);
				//console.log(messages);
				$.each(data.messages, function(i, item) {
					
					var initals = item.name.split(' ')[0].substring(0, 1);
					initals = initals+item.name.split(' ')[1].substring(0, 1);
					
					if(item.admin == 1)
						var addclass = 'admin'; 
					else
						var addclass = "";
					
					$('#message-container').append(
						"<div class='row messages'>"
						+"<div class='column-3'><span class='initals "+addclass+"'>"+initals+"</span><br><br><span id='pname'>"+item.name+"</span></div>"
						+"<div class='column-9'><p>"+item.message+"</p><span class='date'>"+item.date+"</span></div>"
					);
				});
			}
			
			
		}
	});
	}
}

function add_message(tid)
{
	var message = $('textarea').val();
	console.log(message);
	$.ajax({
		type: "POST",
		url: "api/index.php?uri=tickets/add_message",
		crossDomain: true,
		data: {'token': token, 'tid': tid, 'message': message},
		dataType: "json",
		success: function (data, status, jqXHR)
		{
			location.reload();
		}
	});
}


function delete_ticket(tid){
	var r = confirm("Are you sure you want to delete Ticket #"+tid);
	if (r == true) {
	
		$("#"+tid).hide();
	
		$.ajax({
			type: "POST",
			url: "api/index.php?uri=tickets/delete_ticket",
			crossDomain: true,
			data: {'token': token, 'tid': tid},
			dataType: "json",
			success: function (data, status, jqXHR)
			{
				//location.reload();
			}
		});
	}
}



//test code... just cool stuff not doing anything
function edit_text() {
	var id = document.getElementById("myStyle");
	var css = id.currentStyle || document.defaultView.getComputedStyle(id,null);
	console.log(css);
	var html = $(this).html();
	var editable = $("<textarea />");
	
	editable.val(html);
	$(this).replaceWith(editable);
	
	editable.focus();
	
	
	var to = editable;
	
	/*
	if(!css) return null;

	        var stylePropertyValid = function(name,value){
	                    //checking that the value is not a undefined
	            return typeof value !== 'undefined' &&
	                    //checking that the value is not a object
	                    typeof value !== 'object' &&
	                    //checking that the value is not a function
	                    typeof value !== 'function' &&
	                    //checking that we dosent have empty string
	                    value.length > 0 &&
	                    //checking that the property is not int index ( happens on some browser
	                    value != parseInt(value)

	        };
	
	for(property in css)
	    {
	        //checking if the property and value we get are valid sinse browser have different implementations
	            if(stylePropertyValid(property,css[property]))
	            {
	                //applying the style property to the target element
	                    to.style[property] = css[property];

	            }   
	    }  
	*/
	
}