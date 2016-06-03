module.exports = {

	find: function (req, res, next){

		Departamento.find().then(function(Departamentos){

			if(Departamentos){

				var Ubicaciones = req.Ubicaciones;
				DepartamentosJSON = [];

				Departamentos.forEach(function(departamento){

					DepartamentoJSON = {
							"id":departamento.id,
							"Nombre":departamento.Nombre,
							"Ubicaciones":[]
						};

					Ubicaciones.forEach(function(Ubicacion){

						if( departamento.id == Ubicacion.Departamento ){

							DepartamentoJSON.Ubicaciones.push({id:Ubicacion.id,Nombre:Ubicacion.Nombre, Departamento:Ubicacion.Departamento ,Instalaciones:Ubicacion.Instalaciones});

						}
					});

					DepartamentosJSON.push(DepartamentoJSON);
				});
				res.json(200, { DepartamentosJSON });
			}
		}).catch(function(error){next(error);});
	
	},

	create: function (req, res, next){

		if( req.Rol == '1' ){
			var id = 0 ;
			Departamento.count().exec(function(err, cont){

				Departamento.create({
								id: cont + 1,
								Nombre: req.body.Nombre,
								Ubicaciones: []
							       }
				).exec(function (err, Departamento) {

					if (err) {
						return res.json(err.status, {err: err});
					}

					if (Departamento) {
						res.json(200, { msg: 'Departamento creado satisfactoriamente.' });
					}
				
				});
			});

			
		}
		else {
			return res.json(403, {err: 'No tiene Permiso.'});
		}

	},

	update: function (req, res) {

		if ( req.Rol == '1' ) {

			Departamento.findOne(req.params.id).then(function(Departamento) {	

			if ( Departamento ) {	

					Departamento.update(
								{ id: Number(req.params.id) }, 		
								{
									Nombre: req.body.Nombre
								}
					).exec(function (err, updated){

						if (err) {
							return err;
						}

						if (updated) {
							res.json(200, { msg: 'El Departamento ha sido actualizado satisfactoriamente'});
						}

					});

				

			}

			}).catch(function(error){ next(error); });

		}
		else {

			return res.json(403, {err: 'No tiene Permiso.'});

		}

	},

	delete: function (req, res, next) {

		if( req.Rol == '1' ) {

			Departamento.destroy({ id:Number(req.params.id) }).exec(function(deleted){
				if (deleted){

					return res.json(200, {err: 'El departamento ha sido borrado satisfactoriamente.'});

				}
				else{

					return res.json(404, {err: 'Error al borrar el departamento.'});
					
				}
			});

		}
	}

};