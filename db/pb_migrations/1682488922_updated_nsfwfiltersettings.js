migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7xcjvhal54tyza")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kjuqz0fw",
    "name": "enablensfwfilter",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7xcjvhal54tyza")

  // remove
  collection.schema.removeField("kjuqz0fw")

  return dao.saveCollection(collection)
})
