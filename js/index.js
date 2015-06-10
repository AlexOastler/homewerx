

function loadHomework(tx,results) {

	$("#homework-table tbody").empty();
	$("#Assignments-table tbody").empty();
	$("#tests-table tbody").empty();
	
	row = "";
	for (i = 0; i < results.rows.length; i++) { 
		row = "<tr>";
		row += "<td>" + results.rows.item(i)['duedate'] + "</td>";
		row += "<td>" + results.rows.item(i)['description'] + "</td>";
		row += "<td>" + results.rows.item(i)['course'] + "</td>";
		row += "<td>" + results.rows.item(i)['Category'] + "</td>";
		row += "</tr>";
		$("#homework-table tbody").append( row );
		
		console.log("Read homework success");
			}	
}

function loadClasses(tx,results) {
$("#classesTab tbody").empty();
//console.log(results.rows.length);
row = "";
for (i = 0; i < results.rows.length; i++) { 
			row = "<tr>";
			row += "<td>" + "test" + "</td>";
			row += "</tr>";
			$("#classesTab tbody").append( row );
			//console.log(results.rows.item(i)['classname']);
			}
console.log("loads Classes from table");
			}


function checkHomework(tx) {   

   tx.executeSql("SELECT * FROM homework",  [] , loadHomework , txError);
}

function checkClasses(tx) {   

   tx.executeSql("SELECT * FROM classes",  [] , loadClasses , txError);
}

function readTables() {
    
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(checkHomework, txError);
	db.transaction(checkClasses, txError);
}

function createDb(tx) {
    tx.executeSql("CREATE TABLE if not exists homework(duedate,course,description,category,classname)");
	 tx.executeSql("CREATE TABLE if not exists classes(classname)");
	console.log("creates DB");
	
}
function resetData() {
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(resetDb, txError, txSuccess);
	
	}
function resetDb(tx) {
	tx.executeSql("DROP TABLE IF EXISTS homework");
	tx.executeSql("CREATE TABLE homework(duedate,course,description,Category)");
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
	var course = $("#ClassesED").val();
	var category = $("#CategoryED").val();
	var classname =  $("#AddclassED").val();
	console.log("description is " + description);
	console.log("duedate is " + duedate);
	console.log("course is " + course);
	console.log("Category is " + category);
	console.log("Class is " + classname);
    tx.executeSql("INSERT INTO homework(duedate,course,description,category,classname) VALUES (?, ?, ?, ?, ?)",[duedate,course,description,category,classname]);
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
	 



