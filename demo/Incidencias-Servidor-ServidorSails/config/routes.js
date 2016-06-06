module.exports.routes = {

	'GET r|^/Perfil': [
		'UsuarioController.currentUser'
	],

	'GET r|^/Operadores':[
		'UsuarioController.findOperadores'
	],
	
	'GET r|^/Departamento': [
		'UbicacionController.load',
		'DepartamentoController.find'
	],

	'GET r|^/TiposIncidencia': [
		'IncidenciaController.tiposIncidencia'
	],

	'GET r|^/EstadosIncidencia': [
		'IncidenciaController.estadosIncidencia'
	],

	'GET r|^/PrioridadesIncidencia': [
		'IncidenciaController.prioridadesIncidencia'
	],

	'POST r|^/ActualizarDatos':[
		'UsuarioController.updateUsuario'
	],

	'GET r|^/Estadistica':[
		'IncidenciaController.estadistica'
	],

	'POST r|^/EstadisticaUsuario':[
		'IncidenciaController.estadisticaByUsuario'
	],
	
	'POST r|^/EstadisticaInstalacion':[
		'IncidenciaController.estadisticaByInstalacion'
	]
};