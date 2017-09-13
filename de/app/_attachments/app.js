var designeditor = {
    init: function () {
        webix.ui(this.main_ui);
        webix.ui(this.sidebar_ui);
        webix.ui(this.info_ui);

        dbpanel.init();


        //serverCDB.server_info();
    },

    main_ui: {
        rows: [{
                view: "toolbar",
                id: "toolbar",
                elements: [{
                        view: "icon",
                        icon: "bars",
                        click: function () {
                            if ($$("menu").config.hidden) {
                                $$("menu").show();
                            } else
                                $$("menu").hide();
                        }
                    },
                    {
                        view: "label",
                        label: "Design Editor"
                    },
                    {},
                    {
                      view: "icon",
                      icon: "bell",
                      badge: 7,
                      click: function(){
                        //display CouchDB messages from server
                        if ($$("info").config.hidden) {
                            $$("info").show();
                        } else
                            $$("info").hide();
                      }
                    }

                ]
            },
            {
                view: "multiview",
                cells: [{
                        id: "databaseView",
                        view:"datatable",
              					columns:[
              						{ id:"db_name",	sort:'string',header:"Name", minWidth:200, fillspace:true},
              						{ id:"data_size",	header:"Size", css:{ "text-align":"right" } , width:100	},
              						{ id:"doc_count",	header:"# Docs", css:{ "text-align":"right" } , width:80	},
              						{ id:"update_seq",	header:"Update Seq", css:{ "text-align":"right" }, 	width:200	}
              					],
              					autoheight:true,
              					autowidth:true
                    },
                    {
                        id: "activetascksView",
                        template: "Active Tasks"
                    },
                    {
                        id: "configView",
                        view:"property",
                        elements:[
                           { label:"Layout", type:"label"},
                           { label:"Data url", type:"text", id:"url"},
                           { label:"Data type", type:"select", options:["json","xml","csv"], id:"type"},
                           { label:"Use JSONP", type:"checkbox", id:"jsonp"}
                        ]
                    },
                    {
                        id: "logView",
                        template: "Log"
                    },
                    {
                        id: "replicationView",
                        template: "Replication"
                    }
                ],
                keepViews: true,
                fitBiggest: true
            }
        ]
    },

    sidebar_ui: {
        view: "sidemenu",
        id: "menu",
        width: 200,
        position: "left",
        state: function (state) {
            var toolbarHeight = $$("toolbar").$height;
            state.top = toolbarHeight;
            state.height -= toolbarHeight;
        },
        body: {
            view: "list",
            borderless: true,
            scroll: false,
            on: {
                onAfterSelect: function (id) {
                    switch (id) {
                    case "1":
                        $$("databaseView").show();
                        dbpanel.init();
                        break;
                    case "2":
                        $$("activetascksView").show();
                        break;
                    case "3":
                        $$("configView").show();
                        break;
                    case "4":
                        $$("logView").show();
                        break;
                    case "5":
                        $$("replicationView").show();
                        break;
                    case "6":
                        break;
                    default:
                        $$("databaseView").show();
                    };
                    $$("menu").hide();

                }
            },

            template: "<span class='webix_icon fa-#icon#'></span> #value#",
            data: [
                {
                    id: 1,
                    value: "Databases",
                    icon: "database"
                },
                {
                    id: 2,
                    value: "Active Tasks",
                    icon: "sliders"
                },
                {
                    id: 3,
                    value: "Config",
                    icon: "cog"
                },
                {
                    id: 4,
                    value: "Log",
                    icon: "list"
                },
                {
                    id: 5,
                    value: "Replication",
                    icon: "retweet"
                },
                {
                    id: 6,
                    value: "Login",
                    icon: "user"
                }
            ],
            select: true,
            type: {
                height: 40
            }
        }
    },

    info_ui: {
      view: "sidemenu",
      id: "info",
      width: 200,
      position: "right",
      state: function (state) {
          var toolbarHeight = $$("toolbar").$height;
          state.top = toolbarHeight;
          state.height -= toolbarHeight;
      },
      body: {
          view: "list",
          borderless: true,
          scroll: 'y',
          template: "<span class='webix_icon fa-#icon#'></span> #value#",
          data: [
              {
                  id: 1,
                  value: "This is a warning message!",
                  icon: "warning"
              },
              {
                  id: 2,
                  value: "This is normal info message.",
                  icon: "info-circle"
              },
              {
                  id: 3,
                  value: "This is an ERROR message!!!",
                  icon: "minus-circle"
              }
          ],
          type: {
              height: 60
          }
      }
    }

}
