module.exports.routes = {

	'GET r|^/Perfil': [
		'UsuarioController.currentUser'
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

	'GET r|^/Departamento': [
		'UbicacionController.load',
 		'DepartamentoController.find'
	],

	'GET r|^/Operadores': [
		'UsuarioController.findOperadores'
	],

	'GET r|^/Colaboradores': [
		'UsuarioController.findColaboradores'
	],


	'POST r|^/ActualizarDatos':[
		'UsuarioController.updateUsuario'
	],

	'GET r|^/Estadistica':[
		'IncidenciaController.estadistica'
	],

	'POST r|^/EstadisticaOperador':[
		'IncidenciaController.totalIncidenciasFiltro',
		'IncidenciaController.estadisticaByOperador'
	],

	'POST r|^/EstadisticaColaborador':[
		'IncidenciaController.totalIncidenciasFiltro',
		'IncidenciaController.estadisticaByColaborador'
	],

	'POST r|^/EstadisticaInstalacion':[
		'IncidenciaController.totalIncidenciasFiltro',
		'IncidenciaController.estadisticaByInstalacion'
	],

	'POST r|^/Incidencia/(\\d+)/setUnsetComun$|IncidenciaId':[
		'IncidenciaController.updateComun'
	]

};