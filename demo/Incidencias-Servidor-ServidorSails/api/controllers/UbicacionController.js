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

			Ubicacion.create({
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
		}

	}

};

