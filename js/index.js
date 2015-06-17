



function loadHomework(tx,results) {

	$("#homework-table tbody").empty();
	$("#Assignments-table tbody").empty();
	$("#tests-table tbody").empty();
	
	row = "";
	for (i = 0; i < results.rows.length; i++) { 
		
		
		homeworkdate = new Date(results.rows.item(i)['duedate']);
		currentdate = new Date();
		warningdate = new Date();
		var daystoadd = 4;
		warningdate.setDate(warningdate.getDate() + daystoadd);
	
		
		//console.log("homework date " + homeworkdate);
		//console.log("current date " + currentdate);
		//console.log("warning date " + warningdate);
	
		if(currentdate >= homeworkdate ) { 
		row = "<tr class='overdue'> ";
		}else if (warningdate > homeworkdate ) {
		row ="<tr class='warning'> ";
		}else{
		row = "<tr class ='notoverdue'> ";
		}
		
		row += "<td>" + results.rows.item(i)['duedate'] + "</td>";
		row += "<td>" + results.rows.item(i)['classname'] + "</td>";
		row += "<td>" + results.rows.item(i)['description'] + "</td>";
		row += "<td>  <div class='ui-btn ui-icon-info ui-btn-icon-notext ui-corner-all ui-btn-inline delete-event' id='" + results.rows.item(i)['eventid'] +"' ></div> </td>";
		row += "</tr>";
		//console.log(results.rows.item(1)['rowid']);
		type = "";
		switch (results.rows.item(i)['category']) {
			case "HomeWork":
			type = "#homework-table tbody";
			break;
			case "Assignments":
			type = "#Assignments-table tbody";
			break;
			case "Tests":
			type = "#tests-table tbody"; 
			break;
			default:
			type = "#homework-table tbody";
		}
	//console.log("type is " + type);
	$(type).append( row );
	
		
		
	}
	console.log("Read homework success");
}		

		
		
	



function loadClasses(tx,results) {
$("#classesTab tbody").empty();
//console.log(results.rows.length);

for (i = 0; i < results.rows.length; i++) { 
			row = "<tr>";
			row += "<td>" + results.rows.item(i)['classname'] + "</td>";
			row += "</tr>";
			$("#classesTab tbody").append( row );
			//console.log(results.rows.item(i)['classname']);
			}
console.log("loads Classes from table");
			}

			
function loadClassnameoptions(tx,results) {
$("#ClassesED").empty();
$("#ClassesED").append( "<option><p></p></option>" );
row = "";
for (i = 0; i < results.rows.length; i++) { 
			row = "<option>";
			row += results.rows.item(i)['classname'];
			row += "</option>";
			$("#ClassesED").append( row );
			//console.log(results.rows.item(i)['classname']);
			}
console.log("loads class options from table");
			}

function checkHomework(tx) {   

   tx.executeSql("SELECT * FROM homework",  [] , loadHomework , txError);
}

function checkClasses(tx) {   

   tx.executeSql("SELECT * FROM classes",  [] , loadClasses , txError);
}

function checkClassOptions(tx) {   

   tx.executeSql("SELECT * FROM classes",  [] , loadClassnameoptions , txError);
}

function readTables() {
    
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(checkHomework, txError);
	db.transaction(checkClasses, txError);
	db.transaction(checkClassOptions, txError);
	$('#DescriptionED').val('');
	$('#DateED').val('');
	$('#AddclassED').val('');
}

function createDb(tx) {
    //tx.executeSql("CREATE TABLE if not exists homework(duedate,classname,category,description)");
	 tx.executeSql("CREATE TABLE if not exists homework('eventid' INTEGER PRIMARY KEY ASC,'duedate','classname','category','description')");
	 tx.executeSql("CREATE TABLE if not exists classes(classname)");
	console.log("creates DB");
	
}
function resetData() {
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(resetDb, txError, txSuccess);
	
	}
