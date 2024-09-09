/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bgp7cdgzhs0myn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fedrteu5",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bgp7cdgzhs0myn")

  // remove
  collection.schema.removeField("fedrteu5")

  return dao.saveCollection(collection)
})
