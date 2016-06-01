module.exports = {
	
	load: function(req, res, next){
		Ubicacion.find().populateAll().then(function(Ubicaciones){
			if(Ubicaciones){

				req.Ubicaciones;
				UbicacionesJSON = [];

				Ubicaciones.forEach(function(Ubicacion){

					UbicacionJSON = {
						"id":Ubicacion.id,
						"Nombre":Ubicacion.Nombre,
						"Departamento":Ubicacion.Departamento.id,
						"Instalaciones":[]
					};

					Ubicacion.Instalaciones.forEach(function(instalacion){

						UbicacionJSON.Instalaciones.push({ id:instalacion.id, Nombre:instalacion.Nombre, Ubicacion:instalacion.Ubicacion});

					});

					UbicacionesJSON.push(UbicacionJSON);

				});

				req.Ubicaciones = UbicacionesJSON;
				next();

			}
		}).catch(function(error){next(error);});
	},

	create: function (req, res, next){

		if( req.Rol == '1' ){
			var id = 0;
			Ubicacion.count().exec(function(err, cont){
				id = cont + 1;
				Ubicacion.create({
								id: id,
								Nombre: req.body.Nombre,
								Departamento: req.body.Departamento,
								Instalaciones: []
							       }
				).exec(function (err, Ubicacion) {

					if (err) {
						return res.json(err.status, {err: err});
					}

					if (Ubicacion) {
						res.json(200, { msg: 'Ubicacion creada satisfactoriamente.' });
					}
				
				});
			});
		}

	},

	update: function (req, res) {

		Ubicacion.findOne(req.params.id).then(function(Ubicacion) {	

		if ( Ubicacion ) {	

			if ( req.Rol == '1' ) {

				var DepartamentoID = Number(Ubicacion.Departamento.id);
				
				if( DepartamentoID != req.body.Departamento ){

					DepartamentoID = req.body.Departamento;
				}

				Ubicacion.update(
							{ id: Number(req.params.id) }, 		
							{
								Nombre: req.body.Nombre,
								Departamento: DepartamentoID
							}
				).exec(function (err, updated){

					if (err) {
						return err;
					}

					if (updated) {
						res.json(200, { msg: 'El nombre de la Ubicacion "'+ Ubicacion.Nombre +'" ha sido actualizada satisfactoriamente por : "'+updated.Nombre+'"' });
					}

				});

			}
			else {
				return res.json(403, {err: 'No tiene Permiso.'});
			}

		}

		}).catch(function(error){ next(error); });

	},

	delete: function (req, res, next) {

		if( req.Rol == '1' ) {

			Ubicacion.destroy({ id:Number(req.params.id) }).exec(function(deleted){
				if(deleted){
					return res.negotiate(deleted);
				}
				else{
					res.json(200,{deleted});
				}
			});

		}
	}

};

