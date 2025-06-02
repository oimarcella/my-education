import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type TPieChartGrafic = {
	data : Array<{name:string, value: number}>
}

const COLORS = ['#0069d9', '#28a745', '#cf41e7', '#3498db','#f39c12','#8e44ad','#e67e22','#1abc9c','#e84393' ];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


function PieChartGrafic(props: TPieChartGrafic) {

	return (
    	<div style={{ width: '100%', height: 300 }}>
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={props.data}
					cx={"50%"}
					cy={"40%"}
            		labelLine={false}
					outerRadius={100}
					fill="#8884d8"
					paddingAngle={0}
					dataKey="value"
            		label={renderCustomizedLabel}
				>
					{props.data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				{<Legend />}
      		</PieChart>
		</ResponsiveContainer>
		</div>
	)
}

export default PieChartGrafic;