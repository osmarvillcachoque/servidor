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
				res.json(DepartamentosJSON);
			}
		}).catch(function(error){next(error);});
	
	},

	create: function (req, res, next){

		if( req.Rol == '1' ){
			var id = 0 ;
			Departamento.count().exec(function(err, cont){
				id = cont + 1;
				Departamento.create({
								id: id,
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

		Departamento.findOne(req.params.id).then(function(Departamento) {	

		if ( Departamento ) {	

			if ( req.Rol == '1' ) {

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
						res.json(200, { msg: 'El nombre del Departamento "'+ Departamento.Nombre +'" ha sido actualizado satisfactoriamente por : "'+updated.Nombre+'"' });
					}

				});

			}
			else {
				return res.json(403, {err: 'No tiene Permiso.'});
			}

		}

		}).catch(function(error){ next(error); });

	}

};