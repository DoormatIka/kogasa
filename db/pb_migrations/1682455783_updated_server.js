migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gm83bc5i",
    "name": "sexy_limit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nadrxv6f",
    "name": "hentai_limit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gpziijuc",
    "name": "porn_limit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vvjlbker5uq8ntc")

  // remove
  collection.schema.removeField("gm83bc5i")

  // remove
  collection.schema.removeField("nadrxv6f")

  // remove
  collection.schema.removeField("gpziijuc")

  return dao.saveCollection(collection)
})
