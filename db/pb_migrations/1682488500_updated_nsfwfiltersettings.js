migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7xcjvhal54tyza")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bsxkdjnz",
    "name": "sexy_limit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lzvjs5a4",
    "name": "hentai_limit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bnfwguk4",
    "name": "porn_limit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 100
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7xcjvhal54tyza")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
