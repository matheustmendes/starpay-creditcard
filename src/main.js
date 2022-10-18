import "./css/index.css"
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccBgColor03 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccBgColor04 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    hipercard: ["#0B0928", "#E8E8E8", "#F16529", "#FF3C21", "#FFA724"],
    elo: [
      "#07051B",
      "#5E38F5",
      "#8EB5FF",
      "#BC31ED",
      "#C732FB",
      "#F9F9F9",
      "#FF2DC4",
    ],
    default: ["black", "grey"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccBgColor03.setAttribute("fill", colors[type][2])
  ccBgColor04.setAttribute("fill", colors[type][3])

  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("visa")
