module.exports = {
	
	load: function(req, res, next){
		Subdepartamento.find().populateAll().then(function(Subdepartamentos){
			if(Subdepartamentos){

				req.Subdepartamentos;
				SubdepartamentosJSON = [];

				Subdepartamentos.forEach(function(subdepartamento){

					SubdepartamentoJSON = {
						"id":subdepartamento.id,
						"Nombre":subdepartamento.Nombre,
						"Departamento":subdepartamento.Departamento.id,
						"Instalaciones":[]
					};

					subdepartamento.Instalaciones.forEach(function(instalacion){

						SubdepartamentoJSON.Instalaciones.push({ id:instalacion.id, Nombre:instalacion.Nombre, Subdepartamento:instalacion.Subdepartamento});

					});

					SubdepartamentosJSON.push(SubdepartamentoJSON);

				});

				req.Subdepartamentos = SubdepartamentosJSON;
				next();

			}
		}).catch(function(error){next(error);});
	}

};

