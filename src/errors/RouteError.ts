/**
 * Error que se lanza cuando el Router de una ruta no se puede encontrar en el index de la carpeta de rutas.
 */
export default (route: string) => {
	return Error(
		`El router para la ruta ${route} no existe. Recuerda definir el router en el index de la carpeta de rutas con el mismo nombre.`
	);
};
