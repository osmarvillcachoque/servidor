module.exports = {

  attributes: {

  	Nombre: {
		type: 	'string',
		size: 		40,
		required: 	true
	},

	Departamento: {
		model:  	'Departamento'
	},

	Instalaciones: {
		collection: 	'Instalacion',
		via: 		'Subdepartamento'
	}	
  }
};

