migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("p7762lg2muy2915");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "p7762lg2muy2915",
    "created": "2023-04-25 20:21:59.052Z",
    "updated": "2023-04-25 20:41:58.194Z",
    "name": "settings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ewjtqlqk",
        "name": "sexy_limit",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 1
        }
      },
      {
        "system": false,
        "id": "wbr2ewhb",
        "name": "hentai_limit",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 1
        }
      },
      {
        "system": false,
        "id": "c5tafv0j",
        "name": "porn_limit",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 1
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