function resetDb(tx) {
	tx.executeSql("DROP TABLE IF EXISTS homework");
	//tx.executeSql("CREATE TABLE homework(duedate,classname,category,description)");
	tx.executeSql("CREATE TABLE homework('eventid' INTEGER PRIMARY KEY ASC,'duedate','classname','category','description')");
	tx.executeSql("DROP TABLE IF EXISTS classes");
	tx.executeSql("CREATE TABLE classes(classname)"); 


}
function txError(error) {
    console.log(error);
    console.log("Database error: " + error);
}

function txSuccess() {
    console.log("transaction success");
}
function writeClass() {
	event.preventDefault();
	if ($("#AddclassED").val() === null) {
	sweetAlert("Oops...", "You left a field blank", "error");
	}else if ($("#AddclassED").val() === "") {
	sweetAlert("Oops...", "You left a field blank", "error");
	}else{
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(saveClasses, txError, txSuccessFave);
	console.log("writes classes");
	$.mobile.navigate( "#home" );
		}		
	}
	
function writeHomework() {
	event.preventDefault();
	if ($("#DateED").val() === null) {
	sweetAlert("Oops...", "You left a field blank", "error");
	}else if ($("#DateED").val() === "") {
	sweetAlert("Oops...", "You left a field blank", "error");
	}else if ($("#DescriptionED").val() === null) {
	sweetAlert("Oops...", "You left a field blank", "error");
	}else if ($("#DescriptionED").val() === "") {
	sweetAlert("Oops...", "You left a field blank", "error");
	}else if ($("#ClassesED").val() === null) {
	sweetAlert("Oops...", "You need to add a class from the Add Class tab on the main screen.", "error");
	}else if ($("#ClassesED").val() === "") {
	sweetAlert("Oops...", "You need to add a class from the Add Class tab on the main screen.", "error");
	}else{
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(saveHomework, txError, txSuccessFave);
	console.log("writes homework");
	$.mobile.navigate( "#home" );

	}
	
}


function saveClasses(tx) {
    var classname =  $("#AddclassED").val();
	console.log("class is " + classname);
	
    tx.executeSql("INSERT INTO classes(classname) VALUES (?)",[classname]);
	console.log("saves classes into table");
}


function saveHomework(tx) {
    var description =  $("#DescriptionED").val();
    var duedate =  $("#DateED").val();
	var classname = $("#ClassesED").val();
	var category = $("#CategoryED").val();
	console.log("description is " + description);
	console.log("duedate is " + duedate);
	console.log("class is " + classname);
	console.log("Category is " + category);
    tx.executeSql("INSERT INTO homework(eventid, duedate,classname,category,description) VALUES (null, ?, ?, ?, ?)",[duedate,classname,category,description]);
	console.log("saves homework into table");
	
	}


function txSuccessFave() {
    console.log("Save success");

}


$("#homework-table, #tests-table, #Assignments-table").on('click', "div.delete-event" ,function(event) {
	swal({
	title: "Are you sure?",
	text: "You will not be able to recover this imaginary file!",
	type: "warning",
	showCancelButton: true,
	confirmButtonColor: "#DD6B55",
	confirmButtonText: "Yes, delete it!",
	cancelButtonText: "No, cancel plx!",
	closeOnConfirm: false,
	closeOnCancel: false },
	function(isConfirm){
	if (isConfirm) {
	deleteEventID = $(this).attr("id");
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(deleterow, txError, txSuccessFave);
	swal("Deleted!", "Your imaginary file has been deleted.", "success");
	} else {
	swal("Cancelled", "Your imaginary file is safe :)", "error");   } });
	
	//console.log("To Delete: " + $(this).attr("id"));
	//deleteEventID = $(this).attr("id");
	//db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	//db.transaction(deleterow, txError, txSuccessFave);
	
	
});

function deleterow (tx) { 
tx.executeSql ("DELETE FROM homework WHERE eventid = ?", [deleteEventID]);
$.mobile.navigate( "#home" );
}





$( document ).ready(function() {

	var db;

	var deleteEventID;
	
	$('#mainpage').bind('pageinit', function(event) {
    console.log("binds page");
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(createDb, txError, txSuccess);
	});

	$( "body" ).on( "pagecontainerchange", function( event, ui ) { 
	readTables();
    console.log("Page Changing triggers main read function");

	
	});
	
	
});





