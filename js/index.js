var db;

$('#mainpage').bind('pageinit', function(event) {
    //console.log("binds page");
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(createDb, txError, txSuccess);
});

function createDb(tx) {
    //tx.executeSql("DROP TABLE IF EXISTS homework");
    tx.executeSql("CREATE TABLE homework(duedate,course,description)");
}

function txError(error) {
    //console.log(error);
    //console.log("Database error: " + error);
}

function txSuccess() {
   // console.log("Success");
}

function saveFave() {
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	//console.log("opens database");
    db.transaction(saveFaveDb, txError, txSuccessFave);
}

function saveFaveDb(tx) {
    var description =  document.getElementById("DescriptionUI").value;
    var duedate =  document.getElementById("DateUI").value;
	var course = "math";
	
    tx.executeSql("INSERT INTO homework(duedate,course,description) VALUES (?, ?, ?)",[duedate,course,description]);
}

function txSuccessFave() {
    //console.log("Save success");

}

function checkFave() {
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	db.transaction(checkFaveDb, txError);
}

function checkFaveDb(tx) {
    tx.executeSql("SELECT * FROM homework",  [], txSuccessCheckFave , txError);
}


function txSuccessCheckFave(tx,results) {
 // console.log("Read success");
	 
	 //for (i = 0; i < results.rows.length; i++) { 
		//console.log("Item #" + i + " - " + results.rows.item(i)['description']);
	//}

	document.getElementById("DescriptionUI").value = results.rows.item(0)['description'];
	document.getElementById("DateUI").value = results.rows.item(0)['duedate'];
	document.getElementById("ClassUI").value = results.rows.item(0)['course'];
}
	

