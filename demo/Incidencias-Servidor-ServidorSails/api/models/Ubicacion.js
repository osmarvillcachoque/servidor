module.exports = {

  attributes: {

  	Nombre: {
		type: 	'string',
		size: 		40,
		required: 	true
	},

	Departamento: {
		model:  	'Departamento',
		required: 	true
	},

	Instalaciones: {
		collection: 	'Instalacion',
		via: 		'Ubicacion'
	}	
  }
};

