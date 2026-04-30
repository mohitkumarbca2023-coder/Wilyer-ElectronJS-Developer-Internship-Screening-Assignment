
const fs = require("fs")
const path = require("path")

const configPath = path.join(__dirname, "config.json")
const rawdata = fs.readFileSync(configPath, "utf8")
const jsondata = JSON.parse(rawdata)
const zones = jsondata.playable_data.playlists[0].layouts[0].zones
function createsequence(container, items, index = 0) {
  const item = items[index]
  container.innerHTML = ""
  let el

  if (item.type === "image") {
    el = document.createElement("img")
    el.src = item.path
    el.style.objectPosition="center"
    el.style.objectFit="contain"
  }

  if (item.type === "video") {
    el = document.createElement("video")
    el.src = item.path
    el.autoplay = true
    el.muted = true
    el.style.objectPosition="center"
    el.style.objectFit="contain"
  }

  if (item.type === "web") {
    el = document.createElement("iframe")
    el.src = item.path
    el.style.objectPosition="center";
    el.style.objectFit="contain"
  }

  container.appendChild(el)

  setTimeout(() => {
    const next = (index + 1) % items.length
    createsequence(container, items, next)
  }, item.duration * 1000)
}

function creatediv(zone) {
  const newdiv = document.createElement("div")
  newdiv.style.position = "absolute"
  newdiv.style.height = zone.config.h * 100 + "%"
  newdiv.style.width = zone.config.w * 100 + "%"
  newdiv.style.left = zone.config.x* 100 + "%"
  newdiv.style.top = zone.config.y* 100 + "%"
newdiv.style.overflow = "hidden";
newdiv.style.display="flex"
newdiv.style.flexDirection="row"
  document.body.appendChild(newdiv)
  createsequence(newdiv, zone.sequence.data)
}

zones.forEach((zone) => {
  creatediv(zone)
})