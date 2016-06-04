module.exports = {

	find: function (req, res, next) {

		if ( req.Rol == '1' ) {

			Incidencia.find().populateAll()

				.then(function(Incidencias) {
					
					var IncidenciasJSON = 	[];
					var Ubicaciones = 	[];
					var FindUbicacion;
					var Departamentos = 	[];

					if (Incidencias) {

						Incidencias.forEach(function(Incidencia) {
							
							var Operador = "Sin Asignar";
							if ( Incidencia.Operador != null ) {
								Operador = Incidencia.Operador.Nombre + " " + Incidencia.Operador.Apellidos;
							}
							var Propietario = "Usuario eliminado";
							if ( Incidencia.Propietario != null ) {
								Propietario = Incidencia.Propietario.Nombre + " " + Incidencia.Propietario.Apellidos;
							}

							IncidenciaJSON = { 
								"id": 				Incidencia.id,
								"Titulo": 			Incidencia.Titulo, 
								"Descripcion": 		Incidencia.Descripcion, 
								"Departamento": 	"",
								"Ubicacion": 		"", 
								"Instalacion": 		Incidencia.Instalacion.Nombre,
								"Tipo": 			Incidencia.Tipo, 
								"Operador": 		Operador,
								"Propietario": 		Propietario,
								"Estado": 			Incidencia.Estado,
								"Prioridad": 		Incidencia.Prioridad,
								"FechaCreacion": 	Incidencia.createdAt,
								"FechaInicio": 		Incidencia.FechaInicio,
								"FechaPrevista": 		Incidencia.FechaPrevista,
								"FechaFin": 		Incidencia.FechaFin,
								"Comun":  			Incidencia.Comun
							}

							FindUbicacion = Ubicacion.findOne(Incidencia.Instalacion.Ubicacion).populateAll()
								
								.then(function(Ubicacion){
									return (Ubicaciones.push(Ubicacion.Nombre),Departamentos.push(Ubicacion.Departamento.Nombre) );

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];
					}
					else { 
						return null;
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Ubicacion = Ubicaciones[index];
						IncidenciaJSON.Departamento = Departamentos[index];
					})
					return res.json(200, { IncidenciasJSON });
				})

				.catch(function(error) { next(error); });

		}

		else if ( req.Rol == '2' ) {

			Incidencia.find().where({ or: [ { "Operador": req.Usuario.id }, { "Comun": "Sí" } ] }).populateAll()

				.then(function(Incidencias) {
					
					var IncidenciasJSON = 	[];
					var Ubicaciones = 	[];
					var FindUbicacion;
					var Departamentos = 	[];

					if (Incidencias) {

						Incidencias.forEach(function(Incidencia) {

							var Propietario = "Usuario eliminado";
							if ( Incidencia.Propietario != null ) {
								Operador = Incidencia.Propietario.Nombre + " " + Incidencia.Propietario.Apellidos;
							}

							IncidenciaJSON = {
								"id": 				Incidencia.id,
								"Titulo": 			Incidencia.Titulo, 
								"Descripcion": 		Incidencia.Descripcion, 
								"Departamento": 	"", 
								"Ubicacion": 		"",
								"Instalacion": 		Incidencia.Instalacion.Nombre,
								"Tipo": 			Incidencia.Tipo, 
								"Propietario": 		Propietario,
								"Estado":  			Incidencia.Estado,
								"Prioridad": 		Incidencia.Prioridad,
								"FechaPrevista": 		Incidencia.FechaPrevista,
								"Comun": 			Incidencia.Comun
							}

							FindUbicacion = Ubicacion.findOne(Incidencia.Instalacion.Ubicacion).populateAll()

								.then(function(Ubicacion){

									return ( Ubicaciones.push(Ubicacion.Nombre),Departamentos.push(Ubicacion.Departamento.Nombre) );

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];


					}
					else { 
						return null;
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Departamento = Departamentos[index];
						IncidenciaJSON.Ubicacion = Ubicaciones[index];
					})
					return res.json(200, { IncidenciasJSON });
				})

				.catch(function(error){ next(error); });

		}

		else if ( req.Rol == '3' ) {

			Incidencia.find().where({ or: [ { "Propietario": req.Usuario.id }, { "Comun": "Sí" } ] }).populateAll()

				.then(function(Incidencias){
					
					var IncidenciasJSON =	[];
					var Ubicaciones =	[];
					var FindUbicacion;
					var Departamentos = 	[];

					if (Incidencias) {

						Incidencias.forEach(function(Incidencia) {
							var Operador = "Sin Asignar";

							if ( Incidencia.Operador != null ) {
								Operador = Incidencia.Operador.Nombre + " " + Incidencia.Operador.Apellidos;
							}

							IncidenciaJSON = {
								"id": 				Incidencia.id,
								"Titulo": 			Incidencia.Titulo, 
								"Descripcion": 		Incidencia.Descripcion, 
								"Departamento": 	"", 
								"Ubicacion": 		"",
								"Instalacion": 		Incidencia.Instalacion.Nombre,
								"Tipo": 			Incidencia.Tipo, 
								"Operador": 		Operador,
								"Estado": 			Incidencia.Estado,
								"FechaCreacion": 	Incidencia.createdAt,
								"Comun": 			Incidencia.Comun
							}

							FindUbicacion = Ubicacion.findOne(Incidencia.Instalacion.Ubicacion).populateAll()

								.then(function(Ubicacion){

									return ( Ubicaciones.push(Ubicacion.Nombre),Departamentos.push(Ubicacion.Departamento.Nombre) );

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];


					}
					else { 
						return null;
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Departamento = Departamentos[index];
						IncidenciaJSON.Ubicacion = Ubicaciones[index];
					})
					return res.json(200, { IncidenciasJSON });
				})

				.catch(function(error){ next(error); });
		}

	},

	create: function (req, res) {

		if ( req.Rol == '1' ) {

			var Operador = "Sin Asignar";

			if ( req.body.Operador != null ) {
				Operador = req.body.Operador;
			}

			Incidencia.create({
							Titulo: 		req.body.Titulo,
							Descripcion: 	req.body.Descripcion,
							Tipo: 			req.body.Tipo,
							Estado: 		req.body.Estado,
							Prioridad: 		req.body.Prioridad,
							Comun: 		req.body.Comun,
							FechaInicio: 	req.body.FechaInicio,
							FechaPrevista: 	req.body.FechaPrevista,
							FechaFin: 		req.body.FechaFin,
							Instalacion: 	req.body.Instalacion,
							Operador: 		Operador,
							Propietario: 	req.Usuario
						}
			).exec(function (err, Incidencia) {

				if (err) {
					return res.json(err.status, {err: err});
				}

				if (Incidencia) {
					res.json(200, { msg: 'Incidencia creada satisfactoriamente.' });
				}
			
			});

		}

		else if ( req.Rol == '3' ) {

			var Operador = "Sin asignar";
			Incidencia.create({
							Titulo: 		req.body.Titulo,
							Descripcion: 	req.body.Descripcion,
							Tipo: 			req.body.Tipo,
							Instalacion: 	req.body.Instalacion,
							Operador: 		Operador,
							Propietario: 	req.Usuario
						}
			).exec(function (err, Incidencia) {

				if (err) {
					return res.json(err.status, {err: err});
				}

				if (Incidencia) {
					res.json(200, { msg: 'Incidencia creada satisfactoriamente.' });
				}
			
			});

		}

		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}

	},

	findOne: function (req, res, next) {

		if ( req.Rol == '1'){

		Incidencia.findOne(req.params.id).populateAll()

				.then(function(Incidencia){
					
					var IncidenciaJSON = [];
					var DepartamentoIncidencia;
					var FindDepartamento;

					if (Incidencia){

							DatosIncidencia = { 
								"id": 				Incidencia.id,
								"Titulo":      		Incidencia.Titulo, 
								"Descripcion": 		Incidencia.Descripcion, 
								"Departamento": 	"", 
								"Instalacion": 		{ "id": Incidencia.Instalacion.id, "Nombre": Incidencia.Instalacion.Nombre },
								"Tipo": 			Incidencia.Tipo, 
								"Operador": 		Incidencia.Operador.Nombre + " " + Incidencia.Operador.Apellidos,
								"Estado": 			Incidencia.Estado,
								"Prioridad": 		Incidencia.Prioridad,
								"FechaInicio": 		Incidencia.FechaInicio,
								"FechaPrevista": 		Incidencia.FechaPrevista,
								"FechaFin": 		Incidencia.FechaFin,
								"Comun": 			Incidencia.Comun,
								"Propietario": 		Incidencia.Propietario.Nombre + " " + Incidencia.Propietario.Apellidos
							}

							FindDepartamento = Departamento.findOne(Incidencia.Instalacion.Departamento)

								.then(function(Departamento){
									console.log("Departamento");
									console.log(Departamento);

									DepartamentoIncidencia = Departamento.Nombre;
									return DepartamentoIncidencia;

								});

							IncidenciaJSON.push(DatosIncidencia);

						return [IncidenciaJSON, FindDepartamento];


					}
					else { 
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciaJSON, FindDepartamento];

				})

				.spread(function(IncidenciaJSON, FindDepartamento) {

					IncidenciaJSON.Departamento = FindDepartamento;
					return res.json(IncidenciaJSON);

				}).catch(function(error){ next(error); });

		}
		else if ( req.Rol == '2' ){

			Incidencia.findOne(req.params.id).then(function(Incidencia){

				if (Incidencia){

					res.json({ "id": Incidencia.id, "Estado": Incidencia.Estado });

				}
				else { 
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}


			}).catch(function(error){ next(error); });

		}

		else if ( req.Rol == '3' ){
			Incidencia.findOne(req.params.id).populateAll().then(function(Incidencia){

				if (Incidencia){

					res.json({ 	
							"id": 			Incidencia.id, 
							"Titulo": 		Incidencia.Titulo, 
							"Descripcion": 	Incidencia.Descripcion, 
							"Tipo": 		Incidencia.Tipo, 
							"Instalacion": 	{ "id": Incidencia.Instalacion.id, "Nombre": Incidencia.Instalacion.Nombre }
 					});

				}
				else { 
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}


			}).catch(function(error){ next(error); });
		}
		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}

	},

	update: function (req, res) {

		Incidencia.findOne(req.params.id).populateAll().then(function(incidencia) {	

		if ( incidencia ) {	

			if ( req.Rol == '1' ) {

				Incidencia.update(
							{ id: Number(req.params.id) }, 		
							{
								Titulo: 		req.body.Titulo,
								Descripcion: 	req.body.Descripcion,
								Tipo: 			req.body.Tipo,
								Estado: 		req.body.Estado,
								Prioridad: 		req.body.Prioridad,
								Comun: 		req.body.Comun,
								FechaInicio: 	req.body.FechaInicio,
								FechaPrevista: 	req.body.FechaPrevista,
								FechaFin: 		req.body.FechaFin,
								Instalacion: 	req.body.Instalacion,
								Operador: 		req.body.Operador,
							}
				).exec(function (err, updated){

					if (err) {
						return err;
					}

					if (updated) {
						res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
					}

				});

			}

			else if ( req.Rol == '2' ) {
				
				Incidencia.update(
	 						{ 	id: Number(req.params.id), Operador: Number(req.Usuario.id) }, 		
							{ 	
								FechaFin: 	"",
								Estado: 	req.body.Estado 
							}
				).where( { id: req.params.id }, { Operador: req.Usuario } ).exec(function (err, updated){

					if (err) {
					 	return err;
					}

					if (updated) {
						res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
					}

				});

			}

			else if ( req.Rol == '3' ) {
				Incidencia.update(
	 							{ 	id: Number(req.params.id), Propietario: Number(req.Usuario.id) }, 		
	 							{
									Titulo: 		req.body.Titulo,
									Descripcion: 	req.body.Descripcion,
									Tipo: 			req.body.Tipo,
									Instalacion: 	req.body.Instalacion,
								}
				).exec(function (err, updated){

					if (err) {
					 	return err;
					}

					if (updated) {
						res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
					}

				});
			}
			else {
					return res.json(403, {err: 'No tiene Permiso.'});
			}

		}

		}).catch(function(error){ next(error); });

		
	},

	tiposIncidencia: function (req, res) {
		var Tipos = Incidencia.attributes.Tipo.enum;	

		if ( req.Rol == '1' || req.Rol == '3' ) {
			res.json(200, { Tipos });	
		}

	},

	estadosIncidencia: function (req, res) {
		var Estados = Incidencia.attributes.Estado.enum;

		if ( req.Rol == '1' || req.Rol == '2' || req.Rol == '3' ) {
			res.json(200, { Estados });	
		}
	},

	prioridadesIncidencia: function (req, res) {
		var Prioridades = Incidencia.attributes.Prioridad.enum;

		if ( req.Rol == '1' ) {
			res.json(200, { Prioridades });	
		}
	},

	delete: function (req, res, next) {

		if( req.Rol == '1' ) {

			Incidencia.destroy({ id:Number(req.params.id) }).exec(function(deleted){
				if(deleted){
					return res.negotiate(deleted);
				}
				else{
					res.json(200,{deleted});
				}
			});

		}
	},

	//Estadistica general
	estadistica: function(req, res, next){

		if( req.Rol == '1' ){
		
			req.count;
			Incidencia.count().then(function(count){
				req.count = count;
			}).catch(function(error){ next(error); });

			Incidencia.find().then(function(Incidencias){

				if(Incidencias){
	
					var tipo1 = 0; var tipo2 = 0;
					var estado1 = 0; var estado2 = 0; var estado3 = 0; var estado4 = 0;
					var comunSi = 0; var comunNo = 0;
					var IncidenciaSinAsignar = 0;

					Incidencias.forEach(function(incidencia){

						if(incidencia.Tipo == 'Sistemas'){
							tipo1++;
						}
						else{tipo2++;}

						if(incidencia.Estado == 'Sin Iniciar'){
							estado1++;
						}
						else if(incidencia.Estado == 'En Proceso'){
							estado2++;	
						}
						else if(incidencia.Estado == 'Pendiente'){
							estado3++;
						}
						else if(incidencia.Estado == 'Completada'){
							estado4++;
						}

						if(incidencia.Comun == 'Sí'){
							comunSi++;
						}
						else if(incidencia.Comun == 'No'){
							comunNo++;
						}
						console.log(incidencia.Operador);
						if( !incidencia.Operador ){
							IncidenciaSinAsignar++;
						} 
					});
					var informe = {

						Total: 			req.count,
						SinAsignar: 		IncidenciaSinAsignar,
						DeSistemas: 		tipo1,
						DeMantenimiento: 	tipo2,
						ComunesSi: 		comunSi,
						ComunesNo: 		comunNo,
						SinIniciar: 			estado1,
						EnProceso: 		estado2,
						Pendiente: 			estado3,
						Completadas: 		estado4

					}

					res.json(200, { informe });
				}

			}).catch(function(error){ next(error); });

		}
		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}
	},
	
	estadisticaByUsuario: function(req, res, next) {

		if( req.Rol == '1' ){

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});

		}
			
	},

	estadisticaByInstalacion: function(req, res, next){

		if( req.Rol == '1' ){
		
			Incidencia.find().where({

					FechaInicio: 	{ '>=': req.body.FechaInicio	},
					FechaFin: 		{ '<=': req.body.FechaFin	},
					Instalacion: 		  req.body.Instalacion	

				}).then(function(Incidencias){

					var total = 0;
					var sistemas = 0; var mantenimiento = 0;
					var estado1 = 0; var estado2 = 0; var estado3 = 0; var estado4 = 0;
					var IncidenciaSinAsignar = 0;

					Incidencias.forEach(function(incidencia){
						console.log(incidencia);
						if(incidencia.Tipo == 'Sistemas'){
							sistemas++;
						}
						else{mantenimiento++;}

						if(incidencia.Estado == 'Sin Iniciar'){
							estado1++;
						}
						else if(incidencia.Estado == 'En Proceso'){
							estado2++;	
						}
						else if(incidencia.Estado == 'Pendiente'){
							estado3++;
						}
						else if(incidencia.Estado == 'Completada'){
							estado4++;
						}

						if( !incidencia.Operador ){
							IncidenciaSinAsignar++;
						}

					});

					var estadisticaByInstalacion = {

						Total: 			Incidencias.length,
						SinAsignar: 		IncidenciaSinAsignar,
						DeSistemas: 		sistemas,
						DeMantenimiento: 	mantenimiento,
						SinIniciar: 			estado1,
						EnProceso: 			estado2,
						Pendiente: 			estado3,
						Completadas: 		estado4

					}

					res.json(200, { estadisticaByInstalacion });

			}).catch(function(error){ next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});

		}

	}	



}