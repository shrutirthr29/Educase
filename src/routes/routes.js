import {Router} from "express"
import { addSchool } from "../api/addSchool.js"
import { listSchools } from "../api/listSchools.js"


const router=Router()

router.route("/addSchool").post(addSchool)
router.route("/listSchools").get(listSchools)

export default router