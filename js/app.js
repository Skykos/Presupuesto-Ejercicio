const ingresos = [
    new Ingreso('Salario',700000),
    new Ingreso('Venta de coche',800000)
]

const egresos = [
    new Egreso('Renta',300000),
    new Egreso('Ropa',120000)
]

let cargarApp= ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngresos= 0;
    ingresos.forEach(ingre => {
        totalIngresos += ingre.valor 
    });
    return totalIngresos
}

let totalEgresos = ()=>{
    let totalegreso= 0;
    egresos.forEach(egre => {
        totalegreso += egre.valor 
    });
    return totalegreso
}


let cargarCabecero = ()=>{
    
    document.getElementById('ingreso').innerHTML = formatoMoneda(totalIngresos())
    document.getElementById('egreso').innerHTML = formatoMoneda(totalEgresos())
    document.getElementById('presupuesto').innerHTML = formatoMoneda((totalIngresos() - totalEgresos()))
    document.getElementById('porcentaje').innerHTML = formatoporcentaje((totalEgresos()/totalIngresos()))


}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-CO',{style:'currency', currency:'COP',minimumFractionDigits:2});
}

const formatoporcentaje =(valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2})
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';

    ingresos.forEach(ingre=>{
        ingresosHTML += crearIngresoHTML(ingre)
    })

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarIngreso(${ingreso.id})" ></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return ingresoHTML;
}

const eliminarIngreso= (id) =>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id)
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();

}


const cargarEgresos = ()=>{
    let egresosHTML = '';

    egresos.forEach(egre=>{
        egresosHTML += crearEgresoHTML(egre)
    })

    document.getElementById('lista-egresos').innerHTML = egresosHTML
}

const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoporcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarEgreso(${egreso.id})"    ></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return egresoHTML;

}

const eliminarEgreso= (id) =>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id)
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();

}

const agregarDato = ()=>{
    let form = document.forms['forma'];

    let tipo = form['tipo'];
    let descripcion = form['descripcion'];
    let valor = form['valor'];

    if(descripcion.value != '' &&  valor.value!=''){
        if(tipo.value === 'ingreso'){
            ingresos.push (new Ingreso(descripcion.value,+(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }else{
            egresos.push(new Egreso(descripcion.value,+(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    }

}