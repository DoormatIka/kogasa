migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // remove
  collection.schema.removeField("ypfc9snd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ypfc9snd",
    "name": "nsfw_settings",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "p7762lg2muy2915",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})