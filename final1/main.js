const diCaprioBirthYear = 1974;
const ageD = function(year) { return year - diCaprioBirthYear}
const today = new Date().getFullYear()
const ageToday = ageD(today)

//definimos las constantes 
const ancho =800
const alto =600
const margen ={
    superior:10,
    inferior: 40,
    izquierdo: 60,
    derecho:10

}
const svg=d3.select("#chart").append("svg").attr("width",ancho).attr("height", alto)
const grupoElementos= svg.append("g").attr("id", "grupoElementos")

//ejes y scalas
var x= d3.scaleTime().range([0, ancho-margen.izquierdo-margen.derecho]).padding(0.1)
var y= d3.scaleLinear().range([alto-margen.inferior-margen.superior,0])

//funciones
const formatDate=d3.timeParse("%Y");

//grupo de grupo ejes
const grupoEjes=svg.append("g").attr("id","grupoEjes")
const grupoX=grupoEjes.append("g").attr("id","grupoX")
    .attr("transform", `translate(${margen.izquierdo}, ${alto-margen.inferior})`)
const grupoY=grupoEjes.append("g").attr("id","grupoY")
    .attr("transform", `translate(${margen.izquierdo}, ${margen.superior})`)

////constantes x y 
const ejeX=d3.axisBottom().scale(x)
const ejeY=d3.axisLeft().scale(y)
var arrayDcaprio= [0,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52]
//array de colores para poner color en cada barra
const coloresArray =["red", "blue", "purple", "gray", "green", "lightseagreen",
"lightblue", "pink"]

d3.csv("data.csv").then(misDatos=>{
    //console.log(misDatos)
    //en csv ya estan en array no se usa el object
    //se parcean datos con map y guardan en variable datos misDatos
    misDatos.map(d=>{
        d.age=+d.age
        d.year=formatDate(d.year)

      })
     //console.log(misDatos)
     //Dominio
      y.domain([
        0, //inicio de la y el numero minimo
        d3.max(arrayDcaprio)//final de la raya numero maximo
       ])
       x.domain([
        d3.min(misDatos.map(d=>d.year)), //inicio de la x el numero minimo
        d3.max(misDatos.map(d=>d.year))
       ])
     //console.log(misDatos)
     grupoX.call(ejeX)
     grupoY.call(ejeY)

       //databinding
      elementos= grupoElementos.selectAll("rect").data(misDatos)
      elementos.enter().append("rect")
      .attr("fill",(d,i)=>coloresArray[i])
      .attr("height", d=> alto-margen.superior-margen.inferior -y(d.age))
      .attr("y", arrayDcaprio)  //donde empieza la barra
      .attr("x", d=>x(d.year))//retorno naturar de la escala
      .attr("width", x.bandwidth())// el valor de ancho de la banda calculado con la escala x


 
})

