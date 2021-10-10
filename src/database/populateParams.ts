export const productPopulateParams = [
	{ path: "editedBy", select: "nombre", strictPopulate: false },
	{ path: "createdBy", select: "nombre" },
	{ path: "category", select: "name" },
];
