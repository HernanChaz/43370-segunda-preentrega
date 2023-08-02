import { Router } from 'express';
import {__dirname} from '../utils.js';
import * as controller from '../controllers/productController.js';

const router = Router();

router.get('/', controller.getAll);         // .../?limit=<integer>&query=<nombreAtributo>&queryValue=<valor>&sort=<asc/desc>
router.get('/:pid', controller.getById);    // .../<_id>
router.post('/', controller.create);        // Json producto en body
router.put('/:pid', controller.update);     // Json con campos y valores que quiero actualizar en body
router.delete('/:pid', controller.remove);  // .../<_id>

export default router;