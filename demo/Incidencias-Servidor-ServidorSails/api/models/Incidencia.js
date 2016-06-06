module.exports = {

	attributes: {

		Titulo: {
			type: 	'string',
			size: 		150,
			required: 	true	
		},


		Descripcion: {
			type: 	'string',
			size: 		255,
			required: 	true
		},
		
		Tipo: {
			type: 		'string',
			enum: 	['Mantenimiento', 'Sistemas'],
			defaultsTo: 	'Mantenimiento'
		},

		Estado: {
			type: 		'string',
			enum: 	['Sin Iniciar', 'En Proceso', 'Pendiente', 'Completada'],
			defaultsTo: 	'Sin Iniciar'
		},


		Prioridad: {
			type: 		'string',
			enum: 	['Baja', 'Media', 'Alta'],
			defaultsTo: 	'Media'
		},

		Comun: {
			type: 		'string',
			enum: 	['Sí', 'No'],
			defaultsTo: 	'No'
		},

		FechaInicio: {
			type: 		'date',
			defaulsTo: null

		},

		FechaPrevista: {
			type: 		'date',
			defaulsTo: null

		},		

		FechaFin: {
			type: 		'date',
			defaulsTo: null

		},

		Instalacion: {
			model: 	'Instalacion',
			required: 	true
		},

		Operador: {
			model: 	'Usuario'
		},

		Propietario: {
			model: 	'Usuario'
		}

	},

	beforeCreate: function (values, cb){
		
		if( values.Operador ) {
			values.FechaInicio = new Date();
			cb();
		}
		else {
			values.FechaInicio = "";
			cb();
		}

	},

	beforeUpdate: function (values, cb) {

		console.log("id "+values.id);
		Incidencia.findOne(values.id).populateAll().then(function(Incidencia){
			if(Incidencia){
				
				if( !Incidencia.FechaInicio || (Incidencia.Operador.id != values.Operador) ) {
					values.FechaInicio = new Date();
				}
				else {
					values.FechaInicio = Incidencia.FechaInicio;
				}
				if( values.Estado == "Completada" ) {
					values.FechaFin = new Date();
				}
				else {
					values.FechaFin = "";
				}

				delete values.id;
				cb();
			}

		});

	}

};