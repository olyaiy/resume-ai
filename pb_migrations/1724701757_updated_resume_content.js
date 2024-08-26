/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q8bib0cnl15d5yi")

  collection.name = "resumes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q8bib0cnl15d5yi")

  collection.name = "resume_content"

  return dao.saveCollection(collection)
})
