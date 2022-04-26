import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../../.env') })

export default function main() {
  console.log('hello from main')
}

main()
