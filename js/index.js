var db;

$('#mainpage').bind('pageinit', function(event) {
    console.log("binds page");
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(createDb, txError, txSuccess);
});
$( "body" ).on( "pagecontainerchange", function( event, ui ) { 
	readInfo();
    console.log("Page Changing triggers main read function");

	
});

function loadHomework(tx,results) {
console.log("Reading from homework table");
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
		
		
			}	
}

function checkHomework(tx) {   

   tx.executeSql("SELECT * FROM homework",  [] , loadHomework , txError);
}

function readInfo() {
    
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(checkHomework, txError);

}

function createDb(tx) {
    tx.executeSql("CREATE TABLE if not exists homework(duedate,course,description,Category)");
	 tx.executeSql("CREATE TABLE if not exists Classes(Classes)");
	console.log("creates DB");
	
}
function resetData() {
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(resetDb, txError, txSuccess);
	
	}
function resetDb(tx) {
	tx.executeSql("DROP TABLE IF EXISTS homework");
	tx.executeSql("CREATE TABLE homework(duedate,course,description,Category)");
	tx.executeSql("DROP TABLE IF EXISTS Classes");
	tx.executeSql("CREATE TABLE Classes(Classes)");


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
	console.log("opens database");
	db.transaction(loadClasses, txError, txSuccessFave);
				
	
	
function writeHomework() {
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	console.log("opens database");
	db.transaction(loadHomework, txError, txSuccessFave);
				
	
}


function loadClasses(tx) {
    var Classes =  $("#AddclassED").val();
	console.log("class is " + Classes);
	
    tx.executeSql("INSERT INTO Classes(Classes) VALUES (?)",[Classes]);
}


function loadHomework(tx) {
    var description =  $("#DescriptionED").val();
    var duedate =  $("#DateED").val();
	var course = $("#ClassesED").val();
	var Category = $("#CategoryED").val();
	var Classes =  $("#AddclassED").val();
	console.log("description is " + description);
	console.log("duedate is " + duedate);
	console.log("course is " + course);
	console.log("Category is " + Category);
	console.log("Class is " + Classes);
    tx.executeSql("INSERT INTO homework(duedate,course,description,Category) VALUES (?, ?, ?, ?, ?)",[duedate,course,description,Category,Classes]);
}


function txSuccessFave() {
    //console.log("Save success");

}



function loadClasses(tx,results) {
console.log("loads Classes");
$("#classesTab tbody").empty();
console.log("emptys");
row = "";
for (i = 0; i < results.rows.length; i++) { 
			row = "<tr>";
			row += "<td>" + results.rows.item(i)['Classes'] + "</td>";
			row = "</tr>";
			$("#classesTab tbody").append( row );
			}
}




}
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
	 



