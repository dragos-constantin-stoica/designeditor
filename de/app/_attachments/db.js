var dbpanel = {

  //TODO - move ui definition here

  init: function() {

    $$("databaseView").clearAll();

    serverCDB.setCallback(
      (text, data, xhr) => {
        console.log(data.json());
        serverCDB.setCallback(
          (text, data, xhr) => {
            $$("databaseView").add(data.json());
            $$("databaseView").refresh();
            $$("databaseView").sort("#db_name#");
            $$("databaseView").markSorting("db_name", "asc");
          }
        );
        (data.json()).forEach(e => serverCDB.getDB(e));
      }
    );

    serverCDB.all_dbs();

  }


}
