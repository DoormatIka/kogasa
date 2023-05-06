migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7xcjvhal54tyza")

  collection.name = "nsfwfiltersettings"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7xcjvhal54tyza")

  collection.name = "settings"

  return dao.saveCollection(collection)
})
