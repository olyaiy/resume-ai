/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bgp7cdgzhs0myn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iilbv7ro",
    "name": "linkedin",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yksbykxb",
    "name": "github",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bgp7cdgzhs0myn")

  // remove
  collection.schema.removeField("iilbv7ro")

  // remove
  collection.schema.removeField("yksbykxb")

  // remove
  collection.schema.removeField("otlbiiqn")

  return dao.saveCollection(collection)
})
