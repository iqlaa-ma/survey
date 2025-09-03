"use server"
import { MongoClient } from "mongodb"

const generateUid: () => string = () =>  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

const generateTime: () => string = () => {
  const now = new Date()
  const day = now.getDate()
  const month = now.toLocaleString("en-US", { month: "long" })
  const year = now.getFullYear()
  let hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12
  hours = hours ? hours : 12
  return `${day} ${month} ${year}, at ${hours}:${minutes} ${ampm}`
}

export async function POST(req: Request): Promise<Response> {

  if (!process.env.MONGODB_URI)
    throw new Error("No MONGODB_URI Variable Declare in .env File")
  
  try {

    const client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()
    const db = client.db("IQLAA")
    const surveysCollection = db.collection("surveys")

    const inset = surveysCollection.insertOne({
      uid: generateUid(),
      createdAt: generateTime(),
      data: await req.json()
    })
    
    if ((await inset).acknowledged) return Response.json({
      "message": "By abdael-m, source: https://github.com/abdallahelmadi"
    }, { status: 200 })

    return Response.json({
      "message": "An error occurred while processing your request."
    }, { status: 501 })

  } catch (e) {
    console.error(e)
    return Response.json({
      "message": "An error occurred while processing your request."
    }, { status: 500 })
  }

}