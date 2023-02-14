const UploadBox = document.querySelector(".upload-box")
const PrevImage = UploadBox.querySelector("img")
const FileInput = UploadBox.querySelector("input")
const UploadIcon = UploadBox.querySelector("i")
const WidthInput = document.querySelector(".width input")
const HeightInput = document.querySelector(".height input")
const RationInput = document.querySelector(".ratio input")
const QualityInput = document.querySelector(".quality input")
const DownloadButton = document.querySelector(".download-btn")

let ogImageRatio

const FileLoad = e => {
    let file = e.target.files[0]
    if(!file) return

    PrevImage.src = URL.createObjectURL(file)
    PrevImage.addEventListener("load" , () => {

        document.querySelector(".wrapper").classList.add("active")
        UploadIcon.style.display = "none"

        WidthInput.value  = PrevImage.naturalWidth
        HeightInput.value = PrevImage.naturalHeight
            
        ogImageRatio = WidthInput.value / HeightInput.value
    })
}

WidthInput.addEventListener("keyup" , () => {
    let height = RationInput.checked ? WidthInput.value / ogImageRatio : HeightInput.value
    HeightInput.value = Math.floor(height)
})
HeightInput.addEventListener("keyup" , () => {
    let width = RationInput.checked ? HeightInput.value * ogImageRatio : WidthInput.value
    WidthInput.value = Math.floor(width)
})

const ResizeAndCompress = e => {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    let aTag = document.createElement("a")

    canvas.width = WidthInput.value
    canvas.height = HeightInput.value

    ctx.drawImage(PrevImage , 0 , 0 , canvas.width , canvas.height)
    Quality = QualityInput.checked ? .5 : 1

    aTag.href = canvas.toDataURL("image/jpeg" , Quality)
    aTag.download = new Date().getTime()
    aTag.click()
}

DownloadButton.addEventListener("click" , ResizeAndCompress)
FileInput.addEventListener("change" , FileLoad)
UploadBox.addEventListener("click" , ()=> FileInput.click())