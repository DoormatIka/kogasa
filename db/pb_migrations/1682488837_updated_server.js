migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // remove
  collection.schema.removeField("khblxsrz")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "khblxsrz",
    "name": "enablensfwfilter",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
