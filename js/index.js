var db;

$('#mainpage').bind('pageinit', function(event) {
    console.log("binds page");
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	//db = window.openDatabase("assignmentsdb","0.1","GitHub Repo Db", 1000);
    db.transaction(createDb, txError, txSuccess);
});
$( "body" ).on( "pagecontainerchange", function( event, ui ) {
	readInfo();
	
});

function createDb(tx) {
    tx.executeSql("CREATE TABLE homework(duedate,course,description,category)");
//	tx.executeSql("CREATE TABLE assignments(duedate,course,description)");
}
function resetData() {
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	//db = window.openDatabase("assignmentsdb","0.1","GitHub Repo Db", 1000);
    db.transaction(resetDb, txError, txSuccess);
	
	}
function resetDb(tx) {
tx.executeSql("DROP TABLE IF EXISTS homework");
//tx.executeSql("DROP TABLE IF EXISTS assignments");
tx.executeSql("CREATE TABLE homework(duedate,course,description,category)");
//tx.executeSql("CREATE TABLE assignments(duedate,course,description)");
}
function txError(error) {
    //console.log(error);
    //console.log("Database error: " + error);
}

function txSuccess() {
   // console.log("Success");
}

function writeInfo() {
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	//db = window.openDatabase("assignmentsdb","0.1","GitHub Repo Db", 1000);
	//console.log("opens database");
    
	
    //document.getElementById("DescriptionUI").value = document.getElementById("DescriptionED").value
	//document.getElementById("DateUI").value = document.getElementById("DateED").value
	
	db.transaction(saveFaveDb, txError, txSuccessFave);
				
	readInfo();
}

function saveFaveDb(tx) {
    var description =  $("#DescriptionED").val();
    var duedate =  $("#DateED").val();
	var course = $("#ClassesED").val();
	var category = $("#categoryED").val();
	console.log("description is " + description);
	console.log("duedate is " + duedate);
	console.log("course is " + course);
	console.log("category is " + category);
    tx.executeSql("INSERT INTO homework(duedate,course,description,category) VALUES (?, ?, ?, ?)",[duedate,course,description,category]);
}

function txSuccessFave() {
    //console.log("Save success");

}

function readInfo() {
    
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(checkHomework, txError);
}

function checkHomework(tx) {
    tx.executeSql("SELECT * FROM homework",  [], txSuccessHomework , txError);
}


function txSuccessHomework(tx,results) {
console.log("Read success");
	$("#homework-table tbody").empty();
	row = "";
	for (i = 0; i < results.rows.length; i++) { 
		//console.log("Item #" + i + " - " + results.rows.item(i)['description']);
		row = "<tr>";
		row += "<td>" + results.rows.item(i)['duedate'] + "</td>";
		row += "<td>" + results.rows.item(i)['description'] + "</td>";
		row += "<td>" + results.rows.item(i)['course'] + "</td>";
		row += "<td>" + results.rows.item(i)['category'] + "</td>";
		row += "</tr>";
		
		$( "#homework-table tbody" ).append( row ); 
		
		//<tr>
        //                <td><input type="text" id="DateUI" readonly><br></td>
        //                <td><input type="text" id="DescriptionUI" readonly><br></td>
        //                <td><input type="text" id="ClassUI" readonly><br></td>
        //</tr>
	}
//document.getElementById("DescriptionUI").value = results.rows.item(0)['description'];
	//document.getElementById("DateUI").value = results.rows.item(0)['duedate'];
	//document.getElementById("ClassUI").value = results.rows.item(0)['course'];
	
}