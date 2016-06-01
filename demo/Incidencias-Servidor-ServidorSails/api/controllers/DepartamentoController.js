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
	
	}

};