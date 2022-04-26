import dotenv from 'dotenv'
import path from 'path'
import { sillyString } from '@todos/shared'

dotenv.config({ path: path.join(__dirname, '../../../.env') })

export default function main() {
  console.log('This is a rock solid boilerplate at this stage!')
  console.log(sillyString)
  console.log(process.env.TEST_VAR)
}

main()
