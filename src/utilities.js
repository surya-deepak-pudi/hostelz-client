export const urlEncoder = fields => {
  let str = ""
  if (Object.keys.length) {
    str = "?"
  }
  for (let field in fields) {
    switch (field) {
      case "properties":
        str += field + "=" + fields.field.join(",")
        break
      default:
        break
    }
    str += "&"
  }
  return str
}
