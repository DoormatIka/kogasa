migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2pdripsf",
    "name": "settings",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "y7xcjvhal54tyza",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2pdripsf",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "y7xcjvhal54tyza",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
