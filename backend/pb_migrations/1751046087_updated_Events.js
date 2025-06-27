/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1664626482")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select3795313471",
    "maxSelect": 1,
    "name": "Vibe",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Acoustic"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1664626482")

  // remove field
  collection.fields.removeById("select3795313471")

  return app.save(collection)
})
