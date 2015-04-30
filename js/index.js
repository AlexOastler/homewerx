var db;

$('#mainpage').bind('pageinit', function(event) {
    console.log("binds page");
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(createDb, txError, txSuccess);
});
$( "body" ).on( "pagecontainerchange", function( event, ui ) {
    if(ui.toPage[0].id == `home`) {
         readInfo();
		 console.log ("works");
    }
});
function createDb(tx) {
    tx.executeSql("CREATE TABLE homework(duedate,course,description)")
	tx.executeSql("CREATE TABLE classes(class)")
	
}
function resetData() {
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(resetDb, txError, txSuccess);
	
	}
function resetDb(tx) {
tx.executeSql("DROP TABLE IF EXISTS homework");
tx.executeSql("CREATE TABLE homework(duedate,course,description)");
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
	//console.log("opens database");
    
	
    //document.getElementById("DescriptionUI").value = document.getElementById("DescriptionED").value
	//document.getElementById("DateUI").value = document.getElementById("DateED").value
	
	db.transaction(saveFaveDb, txError, txSuccessFave);
				
	readInfo();
}

function saveFaveDb(tx) {
    var description =  $("#DescriptionED").val();
    var duedate =  $("#DateED").val();
	var course = "math";
	console.log(description);
	console.log(duedate);
    tx.executeSql("INSERT INTO homework(duedate,course,description) VALUES (?, ?, ?)",[duedate,course,description]);
}

function txSuccessFave() {
    //console.log("Save success");

}

function readInfo() {
    
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(checkFaveDb, txError);
}

function checkFaveDb(tx) {
    tx.executeSql("SELECT * FROM homework",  [], txSuccessCheckFave , txError);
}


function txSuccessCheckFave(tx,results) {
console.log("Read success");
	$("#homework-table tbody").empty();
	row = "";
	for (i = 0; i < results.rows.length; i++) { 
		//console.log("Item #" + i + " - " + results.rows.item(i)['description']);
		row = "<tr>";
		row += "<td>" + results.rows.item(i)['duedate'] + "</td>";
		row += "<td>" + results.rows.item(i)['description'] + "</td>";
		row += "<td>" + results.rows.item(i)['course'] + "</td>";
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

