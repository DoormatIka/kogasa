migrate((db) => {
  const collection = new Collection({
    "id": "vvjlbker5uq8ntc",
    "created": "2023-04-25 20:20:31.891Z",
    "updated": "2023-04-25 20:20:31.891Z",
    "name": "server",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5dqqnga6",
        "name": "nsfw_settings",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "zvnjd1kl",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc");

  return dao.deleteCollection(collection);
})
