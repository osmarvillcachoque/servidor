angular.module("AppIncidencias")

	.controller('AdminController', function ($scope, $filter, $http, $route, $uibModalInstance, SupervisorService, IncidenciaID) {

		$scope.cargarDatos = function() {

			SupervisorService.getDepartamentos()

				.success(function(data) {

					$scope.Departamentos = data.DepartamentosJSON;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.UbicacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0];
					$scope.InstalacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0].Instalaciones[0];

					SupervisorService.getSupervisores()

						.success(function(data) {

							$scope.Supervisores = data.Supervisores;
							$scope.SupervisorSeleccionado = $scope.Supervisores[0];

							SupervisorService.getOperadores()

							.success(function(data) {

								$scope.Operadores = data.Operadores;
								$scope.OperadorSeleccionado = $scope.Operadores[0];
								
								//
								SupervisorService.getColaboradores()

								.success(function(data) {

									$scope.Colaboradores = data.Colaboradores;
									$scope.ColaboradorSeleccionado = $scope.Colaboradores[0];
									$scope.DatosCargados = true;

								})

								.error(function(error) {
									console.log(error);
								})
								
								//

							})

							.error(function(error) {
								console.log(error);
							})

						})

						.error(function(error) {
							console.log(error);
						})

				})

				.error(function(error) {
					console.log(error);
				})

		};

		$scope.setUbicacion = function() {
			$scope.UbicacionSeleccionada = $scope.Departamentos[$scope.DepartamentoSeleccionado.id - 1].Ubicaciones[0];
			$scope.setInstalacion();

			$scope.filtro = '';

			$scope.getData = function () {
			return $filter('filter')($scope.data, $scope.filtro)
			}


		};

		$scope.setInstalacion = function() {
			$scope.InstalacionSeleccionada =$scope.UbicacionSeleccionada.Instalaciones[0];		
		};

		$scope.setDepartamento = function(InstalacionID) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					for ( var m = 0 ; m < $scope.Departamentos[i].Ubicaciones[n].Instalaciones.length ; m++ ){
						if ( $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == InstalacionID ) {
							$scope.DepartamentoSeleccionado = $scope.Departamentos[i];	
							$scope.UbicacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n];
							$scope.InstalacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m];
						}
					}						
				}
			}
		}


		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
		};
		/*ADMIN*/
		$scope.Admin = function () {
			$scope.items = ['Crear', 'Editar','Eliminar'];
  			$scope.selection = $scope.items[0];
		};

		
		$scope.CrearDepartamento = function () {

		};

		$scope.CrearUbicacion = function () {

		};

		$scope.CrearInstalacion = function () {
			
		};

		/*editar instalacion*/
		$scope.EliminarUsuario = function () {

		};



	});



var app=angular.module('AppIncidencias');
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});