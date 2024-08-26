/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q8bib0cnl15d5yi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6nyzux8q",
    "name": "skills",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmjchw6g",
    "name": "work_experience",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j5jyqgs7",
    "name": "projects",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v8jjad9i",
    "name": "education",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q8bib0cnl15d5yi")

  // remove
  collection.schema.removeField("6nyzux8q")

  // remove
  collection.schema.removeField("rmjchw6g")

  // remove
  collection.schema.removeField("j5jyqgs7")

  // remove
  collection.schema.removeField("v8jjad9i")

  return dao.saveCollection(collection)
})
