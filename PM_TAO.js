var k= document.getElementById("input_k");
var b= document.getElementById("input_b");
var a=document.getElementById("input_a");


var boton=document.getElementById("boton");
var botonayuda=document.getElementById("botonayuda");

var r=document.getElementById("resultado");
var r2=document.getElementById("ayuda");
var p_discreto=0.0;
var i_discreto=0.0;
var d_discreto=0.0;

var Tao=0;
var Ganancia=0.0;
var Ts=0;

var aux=0;

function calcular(){

    k.value=parseFloat(k.value);
    b.value=parseFloat(b.value);
    a.value=parseFloat(a.value);


    if (k.value > 0 && a.value>0 && b.value>0)
    {
        Tao=1/ (a.value/ b.value);
        Ganancia=k.value/b.value;
        Ts=4*Tao;
        r.innerHTML="Los parámetros del sistema de primer orden son: "+"<br/>"+"Tao= "+ Tao.toFixed(3) + "<br/>"+"  Ganancia= "+ Ganancia.toFixed(3) + "<br/>"+"Tiempo de estabilizacion en segundos= "+ Ts.toFixed(3); 
    }
    else
    {   
        r.innerHTML="Error de parametros";
    }
}
function ayuda()
{
    if(aux==1)
    {
        aux=0;
        r2.innerHTML="";

    }
    else
    {
        aux=aux+1;
        r2.innerHTML="Este programa permite graficar un sistema de primer orden a partir de su función de transferencia, el software elije automaticamente el tiempo de muestreo y el tamaño de los ejes para tener siempre una visualización optima.";
    }
    
}

  function draw() {
    try {
      // compile the expression once
      const expression = k.value+"*(1-e^(-x*"+a.value+"))"
      const expr = math.compile(expression)

      // evaluate the expression repeatedly for different values of x
      const xValues = math.range(0, 8/a.value, 0.1/a.value).toArray()
      const yValues = xValues.map(function (x) {
        return expr.evaluate({x: x})
      })

      // render the plot using plotly
      const trace1 = {
        x: xValues,
        y: yValues,
        textfont: {
            family: 'Arial Black',
            size: 18,
            color: '#1f77b4'
          },
        type: 'scatter'
      }
      const data = [trace1]
      
      var layout = {
        autosize: true,
        margin: {
            l: 80,
            r: 50,
            b: 60,
            t: 20,
            pad: 4
          },


        xaxis: { 
          tickfont: {
            family: 'Arial Black',
            size: 24,
            color: 'black'
          },
            color: '#000000',
            tickfont_family:'Arial Black',
            title: {
              text: 'Tiempo(s)',
              autosize: true,
              automargin: false,
              font: {family: 'Arial Black',
               size: 15,color: '#000000'
              }
            }
        },

        yaxis: {
          title: {
            text: 'Amplitud',
            autosize: true,
            automargin: false,
            font: {family: 'Arial Black',
             size: 15,color: '#000000'
            }},
          tickfont: {
            family: 'Arial Black',
            size: 24,
            color: 'black'
          },
      
        
          autosize: true,
          automargin: true,
          titlefont: { size:15 },
          color: '#000000'

        },  
        paper_bgcolor: '#2760B8',
        plot_bgcolor: '#c7c7c7',
        showlegend: false
      };
      Plotly.newPlot('plot', data, layout, {displayModeBar: false})
    }
    catch (err) {
      console.error(err)
      alert(err)
    }
  }




botonayuda.addEventListener("click",ayuda);
boton.addEventListener("click",draw);

 


