module.exports = {

	attributes: {

		Nombre: {
			type: 	'string',
			size: 		40,
			required: 	true
		},

		Subdepartamento: {
			model:  	'Subdepartamento'
		},

		Incidencias: {
			collection: 	'Incidencia',
			via: 		'Instalacion'
		}

	}

};