import {Router} from "express";
import {products} from "../controller";
import {userHasRoles, validateJwt} from "../middlewares";
import {Category, Product} from "../models";
import {
	paramIsUniqueInCollection,
	mongoIdRefersToValidDbEntry,
	paramsAreNotEmpty,
	paramsAreValidMongoId
} from "../helpers/route-validator";

const router = Router();

router.get("/",
	products.getMany()
);

router.get("/:id",
	paramsAreValidMongoId("id"),
	mongoIdRefersToValidDbEntry("id", Product, true),
	products.getOne(),
);

router.post("/",
	validateJwt,
	paramsAreNotEmpty("name", "category"),
	paramIsUniqueInCollection("name", Product),
	paramsAreValidMongoId("category"),
	mongoIdRefersToValidDbEntry("category", Category, true),
	products.create()
);

router.put("/:id",
	validateJwt,
	paramsAreValidMongoId("id"),
	mongoIdRefersToValidDbEntry("id", Product, true),
	products.modify()
);

router.delete("/:id",
	validateJwt,
	userHasRoles("ADMIN"),
	paramsAreValidMongoId("id"),
	mongoIdRefersToValidDbEntry("id", Product, true),
	products.remove()
);

export default router;
