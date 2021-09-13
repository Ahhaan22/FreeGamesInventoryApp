let myChart=document.getElementById("myChart").getContext('2d');
let MyPieChart=document.getElementById("MyPieChart").getContext('2d');
let GenreData,number,pc,browser;
//Chart.defaults.global.defaultFontSize=30;
getCookie(decodeURIComponent(document.cookie));

let barChart=new Chart(myChart,{
	type:'bar',//bar, hor bar, pie,line ,dougnut
	data:{
		labels:['Shooter','Strategy','MMORPG','Fighting','Sports','Card'],
		datasets:[{
			label:'Quantity',
			data:GenreData,
			backgroundColor:'#424242',
			borderWidth:3,
			borderColor:'#18FFFF',
		}],
	},
	options:{
		responsive: true,
		tooltips:{
			enabled:false,
		},
		maintainAspectRatio: false,
		scaleFontColor: "#FFFFFF",
        scales: {
        	y: {ticks:{font:{size: function(context){
        							const width=context.chart.width;
									const height=document.getElementById("myChart").offsetHeight;
									if(width>1000){
										return 21.9;
									}
									else{
										return 12.5;
									}
								}
        	},color:'white'},grid:{lineWidth:5}},
        	x: {ticks: {font: {size: function(context){
        							const width=context.chart.width;//context triggers this function when
									console.log(width)
									if(width>1000){
										return 21.9;
									}
									else if(width<400){
										return 9;
									}
									else{
										return 11;
									}
								}
							},
							color:'white',
							weight:"1"
						},
						color:'white',grid:{lineWidth:5}}
        },
        plugins: {
            legend: {
                display: true,
                labels:{font:{
                	size:30
                }},
                position:'top'
            }
        }
	}
});
document.getElementById("totalNum").innerText=number;
let pieChart=new Chart(MyPieChart,{
	type: 'doughnut',
	data:{
		labels:['PC','WEB BROSWER'],
		datasets:[{
			label:'Quantity',
			data:[pc,browser],
			backgroundColor:["#7E3FF2","#FF4081"],
			borderWidth:0
		}]
	},
	options:{
		responsive: true,
		tooltips:{
			enabled:false,
		},
		plugins: {
            legend: {
                display: true,
                labels:{font:{
                	size:function(context){
        							const width=context.chart.width;
        							console.log(width);
									const height=document.getElementById("myChart").offsetHeight;
									if(width>1000){
										return 60;
									}
									else{
										console.log(12.5);
										return 27.5;
									}
								}
                }},
                position:'bottom'
            }
        }
	}});

function getCookie (cookie) {
	// body... 
	let cookieJSON='';
	const cookieArray=cookie.split(";");
	cookieArray.map((element,index)=>{
		const tempArray=element.split("=");
		cookieArray[index]=`"${tempArray[0].replace(" ","")}":${tempArray[1]}`;
	});
	for(let i=0;i<cookieArray.length;i++){
		if(i==0){
			cookieJSON+=`{${cookieArray[i]}`;
		}
		else if(i==3){
			cookieJSON+=`,${cookieArray[i]}}`
		}
		else {
			cookieJSON+=`,${cookieArray[i]}`;
		}
	}
	const cookieObj=JSON.parse(cookieJSON);
	const {Browser,data,genres,PC}=cookieObj;
	console.log(cookieObj);
	number=data;
	browser=Browser;
	pc=PC;
	const {Shooter,Fighting,MMORPG,Card,Sports,Strategy}=genres;
	GenreData=[Shooter,Strategy,MMORPG,Fighting,Sports,Card];
}