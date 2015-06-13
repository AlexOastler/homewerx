

function loadHomework(tx,results) {

	$("#homework-table tbody").empty();
	$("#Assignments-table tbody").empty();
	$("#tests-table tbody").empty();
	
	row = "";
	for (i = 0; i < results.rows.length; i++) { 
		row = "<tr>";
		row += "<td>" + results.rows.item(i)['duedate'] + "</td>";
		row += "<td>" + results.rows.item(i)['classname'] + "</td>";
		row += "<td>" + results.rows.item(i)['description'] + "</td>";
		//row += "<td>" + results.rows.item(i)['Category'] + "</td>";
		//row += "<td>" + <a class="button" href="#"></a> +"</td>";
		row += "</tr>";
		$("#homework-table tbody").append( row );
		
		console.log("Read homework success");
			}	
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
    tx.executeSql("CREATE TABLE if not exists homework(duedate,classname,category,description)");
	 tx.executeSql("CREATE TABLE if not exists classes(classname)");
	console.log("creates DB");
	
}
function resetData() {
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(resetDb, txError, txSuccess);
	
	}
function resetDb(tx) {
	tx.executeSql("DROP TABLE IF EXISTS homework");
	tx.executeSql("CREATE TABLE homework(duedate,classname,category,description)");
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
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(saveClasses, txError, txSuccessFave);
	console.log("writes classes");
				
	}
	
function writeHomework() {
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(saveHomework, txError, txSuccessFave);
	console.log("writes homework");
	
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
    tx.executeSql("INSERT INTO homework(duedate,classname,category,description) VALUES (?, ?, ?, ?)",[duedate,classname,category,description]);
	console.log("saves homework into table");
}


function txSuccessFave() {
    console.log("Save success");

}






$( document ).ready(function() {

	var db;

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



//switch (Category) {
  //  case "Homework":
    //    day = "#homework-table tbody";
      //  break;
    //case "Assignments":
      //  day = "#Assignments-table tbody";
        //break;
    //case "tests":
      //  day = "#tests-table tbody"; 
		//break;
//}
		
	//	console.log(day);
//$(day).append( row );
	 



