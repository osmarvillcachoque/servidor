module.exports = {

	find: function (req, res, next){

		Departamento.find().populateAll().then(function(Departamentos){

			var DepartamentosJSON = [];
			var Subdepartamentos = [];
			var FindSubdepartamento;
			var Instalaciones = [];
			if(Departamentos){
				Departamentos.forEach(function(Departamento){
					DepartamentoJSON = {
						"id":Departamento.id,
						"Nombre":Departamento.Nombre,
						"Instalaciones":"",
					}
					FindSubdepartamento = Subdepartamento.find({
							where:{Departamento:Departamento.id}
						}).populate('Instalaciones').then(function(subdepartamentos){
							//console.log(subdepartamentos);
							subdepartamentos.forEach(function(subdepartamento){
								return ( Subdepartamentos.push(subdepartamentos), Instalaciones.push(subdepartamento.Instalaciones) );
							});
							
						});
					DepartamentosJSON.push(DepartamentoJSON);
				});

				return [DepartamentosJSON, FindSubdepartamento, Subdepartamentos, Instalaciones];
			}
			

		})
		.spread(function(DepartamentosJSON, FindSubdepartamento, Subdepartamentos, Instalaciones) {

			/*DepartamentosJSON.forEach(function(DepartamentoJSON, index) {
				Subdepartamentos.forEach(function(Subdepartamento, index2){
					DepartamentoJSON[index].Subdepartamento[index2] = Subdepartamento[index];
					DepartamentoJSON.Departamento = Departamentos[index];
				})
				
			})*/
			console.log("DepartamentosJSON");
			console.log(DepartamentosJSON);
			console.log("FindSubdepartamento");
			console.log(FindSubdepartamento);
			console.log("Subdepartamentos");
			console.log(Subdepartamentos);
			console.log("Instalaciones");
			console.log(Instalaciones);
			return res.json(DepartamentosJSON);
		})

		.catch(function(error){ next(error); });
	
	}
	/*find: function (req, res, next){
	
		Departamento.find().populateAll().then(function(Departamentos){
	
			if (Departamentos) {

				var DepartamentosJSON = [];

				Departamentos.forEach(function(Departamento){

					 var Instalaciones = [];

					Departamento.Instalaciones.forEach(function(Instalacion){
						
						Instalaciones.push({ id: Instalacion.id, Nombre: Instalacion.Nombre });

					});

					DepartamentosJSON.push({ id: Departamento.id, Nombre: Departamento.Nombre, Instalaciones: Departamento.Instalaciones });

				});

				res.json(DepartamentosJSON);

			}
			else { 
				res.json(404, {err: 'No se han encontrado Departamentos.'});
			}
	
		}).catch(function(error){next(error);});
	
	}*/

};