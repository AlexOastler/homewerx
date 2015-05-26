var db;

$('#mainpage').bind('pageinit', function(event) {
    console.log("binds page");
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(createDb, txError, txSuccess);
});
$( "body" ).on( "pagecontainerchange", function( event, ui ) {
	readInfo();
	
});

function createDb(tx) {
	tx.executeSql("CREATE TABLE if not exists Classes(Classes)");
    tx.executeSql("CREATE TABLE if not exists homework(duedate,course,description,Category)");
	console.log("creates DB");
	
}
function resetData() {
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(resetDb, txError, txSuccess);
	
	}
function resetDb(tx) {
	tx.executeSql("DROP TABLE IF EXISTS homework");
	tx.executeSql("DROP TABLE IF EXISTS Classes");
	tx.executeSql("CREATE TABLE homework(duedate,course,description,Category)");
	tx.executeSql("CREATE TABLE Classes(Classes)");


}
function txError(error) {
    console.log(error);
    console.log("Database error: " + error);
}

function txSuccess() {
    console.log("Success");
}

function writeInfo() {
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	console.log("opens database");
	db.transaction(saveHomework, txError, txSuccessFave);
				
	readInfo();
}

function writeClasses() {
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);


db.transaction(saveClasses, txError, txSuccessFave);
}

function saveClasses(tx) {
    var Classes =  $("#AddclassED").val();
	console.log("Class is " + Classes);
	tx.executeSql("INSERT INTO Classes(Classes) VALUES (?)",[Classes]);
	
}


function saveHomework(tx) {
    var description =  $("#DescriptionED").val();
    var duedate =  $("#DateED").val();
	var course = $("#ClassesED").val();
	var Category = $("#CategoryED").val();
	console.log("description is " + description);
	console.log("duedate is " + duedate);
	console.log("course is " + course);
	console.log("Category is " + Category);
    tx.executeSql("INSERT INTO homework(duedate,course,description,Category) VALUES (?, ?, ?, ?)",[duedate,course,description,Category]);
}


function txSuccessFave() {
    //console.log("Save success");

}

function readInfo() {
    
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(checkHomework, txError);
}

function checkHomework(tx) {   

   tx.executeSql("SELECT * FROM homework",  [], loadHomework , loadClasses , txError);
}
function loadClasses(tx,results) {
$("#classesTab li").empty();
for (i = 0; i < results.rows.length; i++) { 
			row+="<td>" + results.rows.item(i)['Classes'] + "</td>";
			$("#classesTab li").append( row );
}

function loadHomework(tx,results) {
console.log("Read success");
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
		
			for (i = 0; i < results.rows.length; i++) { 
			row+="<td>" + results.rows.item(i)['Classes'] + "</td>";
			$("#classesTab li").append( row );
				
}


switch (Category) {
    case "Homework":
        day = "#homework-table tbody";
        break;
    case "Assignments":
        day = "#Assignments-table tbody";
        break;
    case "tests":
        day = "#tests-table tbody"; 
		break;
}
		
		console.log(day);
$(day).append( row );
	 

}
}
}