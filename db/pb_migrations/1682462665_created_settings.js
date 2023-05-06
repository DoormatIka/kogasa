migrate((db) => {
  const collection = new Collection({
    "id": "y7xcjvhal54tyza",
    "created": "2023-04-25 22:44:25.930Z",
    "updated": "2023-04-25 22:44:25.930Z",
    "name": "settings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bsxkdjnz",
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
        "id": "lzvjs5a4",
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
        "id": "bnfwguk4",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y7xcjvhal54tyza");

  return dao.deleteCollection(collection);
})
