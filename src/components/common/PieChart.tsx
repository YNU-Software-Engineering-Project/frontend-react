import { PieChart as MUIpieChart } from '@mui/x-charts';

type DataType = {
  id?: number;
  label?: string;
  value: number;
  color?: string;
};

type PieChartProps = {
  chartData: DataType[];
};

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MUIpieChart
        series={[
          {
            data: chartData,
            innerRadius: '70%',
            outerRadius: '100%',
            arcLabel: item => `${Math.round((item.value / totalValue) * 100)}%`,
          },
        ]}
        width={300}
        height={300}
        colors={chartData.map(item => item.color || '#c8e6c9')}
        sx={{
          '& .MuiChartsLegend-root': { display: 'none' },
        }}
      />
      <div style={{ marginLeft: '20px' }}>
        {chartData.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: item.color,
                marginRight: '8px',
              }}
            ></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
