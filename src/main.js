import "./css/index.css"
import Imask from "imask"
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")
const validateCVC = document.querySelector("#security-code")
const validateCVCPattern = {
  mask: "0000",
}
const validadeCVCMasked = Imask(validateCVC, validateCVCPattern)
const validateExpirationDate = document.querySelector("#expiration-date")
const ValidateExpirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12,
    },

    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}

const validateExpirationDateMasked = Imask(
  validateExpirationDate,
  ValidateExpirationDatePattern
)

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
  ccBgColor02.setAttribute("fill", colors[type][2])
  ccBgColor02.setAttribute("fill", colors[type][3])

  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4[0-9]/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^ |^3841(?:[0|4|6]{1})0/,
      cardtype: "hipercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    setCardType(foundMask.cardtype)

    return foundMask
  },
}

const cardNumberMasked = Imask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão Adicionado!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "SEU NOME" : cardHolder.value
})

validadeCVCMasked.on("accept", () => {
  updateCVC(validadeCVCMasked.value)
})

function updateCVC(code) {
  const cvcSecurity = document.querySelector(".cc-security .value")
  cvcSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardType

  setCardType(cardType)

  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

validateExpirationDateMasked.on("accept", () => {
  updateExpirationDate(validateExpirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value")

  ccExpiration.innerText = date.length === 0 ? "MM/YY" : date
}
