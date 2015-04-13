var db;

$('#mainpage').bind('pageinit', function(event) {
    console.log("binds page");
	db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
    db.transaction(createDb, txError, txSuccess);
});

function createDb(tx) {
    tx.executeSql("DROP TABLE IF EXISTS homework");
    tx.executeSql("CREATE TABLE homework(user,name)");
}

function txError(error) {
    console.log(error);
    console.log("Database error: " + error);
}

function txSuccess() {
    console.log("Success");
}

function saveFave() {
    db = window.openDatabase("homeworkdb","0.1","GitHub Repo Db", 1000);
	console.log("opens database");
    db.transaction(saveFaveDb, txError, txSuccessFave);
}

function saveFaveDb(tx) {
    var owner =  document.getElementById("DescriptionUI").value
    var name =  document.getElementById("DateUI").value

    tx.executeSql("INSERT INTO homework(user,name) VALUES (?, ?)",[owner,name]);
}

function txSuccessFave() {
    console.log("Save success");

}

function checkFave() {
    db.transaction(checkFaveDb, txError);
}

function checkFaveDb(tx) {
    var owner = owner
    var name = name

    tx.executeSql("SELECT * FROM homework", [],txSuccessCheckFave , txError);
	//tx.executeSql("SELECT * FROM homework WHERE user = ? AND name = ?",[owner,name],txSuccessCheckFave);
}

function txSuccessCheckFave(tx,results) {
    console.log("Read success");
    console.log(results);
	var owner = document.getElementById("DescriptionUI").value

}