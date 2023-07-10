var Buffer = require("buffer/").Buffer
let publisherDataDecoded: string

export const savePublisherData = (publisherData: any) => {
  if (publisherData) {
    publisherDataDecoded = Buffer.from(publisherData, "base64").toString(
      "ascii"
    )
    sessionStorage.setItem("publisherData", publisherDataDecoded)
  }
}
