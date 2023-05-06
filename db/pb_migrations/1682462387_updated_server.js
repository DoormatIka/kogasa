migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s9p1tfjk",
    "name": "serverid",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s9p1tfjk",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
