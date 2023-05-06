migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7762lg2muy2915")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7762lg2muy2915")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ewjtqlqk",
    "name": "sexy_limit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wbr2ewhb",
    "name": "hentai_limit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c5tafv0j",
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
})
