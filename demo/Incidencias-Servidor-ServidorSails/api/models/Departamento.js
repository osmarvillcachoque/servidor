module.exports = {

	attributes: {

		Nombre: {
			type: 	'string',
			size: 		40,
			required: 	true
		},

		Subdepartamentos: {
			collection: 	'Subdepartamentos',
			via: 		'Departamento'
		}	

	}

};