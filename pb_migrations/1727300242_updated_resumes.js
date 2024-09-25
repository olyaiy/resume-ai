/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bgp7cdgzhs0myn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otlbiiqn",
    "name": "portfolio",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bgp7cdgzhs0myn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otlbiiqn",
    "name": "portfolio_site",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})
